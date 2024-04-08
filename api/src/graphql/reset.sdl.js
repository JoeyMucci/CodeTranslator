export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    password: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input ChangePasswordInput {
    email: String!
    password: String!
  }

  mutation generateResetToken($email: String!) {
    generateResetToken(email: $email)
  }

  mutation verifyResetToken($email: String!, $token: String!) {
    verifyResetToken(email: $email, token: $token)
  }

  mutation resetPassword($userId: String!, $password: String!) {
    resetPassword(userId: $userId, password: $password)
  }
`
