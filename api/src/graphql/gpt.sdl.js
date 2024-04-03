export const schema = gql`
  type TranslationRes {
    rescode: String
  }

  input CreateTranslationRequestInput {
    fromLanguage: String!
    toLanguage: String!
    code: String!
  }

  type Mutation {
    runTranslation(input: CreateTranslationRequestInput!): TranslationRes! @skipAuth
  }
`
