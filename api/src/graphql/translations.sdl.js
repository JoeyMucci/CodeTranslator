// api/src/graphql/translations.sdl.js
export const schema = gql`
  type Translation {
    id: Int!
    userEmail: String!
    originalCode: String!
    translatedCode: String!
    originalLanguage: String!
    translatedLanguage: String!
    createdAt: DateTime!
    user: User
  }

  type Query {
    translations: [Translation!]! @skipAuth
    myTranslations(emmy: String!): [Translation!]! @skipAuth
  }

  input CreateTranslationInput {
    userEmail: String!
    originalCode: String!
    translatedCode: String!
    originalLanguage: String!
    translatedLanguage: String!
  }

  type Mutation {
    createTranslation(input: CreateTranslationInput!): Translation! @skipAuth
    deleteTranslation(id: Int!): Translation! @skipAuth
  }
`
