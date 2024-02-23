import Star from '../Star/Star.jsx'

const Rater = ({ stars = 0 }) => {
  let star1 = stars > 0 ? <Star hov={true} /> : <Star />
  let star2 = stars > 1 ? <Star hov={true} /> : <Star />
  let star3 = stars > 2 ? <Star hov={true} /> : <Star />
  let star4 = stars > 3 ? <Star hov={true} /> : <Star />
  let star5 = stars > 4 ? <Star hov={true} /> : <Star />
  let message = ''
  switch (stars) {
    case 0:
      break
    case 1:
      message = (
        <div>
          <code className="error">error:</code>
          <code> expected usable code</code>
        </div>
      )
      break
    case 2:
      message = (
        <div>
          <code>response == </code>
          <code className="problem">&quot;significant errors</code>
        </div>
      )
      break
    case 3:
      message = <code>response == &quot;needs some tweaks&quot;</code>
      break
    case 4:
      message = <code>reponse = &quot;mostly correct&quot;</code>
      break
    case 5:
      message = <code>reponse = &quot;Perfect!&quot;;</code>
      break
  }
  return (
    <div>
      <div className="inline-block">{star1}</div>
      <div className="inline-block">{star2}</div>
      <div className="inline-block">{star3}</div>
      <div className="inline-block">{star4}</div>
      <div className="inline-block">{star5}</div>

      <p className="code">How was our translation?</p>
      {message}
    </div>
  )
}

export default Rater
