// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import starFilled from '../../../public/starFilled.png'
import starOutline from '../../../public/starOutline.png'

import Star from './Star'

export default { component: Star }

export const Primary = {}

export const unhovered = () => {
  return <img src={starOutline} alt="Empty Star" width="48" height="48" />
}

export const hovered = () => {
  return <img src={starFilled} alt="Filled Star" width="48" height="48" />
}
