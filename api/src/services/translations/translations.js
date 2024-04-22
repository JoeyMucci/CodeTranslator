import { db } from 'src/lib/db'

export const translations = () => {
  return db.translation.findMany()
}

export const myTranslations = ({ emmy }) => {
  // return cache(`translations-${emmy}`, () => {
  return db.translation.findMany({
    where: { userEmail: emmy },
    orderBy: {
      createdAt: 'desc',
    },
  })
  // })
}

export const createTranslation = ({ input }) => {
  // deleteCacheKey(`translations-${input.userEmail}`)
  return db.translation.create({
    data: input,
  })
}

export const updateTranslation = ({ id, input }) => {
  return db.translation.update({
    where: { id },
    data: input,
  })
}

export const deleteTranslation = ({ id }) => {
  return db.translation.delete({
    where: { id },
  })
}
