/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines car connected GraphQL schema
*/

import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    cars(limit: Int, offset: Int): [Car!]!
    car(_id: String!): Car!
    carsCount: Int!
  }

  extend type Mutation {
    createCar(carInput: CarInput): Car
    updateCar(_id: String!, carInput: CarInput!): Car
  }

  type Car {
    _id: ID!
    spz: String!
    name: String!
    color: String!
    active: Boolean
    author: AuthName!
    updatedBy: AuthName
    createdAt: String!
    updatedAt: String
  }

  input CarInput {
    spz: String!
    name: String!
    color: String!
    active: Boolean
  }
`
