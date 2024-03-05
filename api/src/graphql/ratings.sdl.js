export const schema = gql`
  type Rating {
    id: Int!
    score: Int!
    createdAt: DateTime!
  }

  type Query {
    ratings: [Rating!]! @skipAuth
    rating(id: Int!): Rating @skipAuth
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
