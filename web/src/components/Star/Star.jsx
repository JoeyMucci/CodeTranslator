/* eslint-disable jsx-a11y/anchor-is-valid */
import starFilled from '../../../public/starFilled.png'
import starOutline from '../../../public/starOutline.png'

const Star = () => {
  return (
    <div>
      {/* <img src={starOutline} alt="Star" /> */}
      <a id="home">
        <img className="image_off" src={starFilled} alt="Filled Star" />
        <img className="image_on" src={starOutline} alt="Empty Star" />
      </a>
    </div>
  )
}

export default Star
