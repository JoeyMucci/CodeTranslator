// api/src/graphql/translations.sdl.js
export const schema = gql`
  type Translation {
    id: Int!
    userId: Int!
    originalCode: String!
    translatedCode: String
    createdAt: DateTime!
  }

  type Query {
    translations: [Translation!]! @requireAuth
  }

  input CreateTranslationInput {
    userId: Int!
    originalCode: String!
    translatedCode: String!
    originalLanguage: String!
    translatedLanguage: String!
  }

  type Mutation {
    createTranslation(input: CreateTranslationInput!): Translation! @requireAuth
    deleteTranslation(id: Int!): Translation! @requireAuth
  }
`
