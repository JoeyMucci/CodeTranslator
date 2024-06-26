import { contacts, contact, createContact, someContacts } from './contacts'

describe('contacts', () => {
  scenario('returns all contacts', async (scenario) => {
    const result = await contacts()

    expect(result.length).toEqual(Object.keys(scenario.contact).length)
  })

  scenario('returns some contacts in reverse chronological order', async () => {
    const result = await someContacts()

    expect(result[0].createdAt - result[1].createdAt).toBeGreaterThan(0)
  })

  scenario('returns a single contact', async (scenario) => {
    const result = await contact({ id: scenario.contact.one.id })

    expect(result).toEqual(scenario.contact.one)
  })

  scenario('creates a contact', async () => {
    const result = await createContact({
      input: { userEmail: 'yakuza@toonlink.edu', subject: 'String2', backupEmail: 'String3', message: 'String4' },
    })

    expect(result.userEmail).toEqual('yakuza@toonlink.edu')
    expect(result.subject).toEqual('String2')
    expect(result.backupEmail).toEqual('String3')
    expect(result.message).toEqual('String4')
  })

  scenario('creates a contact', async () => {
    const result = await createContact({
      input: { userEmail: 'yakuza@toonlink.edu', subject: 'String2', backupEmail: 'String3', message: 'String4' },
    })

    expect(result.userEmail).toEqual('yakuza@toonlink.edu')
    expect(result.subject).toEqual('String2')
    expect(result.backupEmail).toEqual('String3')
    expect(result.message).toEqual('String4')
  })
})
