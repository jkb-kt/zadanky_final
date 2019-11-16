/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Merges all GraphQL schemas into an array
*/

import { gql } from 'apollo-server-express'
import authSchema from './Auth'
import carSchema from './Car'
import destinationSchema from './Destination'
import pushSubscriptionSchema from './PushSubscription'
import reasonSchema from './Reason'
import requisitionSchema from './Requisition'
import templateSchema from './Template'
import userSchema from './User'

const rootSchema = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`

export default [
  rootSchema,
  carSchema,
  userSchema,
  templateSchema,
  requisitionSchema,
  reasonSchema,
  destinationSchema,
  authSchema,
  pushSubscriptionSchema
]
