export const schema = gql`
  type Rating {
    id: Int!
    score: Int!
    createdAt: DateTime!
  }

  type Query {
    ratings: [Rating!]! @requireAuth
    rating(id: Int!): Rating @requireAuth
  }

  input CreateRatingInput {
    score: Int!
  }

  input UpdateRatingInput {
    score: Int
  }

  type Mutation {
    createRating(input: CreateRatingInput!): Rating! @requireAuth
  }
`
