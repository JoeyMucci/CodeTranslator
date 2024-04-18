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
  const onecount = await db.rating.count({ where: { score: 1 } })
  const twocount = await db.rating.count({ where: { score: 2 } })
  const threecount = await db.rating.count({ where: { score: 3 } })
  const fourcount = await db.rating.count({ where: { score: 4 } })
  const fivecount = await db.rating.count({ where: { score: 5 } })
  const count = onecount + twocount + threecount + fourcount + fivecount
  const aggregations = await db.rating.aggregate({
    _avg: {
      score: true,
    },
  })

  return {
    avg: aggregations._avg.score,
    count: count,
    onecount: onecount,
    twocount: twocount,
    threecount: threecount,
    fourcount: fourcount,
    fivecount: fivecount,
  }
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
