import gql from 'graphql-tag'

export const IS_ME_QUERY = gql`
  {
    isMe {
      _id
      name
      email
      roles
    }
  }
`

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      _id
    }
  }
`

export const REGISTER = gql`
  mutation REGISTER($email: String!, $password: String!) {
    register(registerInput: { email: $email, password: $password }) {
      _id
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD($email: String!) {
    resetPassword(email: $email)
  }
`

export const SET_NEW_PASSWORD = gql`
  mutation SET_NEW_PASSWORD($authId: String!, $resetToken: String!, $password: String!) {
    newPassword(authId: $authId, resetToken: $resetToken, password: $password)
  }
`

export const LOGOUT = gql`
  mutation LOGOUT {
    logout
  }
`

export const AUTHS_TABLE_QUERY = gql`
  query AUTHS_TABLE_QUERY($offset: Int, $limit: Int) {
    auths(offset: $offset, limit: $limit) {
      _id
      name
      email
      approved
      createdAt
      roles
    }
    authsCount
  }
`

export const UPDATE_AUTH = gql`
  mutation UPDATE_AUTH($_id: String!, $approved: Boolean!, $roles: [String!]!, $name: String!) {
    updateAuth(_id: $_id, authInput: { approved: $approved, roles: $roles, name: $name }) {
      _id
    }
  }
`

export const AUTH_DETAIL_QUERY = gql`
  query AUTH_DETAIL_QUERY($_id: String!) {
    auth(_id: $_id) {
      _id
      name
      email
      roles
      approved
      createdAt
      updatedBy {
        name
      }
      updatedAt
    }
  }
`

export const AUTH_DETAIL_REFETCH = gql`
  query AUTH_DETAIL_REFETCH($_id: String!) {
    auth(_id: $_id) {
      _id
      name
      roles
      approved
      updatedBy {
        name
      }
      updatedAt
    }
  }
`
