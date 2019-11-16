/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines authorization connected GraphQL schema
*/

import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    isMe: Auth
    auth(_id: String!): Auth!
    auths(limit: Int, offset: Int): [Auth!]!
    authsExport: [Auth!]!
    authsCount: Int!
  }
  extend type Mutation {
    register(registerInput: RegisterInput): Auth
    login(loginInput: LoginInput): Auth
    resetPassword(email: String!): Boolean!
    newPassword(authId: String!, resetToken: String!, password: String!): Boolean!
    logout: Boolean!
    updateAuth(_id: String!, authInput: AuthInput!): Auth
  }

  type Auth {
    _id: ID!
    name: String!
    email: String!
    roles: [String]!
    approved: Boolean!
    createdAt: String!
    updatedAt: String
    updatedBy: AuthName
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  input AuthInput {
    approved: Boolean!
    roles: [String!]!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`
