export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    password: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    requestPasswordReset(email: String!): User! @skipAuth
  }
`
