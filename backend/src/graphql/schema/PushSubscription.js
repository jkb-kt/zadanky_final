/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines push subscription connected GraphQL schema
*/

import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    pushRegister(pushSubscriptionInput: PushSubscription!, authId: String!): Boolean!
    pushUnregister(pushSubscriptionInput: PushSubscription!): Boolean!
  }

  input PushSubscription {
    endpoint: String!
    expirationTime: String
    keys: PushSubscriptionOptions!
  }

  input PushSubscriptionOptions {
    auth: String!
    p256dh: String!
  }
`
