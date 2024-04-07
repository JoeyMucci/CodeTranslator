export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    password: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
    userByEmail(email: String!): User @skipAuth
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input ChangePasswordInput {
    currentPassword: String!
    newPassword: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    loginUser(email: String!, password: String!): AuthPayload! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    updateUserByEmail(email: String!, input: UpdateUserInput!): User! @skipAuth
    changePassword(id: Int!, input: ChangePasswordInput!): User! @skipAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
