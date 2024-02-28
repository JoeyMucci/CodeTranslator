import Star from 'web/src/components/Star/Star.jsx'

const Rater = ({ stars = 0 }) => {
  let star1 =
    stars > 0 ? <Star num="starone" hov={true} /> : <Star num="starone" />
  let star2 =
    stars > 1 ? <Star num="startwo" hov={true} /> : <Star num="startwo" />
  let star3 =
    stars > 2 ? <Star num="starthree" hov={true} /> : <Star num="starthree" />
  let star4 =
    stars > 3 ? <Star num="starfour" hov={true} /> : <Star num="starfour" />
  let star5 =
    stars > 4 ? <Star num="starfive" hov={true} /> : <Star num="starfive" />
  let message = ''
  switch (stars) {
    case 0:
      break
    case 1:
      message = (
        <div>
          <code className="error">error:</code>
          <code className="smalltext"> expected usable code</code>
        </div>
      )
      break
    case 2:
      message = (
        <div>
          <code className="smalltext">response == </code>
          <code className="problem">&quot;significant errors</code>
        </div>
      )
      break
    case 3:
      message = (
        <p className="smalltext">response == &quot;needs some tweaks&quot;</p>
      )
      break
    case 4:
      message = (
        <p className="smalltext">response = &quot;mostly correct&quot;</p>
      )
      break
    case 5:
      message = <p className="smalltext">response = &quot;Perfect!&quot;;</p>
      break
  }
  return (
    <>
      <div>
        <div className="inline-block">{star1}</div>
        <div className="inline-block">{star2}</div>
        <div className="inline-block">{star3}</div>
        <div className="inline-block">{star4}</div>
        <div className="inline-block">{star5}</div>
      </div>
      <p className="smalltext">How was our translation?</p>
      {message}
    </>
  )
}

export default Rater
