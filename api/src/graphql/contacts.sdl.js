export const schema = gql`
  type Contact {
    id: Int!
    email: String!
    subject: String!
    backupEmail: String
    message: String!
    createdAt: DateTime!
  }

  type Query {
    contacts: [Contact!]! @skipAuth
    contact(id: Int!): Contact @skipAuth
  }

  input CreateContactInput {
    email: String!
    subject: String!
    backupEmail: String
    message: String!
  }

  input UpdateContactInput {
    name: String
    email: String
    message: String
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @skipAuth
  }
`
