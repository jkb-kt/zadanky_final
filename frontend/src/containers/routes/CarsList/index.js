import { Icon, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { Routes } from '..'
import { CARS_TABLE_QUERY } from '../../../graphql/cars'
import { handleErrors } from '../../../utils/helpers'
import { Wrapper } from './styled'

const CarsList = ({ data: { cars, carsCount, loading, fetchMore }, history }) => {
  const columns = [
    {
      title: 'Název',
      dataIndex: 'name'
    },
    {
      title: 'SPZ',
      dataIndex: 'spz'
    },
    {
      title: 'Vytvořeno',
      dataIndex: 'createdAt',
      render: date => moment(date).format('DD.MM.YYYY HH:mm')
    },
    {
      title: 'Barva',
      dataIndex: 'color',
      render: color => (
        <div
          style={{ backgroundColor: color, height: '21px', width: '21px', borderRadius: '50%' }}
        />
      )
    },
    {
      title: 'Aktivní',
      dataIndex: 'active',
      render: active => (active ? <Icon type="check" /> : null),
      align: 'center'
    }
  ]

  const handleTableChange = ({ current, pageSize }) => {
    fetchMore({
      query: CARS_TABLE_QUERY,
      variables: {
        limit: pageSize,
        offset: current * pageSize - pageSize
      },
      updateQuery: (prev, { fetchMoreResult }) => (!fetchMoreResult ? null : fetchMoreResult)
    })
  }
  return (
    <Wrapper>
      <SwipeableViews>
        <Table
          rowKey={record => record._id}
          onRow={record => {
            return {
              onClick: () => history.push(`${Routes.CAR.path}/${record._id}`)
            }
          }}
          rowClassName="row-hover"
          size="middle"
          loading={loading}
          columns={columns}
          dataSource={cars}
          pagination={{ total: carsCount }}
          onChange={handleTableChange}
          locale={{ emptyText: 'Žádná data', filterReset: 'Zrušit' }}
        />
      </SwipeableViews>
    </Wrapper>
  )
}

export default compose(
  withRouter,
  graphql(CARS_TABLE_QUERY, {
    options: ({ history }) => ({
      variables: { limit: 10, offset: 0 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(CarsList)
