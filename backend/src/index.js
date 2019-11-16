/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Main server file
*/

import sgMail from '@sendgrid/mail'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import mongoose from 'mongoose'
import 'regenerator-runtime/runtime'
import webpush from 'web-push'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/schema'
import './utils'
const MongoStore = require('connect-mongo')(session)

dotenv.config()

const {
  NODE_ENV,
  FRONTEND_ORIGIN,
  SESSION_SECRET,
  MONGO_DEVELOPMENT,
  MONGO_PRODUCTION,
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY,
  GMAIL_USER_DEV,
  SENDGRID_API_KEY
} = process.env

const app = express()

app.use(helmet())

webpush.setVapidDetails(`mailto:${GMAIL_USER_DEV}`, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)

sgMail.setApiKey(SENDGRID_API_KEY)

mongoose
  .connect(NODE_ENV === 'production' ? MONGO_PRODUCTION : MONGO_DEVELOPMENT, {
    useNewUrlParser: true
  })
  .then(res => console.log('Connected to DB'))
  .catch(error => console.log(error))

app.set('trust proxy', 1)
app.use(
  session({
    secret: SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: NODE_ENV === 'production' ? 'none' : false
    }
  })
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: FRONTEND_ORIGIN
  }
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

export { app }
