import { db } from 'src/lib/db'

export const deleteTranslation = ({ id }) => {
 return db.translation.delete({
    where: { id },
 })
}
