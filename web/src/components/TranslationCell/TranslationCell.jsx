export const QUERY = gql`
  query FindTranslationQuery($id: Int!) {
    translation: translation(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ translation }) => {
  return <div>{JSON.stringify(translation)}</div>
}
