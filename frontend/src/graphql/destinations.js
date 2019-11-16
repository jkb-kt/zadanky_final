import gql from 'graphql-tag'

export const DESTINATIONS_QUERY = gql`
  {
    destinations {
      _id
      name
    }
  }
`

export const CREATE_DESTINATION = gql`
  mutation CreateDestination($name: String!) {
    createDestination(destinationInput: { name: $name }) {
      _id
      name
    }
  }
`

export const UPDATE_DESTINATION = gql`
  mutation UpdateDestination($_id: String!, $name: String!) {
    updateDestination(_id: $_id, destinationInput: { name: $name }) {
      _id
    }
  }
`
