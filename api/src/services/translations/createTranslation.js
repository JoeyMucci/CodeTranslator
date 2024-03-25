
import { db } from 'src/lib/db'

export const createTranslation = ({ input }) => {
 return db.translation.create({
    data: {
      ...input,
      status: 'pending',
    },
 })
}
