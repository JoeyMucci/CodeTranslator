/* eslint-disable jsx-a11y/anchor-is-valid */
import starFilled from '../../../public/starFilled.png'
import starOutline from '../../../public/starOutline.png'

const Star = ({ hov = false }) => {
  let color = hov ? starFilled : starOutline
  let text = hov ? 'Filled Star' : 'Empty Star'
  return (
    <div>
      <img src={color} alt={text} width="48" height="48" />
    </div>
  )
}

export default Star
