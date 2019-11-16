/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines destination connected GraphQL schema
*/

import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    destinations: [Destination!]!
  }

  extend type Mutation {
    createDestination(destinationInput: DestinationInput): Destination
    updateDestination(_id: String!, destinationInput: DestinationInput!): Destination
  }

  type Destination {
    _id: ID!
    name: String!
  }

  input DestinationInput {
    name: String!
  }
`
