import Record from 'web/src/components/Record/Record.jsx'
import { useQuery } from '@redwoodjs/web';

export const QUERY = gql`
  query RecordsQuery($goal: String!) {
    records: myTranslations(emmy: $goal) {
      id
      originalCode
      translatedCode
      originalLanguage
      translatedLanguage
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="centertext">
    Try a translation to create a translation history entry!
  </div>
)




export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  records,
  DateAscending,
  inputLanguage,
  outputLanguage,
}) => {
  const { refetch } = useQuery(QUERY, { variables: { goal: '' } });


  const filteredRecords = records.filter((record) => {
    const inputLangMatch =
      inputLanguage === 'Default' || record.originalLanguage === inputLanguage
    const outputLangMatch =
      outputLanguage === 'Default' ||
      record.translatedLanguage === outputLanguage
    return inputLangMatch && outputLangMatch
  })

  /*SHOULD REFRESH PAGE FOR DELETION */
  const handleDeletion = () => {
    refetch();
  };
  //const filteredRecords = inputLanguage === 'Default' ? records : records.filter(record => record.originalLanguage === inputLanguage);

  const sortedRecords = !DateAscending
    ? [...filteredRecords].reverse()
    : filteredRecords

  return (
    <div
      className="translationCell flex flex-col space-y-20 p-5"
      data-testid="translationCell"
    >
      {sortedRecords.map((item) => {
        return (
          <Record
            key={item.id}
            id={item.id}
            originalCode={item.originalCode}
            translatedCode={item.translatedCode}
            originalLanguage={item.originalLanguage}
            translatedLanguage={item.translatedLanguage}
            createdAt={item.createdAt}
            onDelete={handleDeletion}
          ></Record>
        )
      })}
    </div>
  )
}
