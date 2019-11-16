import gql from 'graphql-tag'

export const CARS_QUERY = gql`
  {
    cars {
      _id
      name
    }
  }
`

export const CREATE_CAR = gql`
  mutation CREATE_CAR($name: String!, $spz: String!, $color: String!) {
    createCar(carInput: { name: $name, spz: $spz, color: $color }) {
      _id
      name
      spz
      color
    }
  }
`

export const UPDATE_CAR = gql`
  mutation UPDATE_CAR(
    $_id: String!
    $name: String!
    $spz: String!
    $color: String!
    $active: Boolean!
  ) {
    updateCar(_id: $_id, carInput: { name: $name, spz: $spz, color: $color, active: $active }) {
      _id
    }
  }
`

export const CAR_DETAIL_QUERY = gql`
  query CAR_DETAIL_QUERY($_id: String!) {
    car(_id: $_id) {
      _id
      name
      spz
      color
      active
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

export const CAR_DETAIL_REFETCH = gql`
  query CAR_DETAIL_REFETCH($_id: String!) {
    car(_id: $_id) {
      _id
      name
      spz
      color
      active
      updatedBy {
        name
      }
      updatedAt
    }
  }
`

export const CARS_TABLE_QUERY = gql`
  query TABLE_DATA($offset: Int, $limit: Int) {
    cars(offset: $offset, limit: $limit) {
      _id
      name
      spz
      color
      active
      createdAt
    }
    carsCount
  }
`
