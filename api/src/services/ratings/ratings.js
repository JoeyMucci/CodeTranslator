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

// Fetches avg and count, empty yields {avg: null, count: 0}
export const getAverageRating = async () => {
  const count = await db.rating.count()
  const aggregations = await db.rating.aggregate({
    _avg: {
      score: true,
    },
  })
  return { avg: aggregations._avg.score, count: count }
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
