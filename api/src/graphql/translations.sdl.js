// api/src/graphql/translations.sdl.js
export const schema = gql`
 type Translation {
    id: Int!
    userId: Int!
    originalCode: String!
    translatedCode: String
    createdAt: DateTime!
    updatedAt: DateTime!
    status: Status!
 }

 enum Status {
    pending
    completed
    failed
 }

 type Query {
    translations: [Translation!]!
 }

 input CreateTranslationInput {
    userId: Int!
    originalCode: String!
    translatedCode: String
    status: Status!
 }

 input UpdateTranslationInput {
    id: Int!
    userId: Int
    originalCode: String
    translatedCode: String
    status: Status
 }

 type Mutation {
    createTranslation(input: CreateTranslationInput!): Translation!
    updateTranslation(id: Int!, input: UpdateTranslationInput!): Translation!
    deleteTranslation(id: Int!): Translation!
 }
`;
