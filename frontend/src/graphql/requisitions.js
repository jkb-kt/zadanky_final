import gql from 'graphql-tag'
import { users_query_body } from '.'

export const REQUISITION_FORM_QUERY = gql`
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
    templates {
      _id
      name
    }
  }
`

const requisition_query_body = `
  _id
  approver
  driver
  passengers
  startDate
  endDate
  reasons
  destinations
  car
  number
  status
  note
  updatedAt
  updatedBy {
    name
  }
`

export const REQUISITION_DETAIL_QUERY = gql`
  query REQUISITION_DETAIL_QUERY($_id: String!) {
    requisition(_id: $_id) {
      ${requisition_query_body}
      createdAt
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

export const REQUISITION_DETAIL_REFETCH = gql`
  query REQUISITION_DETAIL_REFETCH($_id: String!) {
    requisition(_id: $_id) {
      ${requisition_query_body}
    }
  }
`

export const REQUISITION_TABLE_QUERY = gql`
  query TABLE_DATA(
    $offset: Int
    $limit: Int
    $car: String
    $driver: String
    $approver: String
    $status: String
    $date: [String]
  ) {
    requisitions(
      offset: $offset
      limit: $limit
      car: $car
      driver: $driver
      approver: $approver
      status: $status
      date: $date
    ) {
      _id
      driver {
        _id
        lastName
      }
      approver {
        _id
        lastName
      }
      number
      status
      startDate
      car {
        _id
        name
      }
    }
    requisitionsCount(car: $car, driver: $driver, approver: $approver, status: $status)
  }
`

export const REQUISITION_TABLE_WITH_DATA_QUERY = gql`
  query TABLE_WITH_DATA_DATA($offset: Int, $limit: Int) {
    requisitions(offset: $offset, limit: $limit) {
      _id
      driver {
        _id
        lastName
      }
      approver {
        _id
        lastName
      }
      number
      status
      startDate
      car {
        _id
        name
      }
    }
    cars {
      _id
      name
    }
    users {
      _id
      lastName
      roles
    }
    requisitionsCount
  }
`

export const REQUISITION_CALENDAR_QUERY = gql`
  {
    requisitions {
      _id
      startDate
      endDate
      driver {
        _id
        lastName
      }
      car {
        _id
        name
        color
      }
    }
  }
`

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
    }
  }
`

export const UPDATE_REQUISITION = gql`
  mutation UpdateRequisition(
    $_id: String!
    $approver: String!
    $driver: String!
    $passengers: [String!]!
    $startDate: String!
    $endDate: String!
    $reasons: [String!]!
    $destinations: [String!]!
    $car: String!
    $status: String!
    $note: String
  ) {
    updateRequisition(
      _id: $_id
      requisitionInput: {
        approver: $approver
        driver: $driver
        passengers: $passengers
        startDate: $startDate
        endDate: $endDate
        reasons: $reasons
        destinations: $destinations
        car: $car
        status: $status
        note: $note
      }
    ) {
      _id
    }
  }
`

export const DELETE_REQUISITION = gql`
  mutation DeleteRequisition($_id: String!) {
    deleteRequisition(_id: $_id)
  }
`
