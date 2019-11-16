 /* 
  Author: Jakub Kot
  Licence: MIT
  File description: Tests authorization
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
const Auth = require('./models/Auth').default
dotenv.config()

const REGISTER = gql`
  mutation REGISTER($email: String!, $password: String!) {
    register(registerInput: { email: $email, password: $password }) {
      _id
      email
      roles
      approved
    }
  }
`

const UPDATE_AUTH = gql`
  mutation UPDATE_AUTH($_id: String!, $approved: Boolean!, $roles: [String!]!, $name: String!) {
    updateAuth(_id: $_id, authInput: { approved: $approved, roles: $roles, name: $name }) {
      _id
      name
      approved
      email
      roles
    }
  }
`

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      _id
      email
      name
      roles
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
          authId: '5d3632b9613ac43e734a2ee3'
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

const cleanAfterRegistration = async user =>
  await Auth.findOneAndDelete({
    _id: user._id
  })

describe('create, approve and log user in', () => {
  let user

  test('should register a user', async () => {
    const { data } = await testMutate({
      mutation: REGISTER,
      variables: {
        email: 'test123@test.cz',
        password: 'test123'
      }
    })

    expect(data).toBeTruthy()
    expect(data.register).toMatchObject({
      email: 'test123@test.cz',
      approved: false,
      roles: []
    })

    user = data.register
  })

  test('should fail to log in', async () => {
    const result = await testMutate({
      mutation: LOGIN,
      variables: {
        email: 'test123@test.cz',
        password: 'test123'
      }
    })
    expect(result.errors[0].message).toBe('AUTH_NOT_ACTIVATED')
    expect(result.data.login).toBeFalsy()
  })

  test('should approve a user', async () => {
    const { data } = await testMutate({
      mutation: UPDATE_AUTH,
      variables: {
        _id: user._id,
        name: 'Petr Jelen',
        approved: true,
        roles: ['approver', 'requestant', 'driver']
      }
    })

    expect(data).toBeTruthy()
    expect(data.updateAuth).toMatchObject({
      email: 'test123@test.cz',
      name: 'Petr Jelen',
      approved: true,
      roles: ['approver', 'requestant', 'driver']
    })
  })

  test('should login a user', async () => {
    const { data } = await testMutate({
      mutation: LOGIN,
      variables: {
        email: 'test123@test.cz',
        password: 'test123'
      }
    })

    expect(data).toBeTruthy()
    expect(data.login).toMatchObject({
      email: 'test123@test.cz',
      name: 'Petr Jelen',
      roles: ['approver', 'requestant', 'driver']
    })
  })

  afterAll(() => {
    return cleanAfterRegistration(user)
  })
})
