import { Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { Routes } from '..'
import { TEMPLATES_TABLE_QUERY } from '../../../graphql/templates'
import { handleErrors } from '../../../utils/helpers'
import { Wrapper } from './styled'

const TemplatesList = ({ data: { templates, templatesCount, loading, fetchMore }, history }) => {
  const columns = [
    {
      title: 'Název',
      dataIndex: 'name'
    },
    {
      title: 'Vytvořil',
      dataIndex: 'author',
      render: author => author.name
    },
    {
      title: 'Vytvořeno',
      dataIndex: 'createdAt',
      render: date => moment(date).format('DD.MM.YYYY HH:mm')
    }
  ]

  const handleTableChange = ({ current, pageSize }) => {
    fetchMore({
      query: TEMPLATES_TABLE_QUERY,
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
              onClick: () => history.push(`${Routes.TEMPLATE.path}/${record._id}`)
            }
          }}
          rowClassName="row-hover"
          size="middle"
          loading={loading}
          columns={columns}
          dataSource={templates}
          pagination={{ total: templatesCount }}
          onChange={handleTableChange}
          locale={{ emptyText: 'Žádná data', filterReset: 'Zrušit' }}
        />
      </SwipeableViews>
    </Wrapper>
  )
}

export default compose(
  withRouter,
  graphql(TEMPLATES_TABLE_QUERY, {
    options: ({ history }) => ({
      variables: { limit: 10, offset: 0 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(TemplatesList)
