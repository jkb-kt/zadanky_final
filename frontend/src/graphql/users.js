import gql from 'graphql-tag'
import { users_query_body } from '.'

export const USERS_QUERY = gql`
 {
    users {
      ${users_query_body}
    }
  }
`

export const USERS_SIMPLE_QUERY = gql`
  query USERS($type: String) {
    users(type: $type) {
      _id
      firstName
      lastName
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $roles: [String!]!) {
    createUser(userInput: { firstName: $firstName, lastName: $lastName, roles: $roles }) {
      firstName
      lastName
      roles
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $_id: String!
    $firstName: String!
    $lastName: String!
    $roles: [String!]!
    $active: Boolean!
  ) {
    updateUser(
      _id: $_id
      userInput: { firstName: $firstName, lastName: $lastName, roles: $roles, active: $active }
    ) {
      _id
    }
  }
`

export const USER_DETAIL_QUERY = gql`
  query USER_DETAIL_QUERY($_id: String!) {
    user(_id: $_id) {
      ${users_query_body}
      createdAt
      updatedBy {
        name
      }
      updatedAt
      author {
        name
      }
    }
  }
`

export const USER_DETAIL_REFETCH = gql`
  query USER_DETAIL_REFETCH($_id: String!) {
    user(_id: $_id) {
      ${users_query_body}
      updatedBy {
        name
      }
      updatedAt
    }
  }
`

export const USERS_TABLE_QUERY = gql`
  query TABLE_DATA($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      _id
      firstName
      lastName
      active
      createdAt
    }
    usersCount
  }
`
