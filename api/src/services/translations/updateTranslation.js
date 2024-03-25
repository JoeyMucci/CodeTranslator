
import { db } from 'src/lib/db'

export const updateTranslation = ({ id, input }) => {
 return db.translation.update({
    where: { id },
    data: input,
 })
}
