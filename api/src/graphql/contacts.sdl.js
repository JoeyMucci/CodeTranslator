export const schema = gql`
  type Contact {
    id: Int!
    userEmail: String!
    subject: String!
    backupEmail: String
    message: String!
    createdAt: DateTime!
  }

  type ContactDisplay {
    id: Int!
    subject: String!
    message: String!
    name: String
    createdAt: DateTime!
    user: User
  }

  type Query {
    contacts: [Contact!]! @skipAuth
    someContacts: [ContactDisplay!]! @skipAuth
    contact(id: Int!): Contact @skipAuth
  }

  input CreateContactInput {
    userEmail: String!
    subject: String!
    backupEmail: String
    message: String!
  }

  input UpdateContactInput {
    name: String
    userEmail: String
    message: String
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @skipAuth
  }
`
