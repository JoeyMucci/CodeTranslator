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

import Rater from './Rater'

export default { component: Rater }

export const zero = () => {
  return <Rater />
}

export const one = () => {
  return <Rater stars={1} />
}

export const two = () => {
  return <Rater stars={2} />
}

export const three = () => {
  return <Rater stars={3} />
}

export const four = () => {
  return <Rater stars={4} />
}

export const five = () => {
  return <Rater stars={5} />
}
