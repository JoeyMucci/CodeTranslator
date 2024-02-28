import Star from './Star'

export default { component: Star }

export const unhovered = () => {
  return <Star />
}

export const hovered = () => {
  return <Star hov={true} />
}
