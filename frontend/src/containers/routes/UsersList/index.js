import { Icon, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { Routes } from '..'
import { USERS_TABLE_QUERY } from '../../../graphql/users'
import { handleErrors } from '../../../utils/helpers'
import { Wrapper } from './styled'

const UsersList = ({ data: { users, usersCount, loading, fetchMore }, history }) => {
  const columns = [
    {
      title: 'Příjmení',
      dataIndex: 'lastName'
    },
    {
      title: 'Jméno',
      dataIndex: 'firstName'
    },
    {
      title: 'Vytvořeno',
      dataIndex: 'createdAt',
      render: date => moment(date).format('DD.MM.YYYY HH:mm')
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
      query: USERS_TABLE_QUERY,
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
              onClick: () => history.push(`${Routes.USER.path}/${record._id}`)
            }
          }}
          rowClassName="row-hover"
          size="middle"
          loading={loading}
          columns={columns}
          dataSource={users}
          pagination={{ total: usersCount }}
          onChange={handleTableChange}
          locale={{ emptyText: 'Žádná data', filterReset: 'Zrušit' }}
        />
      </SwipeableViews>
    </Wrapper>
  )
}

export default compose(
  withRouter,
  graphql(USERS_TABLE_QUERY, {
    options: ({ history }) => ({
      variables: { limit: 10, offset: 0 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(UsersList)
