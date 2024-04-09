export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    password: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input getUserfromToken {
    token: String!
  }

  input ChangePasswordInput {
    email: String!
    password: String!
  }

  type Mutation {
    generateResetToken(email: String!): User! @skipAuth
    verifyResetToken(email: String!, token: String!): User! @skipAuth
    resetPassword(email: String!, password: String!, resetToken: String!): User! @skipAuth
  }
`
