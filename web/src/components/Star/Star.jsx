/* eslint-disable jsx-a11y/anchor-is-valid */
import starFilled from '../../../public/starFilled.png'
import starOutline from '../../../public/starOutline.png'

const Star = () => {
  return (
    <div>
      <a id="home">
        <img
          className="image_off"
          src={starFilled}
          alt="Filled Star"
          width="48"
          height="48"
        />
        <img
          className="image_on"
          src={starOutline}
          alt="Empty Star"
          width="48"
          height="48"
        />
      </a>
    </div>
  )
}

export default Star
