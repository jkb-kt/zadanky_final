import gql from 'graphql-tag'
import { templates_query_body, users_query_body } from '.'

export const TEMPLATES_FORM_QUERY = gql`
  {
    cars {
      _id
      name
      active
    }
    users {
      ${users_query_body}
    } 
    reasons {
      _id
      name
    }
    destinations {
      _id
      name
    }
  }
`

export const TEMPLATE_SELECT_QUERY = gql`
  query TEMPLATE_SELECT_QUERY($_id: String!) {
    template(_id: $_id) {
      approver
      driver
      passengers
      reasons
      destinations
      car
      note
    }
  }
`

export const TEMPLATES_REFETCH_QUERY = gql`
  {
    templates {
      _id
      name
    }
  }
`

export const CREATE_TEMPLATE = gql`
  mutation CreateTemplate(
    $name: String!
    $approver: String
    $driver: String
    $passengers: [String]
    $reasons: [String]
    $destinations: [String]
    $car: String
    $note: String
  ) {
    createTemplate(
      templateInput: {
        name: $name
        approver: $approver
        driver: $driver
        passengers: $passengers
        reasons: $reasons
        destinations: $destinations
        car: $car
        note: $note
      }
    ) {
      _id
      name
    }
  }
`

export const UPDATE_TEMPLATE = gql`
  mutation UpdateTemplate(
    $_id: String!
    $name: String!
    $approver: String
    $driver: String
    $passengers: [String]
    $reasons: [String]
    $destinations: [String]
    $car: String
    $note: String
  ) {
    updateTemplate(
      _id: $_id
      templateInput: {
        name: $name
        approver: $approver
        driver: $driver
        passengers: $passengers
        reasons: $reasons
        destinations: $destinations
        car: $car
        note: $note
      }
    ) {
      _id
      name
    }
  }
`

export const TEMPLATE_DETAIL_QUERY = gql`
  query TEMPLATE_DETAIL_QUERY($_id: String!) {
    template(_id: $_id) {
      ${templates_query_body}
      createdAt
      updatedBy {
        name
      }
      updatedAt
      author {
        name
      }
    }
    cars {
      _id
      name
      active
    }
    users {
      ${users_query_body}
    } 
    reasons {
      _id
      name
    }
    destinations {
      _id
      name
    }
  }
`

export const TEMPLATE_DETAIL_REFETCH = gql`
  query TEMPLATE_DETAIL_REFETCH($_id: String!) {
    template(_id: $_id) {
      ${templates_query_body}
      updatedBy {
        name
      }
      updatedAt
    }
  }
`

export const TEMPLATES_TABLE_QUERY = gql`
  query TABLE_DATA($offset: Int, $limit: Int) {
    templates(offset: $offset, limit: $limit) {
      _id
      name
      author {
        name
      }
      createdAt
    }
    templatesCount
  }
`
