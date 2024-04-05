export const schema = gql`
  type TranslationRes {
    rescode: String
    error: String
  }

  input CreateTranslationRequestInput {
    fromLanguage: String!
    toLanguage: String!
    code: String!
  }

  type Mutation {
    runTranslationMute(input: CreateTranslationRequestInput!): TranslationRes! @skipAuth
  }
`
