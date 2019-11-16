/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines template connected GraphQL schema
*/

import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    templates(limit: Int, offset: Int): [Template!]
    template(_id: String!): Template!
    templatesCount: Int!
  }

  extend type Mutation {
    createTemplate(templateInput: TemplateInput): Template
    updateTemplate(_id: String!, templateInput: TemplateInput!): Template
  }

  type Template {
    _id: ID!
    name: String
    approver: String
    driver: String
    passengers: [String]
    reasons: [String]
    destinations: [String]
    car: String
    note: String
    author: AuthName!
    updatedBy: AuthName
    createdAt: String!
    updatedAt: String
  }

  input TemplateInput {
    name: String!
    approver: String
    driver: String
    passengers: [String]
    reasons: [String]
    destinations: [String]
    car: String
    note: String
  }
`
