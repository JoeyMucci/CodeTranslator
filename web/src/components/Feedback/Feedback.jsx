// eslint-disable-next-line no-unused-vars
const Feedback = ({ id, subject, message, name, createdAt }) => {
  if (name == null) name = 'Anonymous'

  name = 'Posted by: ' + name

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'long', // "January"
      day: '2-digit', // "01"
      year: 'numeric', // "2024"
      hour: 'numeric', // "11"
      minute: '2-digit', // "24"
      second: '2-digit', // "15"
      hour12: true, // Use AM/PM
    })
  }

  return (
    <>
      <div className="flex flex-col">
        <p className="text">{subject}</p>
        <div className="rounded bg-text_box p-5 hover:bg-blue-300">
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              background: 'transparent',
              wordWrap: 'break-word',
            }}
          >
            <code>{message}</code>
            <br></br>
            <br></br>
            <code className="text-gray-300">{name}</code>
          </pre>
        </div>
        <p className="text-white">Created on {formatDateTime(createdAt)}</p>
      </div>
    </>
  )
}

export default Feedback
