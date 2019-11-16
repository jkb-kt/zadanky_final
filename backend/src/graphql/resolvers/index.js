/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Merges all resolvers into an array
*/

import authResolver from './Auth'
import carResolver from './Car'
import destinationResolver from './Destination'
import pushSubscriptionResolver from './PushSubscription'
import reasonResolver from './Reason'
import requisitionResolver from './Requisition'
import templateResolver from './Template'
import userResolver from './User'

export default [
  carResolver,
  userResolver,
  templateResolver,
  requisitionResolver,
  reasonResolver,
  destinationResolver,
  authResolver,
  pushSubscriptionResolver
]
