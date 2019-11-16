/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines user connected GraphQL schema
*/

import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users(limit: Int, offset: Int, type: String): [User!]
    user(_id: String!): User!
    usersCount: Int!
  }

  extend type Mutation {
    createUser(userInput: UserInput): User
    updateUser(_id: String!, userInput: UserInput!): User
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    roles: [String!]!
    active: Boolean
    author: AuthName!
    updatedBy: AuthName
    createdAt: String!
    updatedAt: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    roles: [String!]!
    active: Boolean
  }
`
