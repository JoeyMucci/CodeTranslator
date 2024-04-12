import { db } from 'src/lib/db'

export const contacts = () => {
  return db.contact.findMany()
}

export const someContacts = async () => {
  const results = await db.contact.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })
  return results
}

export const contact = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact = ({ input }) => {
  return db.contact.create({
    data: input,
  })
}
