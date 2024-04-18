import Feedback from 'web/src/components/Feedback/Feedback.jsx'

export const QUERY = gql`
  query FeedbacksQuery {
    feedbacks: someContacts {
      id
      subject
      message
      user {
        name
      }
      createdAt
    }
  }
`

export const Loading = () => <div className="text">Loading...</div>

export const Empty = () => (
  <div className="text">Be the first to contact us!</div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ feedbacks }) => {
  return (
    <>
      <h1 className="text">Hear from some of our users</h1>
      <hr style={{ margin: 'auto' }}></hr>
      <div className="flex flex-col space-y-10 p-5">
        {feedbacks.map((item) => {
          return (
            <Feedback
              key={item.id}
              subject={item.subject}
              message={item.message}
              name={item.user.name}
              createdAt={item.createdAt}
            ></Feedback>
          )
        })}
      </div>
    </>
  )
}
