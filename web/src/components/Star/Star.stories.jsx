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

import Star from './Star'

export default { component: Star }

export const unhovered = () => {
  return <Star />
}

export const hovered = () => {
  return <Star hov={true} />
}
