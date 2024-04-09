export const isFileOkay = (file) => {
  const filename = file.name
  const suffix = filename.substring(filename.lastIndexOf('.') + 1)
  const banned = ['png', 'jpg', 'gif', 'mp4', 'exe']
  return !banned.includes(suffix)
}

export default isFileOkay
