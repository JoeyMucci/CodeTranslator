import arrow from 'web/public/Arrow.png'

const Record = ({
  // eslint-disable-next-line no-unused-vars
  id,
  originalCode,
  translatedCode,
  originalLanguage,
  translatedLanguage,
}) => {
  return (
    <>
      <div className="flex flex-row justify-center space-x-20">
        <div className="originalCode basis-1/4 rounded bg-text_box p-5">
          <h2 className="centertext">{originalLanguage}</h2>
          <p>{originalCode}</p>
        </div>
        <div className="flex flex-col">
          <img
            alt="arrow"
            className="basis-1/2;"
            src={arrow}
            style={{ width: '75px', height: '50px', align: 'middle' }}
          ></img>
        </div>
        <div className="translatedCode basis-1/4 rounded bg-text_box p-5">
          <h2 className="centertext">{translatedLanguage}</h2>
          <p>{translatedCode}</p>
        </div>
      </div>
    </>
  )
}

export default Record
