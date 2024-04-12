export const schema = gql`
  type Rating {
    id: Int!
    score: Int!
    createdAt: DateTime!
  }

  type AverageData {
    avg: Float
    count: Int!
  }

  type Query {
    ratings: [Rating!]! @skipAuth
    rating(id: Int!): Rating @skipAuth
    getAverageRating: AverageData @skipAuth
  }

  input CreateRatingInput {
    score: Int!
  }

  input UpdateRatingInput {
    score: Int
  }

  type Mutation {
    createRating(input: CreateRatingInput!): Rating! @skipAuth
  }
`
