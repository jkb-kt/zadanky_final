/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines reason connected GraphQL schema
*/

import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    reasons: [Reason!]!
  }

  extend type Mutation {
    createReason(reasonInput: ReasonInput): Reason
    updateReason(_id: String!, reasonInput: ReasonInput!): Reason
  }

  type Reason {
    _id: ID!
    name: String!
  }

  input ReasonInput {
    name: String!
  }
`
