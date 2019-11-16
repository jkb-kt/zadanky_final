/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Tests requisition
*/

/**
 * @jest-environment node
 */
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const { createTestClient } = require('apollo-server-testing')
const resolvers = require('./graphql/resolvers').default
const typeDefs = require('./graphql/schema').default
const gql = require('graphql-tag')
const dotenv = require('dotenv')
const Requisition = require('./models/Requisition').default
dotenv.config()

export const CREATE_REQUISITION = gql`
  mutation CreateRequisition(
    $approver: String!
    $driver: String!
    $passengers: [String!]!
    $startDate: String!
    $endDate: String!
    $reasons: [String!]!
    $destinations: [String!]!
    $car: String!
    $note: String
  ) {
    createRequisition(
      requisitionInput: {
        approver: $approver
        driver: $driver
        passengers: $passengers
        startDate: $startDate
        endDate: $endDate
        reasons: $reasons
        destinations: $destinations
        car: $car
        note: $note
      }
    ) {
      _id
      note
    }
  }
`

let testQuery
let testMutate

beforeAll(() => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      req: {
        session: {
          authId: '5d36337f613ac43e734a2ef0'
        }
      }
    })
  })
  const { query, mutate } = createTestClient(server)
  testQuery = query
  testMutate = mutate

  return mongoose.connect(process.env.MONGO_DEVELOPMENT, { useNewUrlParser: true })
})

afterAll(() => {
  return mongoose.disconnect()
})

describe('should create a requisition and clean up after', () => {
  let requisitionId

  test('should create a requisition', async () => {
    const { data } = await testMutate({
      mutation: CREATE_REQUISITION,
      variables: {
        passengers: ['5d363300613ac43e734a2ee4', '5d36331f613ac43e734a2ee7'],
        reasons: ['5d36334f613ac43e734a2eea', '5d363352613ac43e734a2eeb'],
        destinations: ['5d36335b613ac43e734a2eed', '5d36335e613ac43e734a2eee'],
        approver: '5d363300613ac43e734a2ee4',
        driver: '5d36330d613ac43e734a2ee5',
        startDate: '2019-10-23T05:45:00.000Z',
        endDate: '2019-10-23T07:59:00.000Z',
        car: '5d363335613ac43e734a2ee8',
        note: 'Test requisition'
      }
    })
    expect(data.createRequisition).toBeTruthy()
    expect(data.createRequisition.note).toBe('Test requisition')

    requisitionId = data.createRequisition._id
  })

  test('should fail to create a requisition due to time overlap', async () => {
    const result = await testMutate({
      mutation: CREATE_REQUISITION,
      variables: {
        passengers: ['5d363300613ac43e734a2ee4', '5d36331f613ac43e734a2ee7'],
        reasons: ['5d36334f613ac43e734a2eea', '5d363352613ac43e734a2eeb'],
        destinations: ['5d36335b613ac43e734a2eed', '5d36335e613ac43e734a2eee'],
        approver: '5d363300613ac43e734a2ee4',
        driver: '5d36330d613ac43e734a2ee5',
        startDate: '2019-10-23T06:45:00.000Z',
        endDate: '2019-10-23T09:59:00.000Z',
        car: '5d363335613ac43e734a2ee8',
        note: 'Test requisition'
      }
    })

    expect(result.data.createRequisition).toBeFalsy()
    expect(result.errors[0].message).toBe('REQ_OVERLAP')
  })

  afterAll(async () => {
    return await Requisition.findOneAndDelete({
      _id: requisitionId
    })
  })
})
