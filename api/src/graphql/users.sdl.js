export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    password: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type UserRes {
    user: User
    error: String
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
    userByEmail(emmy: String!): User @skipAuth
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

  type AuthPayloadRes {
    token: String
    user: User
    error: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    loginUserMute(email: String!, password: String!): AuthPayloadRes! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    changePasswordMute(email: String!, oldPassword: String!, newPassword: String!): UserRes! @skipAuth
    resetPassword(email: String!, password: String!, resetToken: String!): User! @skipAuth
    updateUserMute(email: String!, input: UpdateUserInput!): UserRes! @skipAuth
    changePassword(id: Int!, input: ChangePasswordInput!): User! @skipAuth
    deleteUser(id: Int!): User! @skipAuth
    deleteUserByEmail(email: String!): User! @skipAuth
  }
`
