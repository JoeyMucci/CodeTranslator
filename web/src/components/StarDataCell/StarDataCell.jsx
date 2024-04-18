export const QUERY = gql`
  query StarDataQuery {
    starData: getAverageRating {
      avg
      count
      onecount
      twocount
      threecount
      fourcount
      fivecount
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
  const tooltip =
    '5 star: ' +
    starData.fivecount +
    '\n4 star: ' +
    starData.fourcount +
    '\n3 star: ' +
    starData.threecount +
    '\n2 star: ' +
    starData.twocount +
    '\n1 star: ' +
    starData.onecount
  return (
    <div title={tooltip} className="inline">
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
