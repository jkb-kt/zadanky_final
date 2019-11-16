import gql from 'graphql-tag'

export const REASONS_QUERY = gql`
  {
    reasons {
      _id
      name
    }
  }
`

export const CREATE_REASON = gql`
  mutation CreateReason($name: String!) {
    createReason(reasonInput: { name: $name }) {
      _id
      name
    }
  }
`

export const UPDATE_REASON = gql`
  mutation UpdateReason($_id: String!, $name: String!) {
    updateReason(_id: $_id, reasonInput: { name: $name }) {
      _id
    }
  }
`
