import { db } from 'src/lib/db'

export const ratings = () => {
  return db.rating.findMany()
}

export const rating = ({ id }) => {
  return db.rating.findUnique({
    where: { id },
  })
}

export const createRating = ({ input }) => {
  return db.rating.create({
    data: input,
  })
}

// export const updateRating = ({ id, input }) => {
//   return db.rating.update({
//     data: input,
//     where: { id },
//   })
// }

// export const deleteRating = ({ id }) => {
//   return db.rating.delete({
//     where: { id },
//   })
// }
