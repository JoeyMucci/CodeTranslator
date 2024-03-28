import Record from 'web/src/components/Record/Record.jsx'

export const QUERY = gql`
  query RecordsQuery($goal: String!) {
    records: myTranslations(emmy: $goal) {
      id
      originalCode
      translatedCode
      originalLanguage
      translatedLanguage
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="smalltext">
    Try a translation to create a translation history entry!
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ records }) => {
  return (
    <div className="translationCell flex flex-col space-y-20 p-5">
      {records.map((item) => {
        return (
          <Record
            key={item.id}
            originalCode={item.originalCode}
            translatedCode={item.translatedCode}
            originalLanguage={item.originalLanguage}
            translatedLanguage={item.translatedLanguage}
          ></Record>
        )
      })}
    </div>
  )
}
