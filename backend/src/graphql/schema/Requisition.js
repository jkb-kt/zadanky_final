/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines requisition connected GraphQL schema
*/

import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    requisitions(
      limit: Int
      offset: Int
      car: String
      driver: String
      approver: String
      status: String
      date: [String]
    ): [Requisition!]!
    requisitionsExport(
      approver: [String]!
      author: [String]!
      driver: [String]!
      passengers: [String]!
      reasons: [String]!
      destinations: [String]!
      car: [String]!
      dateRange: [String!]!
      status: [String]!
    ): [Requisition!]!
    statistics(dateRange: [String!]!): StatisticsType!
    requisitionsCount(car: String, driver: String, approver: String, status: String): Int!
    requisition(_id: String!): RequisitionDetail!
  }

  extend type Mutation {
    createRequisition(requisitionInput: RequisitionInput!): Requisition
    updateRequisition(_id: String!, requisitionInput: RequisitionInput!): Requisition
    deleteRequisition(_id: String!): Boolean!
  }

  type Requisition {
    _id: ID!
    status: String!
    author: AuthName!
    approver: User!
    driver: User!
    passengers: [User!]!
    startDate: String!
    endDate: String!
    reasons: [Reason!]!
    destinations: [Destination!]!
    car: Car!
    createdAt: String!
    number: Int
    note: String
  }

  type RequisitionDetail {
    _id: ID!
    status: String!
    approver: String!
    driver: String!
    passengers: [String!]!
    startDate: String!
    endDate: String!
    reasons: [String!]!
    destinations: [String!]!
    car: String!
    author: AuthName!
    createdAt: String!
    updatedAt: String!
    updatedBy: AuthName
    number: Int
    note: String
  }

  type AuthName {
    _id: ID!
    name: String!
  }

  type StatisticsType {
    users: [StatisticsInnerType]
    cars: [StatisticsInnerType]
    reasons: [StatisticsInnerType]
    destinations: [StatisticsInnerType]
  }

  type StatisticsInnerType {
    _id: ID!
    name: String!
    count: Int!
  }

  input RequisitionInput {
    status: String
    approver: String!
    driver: String!
    passengers: [String!]!
    startDate: String!
    endDate: String!
    reasons: [String!]!
    destinations: [String!]!
    car: String!
    note: String
  }
`
