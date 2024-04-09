import isFileOkay from './isFileOkay'

describe('Accepting and rejecting files', () => {
  it('rejects png file', () => {
    const mockfile = { name: 'noncode.png' }
    return expect(isFileOkay(mockfile)).toBe(false)
  })
  it('rejects jpg file', () => {
    const mockfile = { name: 'noncode.jpg' }
    return expect(isFileOkay(mockfile)).toBe(false)
  })
  it('rejects gif file', () => {
    const mockfile = { name: 'noncode.gif' }
    return expect(isFileOkay(mockfile)).toBe(false)
  })
  it('rejects exe file', () => {
    const mockfile = { name: 'noncode.exe' }
    return expect(isFileOkay(mockfile)).toBe(false)
  })
  it('accepts txt file', () => {
    const mockfile = { name: 'program.txt' }
    return expect(isFileOkay(mockfile)).toBe(true)
  })
  it('rejects tricky file', () => {
    const mockfile = { name: 'program.txt.exe' }
    return expect(isFileOkay(mockfile)).toBe(false)
  })
})
