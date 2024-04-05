import { contacts, contact, createContact } from './contacts'

describe('contacts', () => {
  scenario('returns all contacts', async (scenario) => {
    const result = await contacts()

    expect(result.length).toEqual(Object.keys(scenario.contact).length)
  })

  scenario('returns a single contact', async (scenario) => {
    const result = await contact({ id: scenario.contact.one.id })

    expect(result).toEqual(scenario.contact.one)
  })

  scenario('creates a contact', async () => {
    const result = await createContact({
      input: { email: 'String1', subject: 'String2', backupEmail: 'String3', message: 'String4' },
    })

    expect(result.email).toEqual('String1')
    expect(result.subject).toEqual('String2')
    expect(result.backupEmail).toEqual('String3')
    expect(result.message).toEqual('String4')
  })
})
