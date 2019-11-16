import gql from 'graphql-tag'

export const users_query_body = `
    _id
    firstName
    lastName
    roles
    active
`

export const templates_query_body = `
  _id
  name
  approver
  driver
  passengers
  reasons
  destinations
  car
  note
`

export const EXPORT_FORM_QUERY = gql`
  {
    cars {
      _id
      name
      active
    }
    authsExport {
      _id
      name
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

export const STATISTICS_QUERY = gql`
  query STATISTICS_QUERY($dateRange: [String!]!) {
    statistics(dateRange: $dateRange) {
      users {
        _id
        name
        count
      }
      cars {
        _id
        name
        count
      }
      reasons {
        _id
        name
        count
      }
      destinations {
        _id
        name
        count
      }
    }
  }
`

export const EXPORT_QUERY = gql`
  query EXPORT_QUERY(
    $approver: [String]!
    $author: [String]!
    $driver: [String]!
    $passengers: [String]!
    $reasons: [String]!
    $destinations: [String]!
    $car: [String]!
    $dateRange: [String!]!
    $status: [String]!
  ) {
    requisitionsExport(
      approver: $approver
      author: $author
      driver: $driver
      passengers: $passengers
      reasons: $reasons
      destinations: $destinations
      car: $car
      dateRange: $dateRange
      status: $status
    ) {
      _id
      approver {
        _id
        firstName
        lastName
      }
      author {
        _id
        name
      }
      driver {
        _id
        firstName
        lastName
      }
      passengers {
        _id
        firstName
        lastName
      }
      startDate
      endDate
      reasons {
        _id
        name
      }
      destinations {
        _id
        name
      }
      car {
        _id
        name
        spz
      }
      number
      note
      status
    }
  }
`

export const PUSH_REGISTER = gql`
  mutation PUSH_REGISTER($pushSubscriptionInput: PushSubscription!, $authId: String!) {
    pushRegister(pushSubscriptionInput: $pushSubscriptionInput, authId: $authId)
  }
`

export const PUSH_UNREGISTER = gql`
  mutation PUSH_UNREGISTER($pushSubscriptionInput: PushSubscription!) {
    pushUnregister(pushSubscriptionInput: $pushSubscriptionInput)
  }
`
