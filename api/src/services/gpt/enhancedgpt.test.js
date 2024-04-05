import { cleanup, openai } from './gpt.js'

describe('Security', () => {
  it('does not show api key in browser', () => {
    expect(openai._options.dangerouslyAllowBrowser).toBe(false)
  })
})

describe('Sanitation', () => {
  it('removes C comments', () => {
    const result = cleanup({
      fromLanguage: 'C',
      code: '/* comment comment comment */\n// comment \nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
  it('removes C++ comments', () => {
    const result = cleanup({
      fromLanguage: 'C++',
      code: '/* comment comment comment */\n// comment \nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
  it('removes Java comments', () => {
    const result = cleanup({
      fromLanguage: 'Java',
      code: '/* comment comment comment */\n// comment \nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
  it('removes Go comments', () => {
    const result = cleanup({
      fromLanguage: 'Go',
      code: '/* comment comment comment */\n// comment \nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
  it('removes SQL comments', () => {
    const result = cleanup({
      fromLanguage: 'SQL',
      code: '/* comment comment comment */\n-- comment \nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
  it('removes Python comments', () => {
    const result = cleanup({
      fromLanguage: 'Python',
      code: '# comment \nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
  it('removes R comments', () => {
    const result = cleanup({
      fromLanguage: 'R',
      code: '# comment \nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
  it('removes PHP comments', () => {
    const result = cleanup({
      fromLanguage: 'PHP',
      code: '/* comment comment comment */\n// comment \n# comment\nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
  it('removes Rust comments', () => {
    const result = cleanup({
      fromLanguage: 'Rust',
      code: '// comment \nprint("Hello world")',
    })

    expect(result).not.toContain('comment')
    expect(result).toContain('Hello world')
  })
})
