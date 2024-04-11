export const QUERY = gql`
  query StarDataQuery {
    starData: getAverageRating {
      avg
      count
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>
    Could not retrieve aggregate data: {error?.message}
  </div>
)

export const Success = ({ starData }) => {
  const val = starData.count > 0 ? Math.round(starData.avg * 100) / 100 : 0
  const message =
    starData.count > 0 ? val + '(' + starData.count + ')' : '0 ratings'
  if (message == '3.33(3)') console.log('bruh')
  return (
    <div className="inline">
      <p className="smalltext">Summary</p>
      <meter
        id="range"
        data-testid="range"
        min="0"
        max="5"
        low="1.5"
        high="3"
        optimum="4.5"
        value={val}
      ></meter>
      <p className="smalltext">{message}</p>
    </div>
  )
}
