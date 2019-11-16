import { Icon, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { AUTHS_TABLE_QUERY } from '../../../graphql/auths'
import { handleErrors } from '../../../utils/helpers'
import { Wrapper } from './styled'

const mapRoleToName = role => {
  if (role === 'approver') {
    return 'schvalující '
  } else if (role === 'requestant') {
    return 'žadatel '
  } else {
    return 'řidič '
  }
}

const AuthsList = ({ data: { auths, authsCount, loading, fetchMore }, history }) => {
  const columns = [
    {
      title: 'Jméno',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Registrace',
      dataIndex: 'createdAt',
      render: date => moment(date).format('DD.MM.YYYY HH:mm')
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      render: roles => roles.map(mapRoleToName)
    },
    {
      title: 'Schválen',
      dataIndex: 'approved',
      render: approved => (approved ? <Icon type="check" /> : null),
      align: 'center'
    }
  ]

  const handleTableChange = ({ current, pageSize }) => {
    fetchMore({
      query: AUTHS_TABLE_QUERY,
      variables: {
        limit: pageSize,
        offset: current * pageSize - pageSize
      },
      updateQuery: (prev, { fetchMoreResult }) => (!fetchMoreResult ? null : fetchMoreResult)
    })
  }
  return (
    <Wrapper>
      <Table
        rowKey={record => record._id}
        onRow={record => {
          return {
            onClick: () => history.push(`/auth/${record._id}`)
          }
        }}
        rowClassName="row-hover"
        size="middle"
        loading={loading}
        columns={columns}
        dataSource={auths}
        pagination={{ total: authsCount }}
        onChange={handleTableChange}
        locale={{ emptyText: 'Žádná data', filterReset: 'Zrušit' }}
      />
    </Wrapper>
  )
}

export default compose(
  withRouter,
  graphql(AUTHS_TABLE_QUERY, {
    options: ({ history }) => ({
      variables: { limit: 10, offset: 0 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(AuthsList)
