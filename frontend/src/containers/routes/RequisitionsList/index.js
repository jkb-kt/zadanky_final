import { Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { Routes } from '..'
import {
  REQUISITION_TABLE_QUERY,
  REQUISITION_TABLE_WITH_DATA_QUERY
} from '../../../graphql/requisitions'
import { handleErrors, mapStatusToText } from '../../../utils/helpers'
import { Wrapper } from './styled'

const RequisitionsList = ({
  data: { requisitions, cars, users, requisitionsCount, loading, fetchMore },
  history
}) => {
  const columns = [
    {
      title: 'Číslo',
      dataIndex: 'number'
    },
    {
      title: 'Vozidlo',
      dataIndex: 'car',
      render: car => car.name,
      filterMultiple: false,
      filters:
        cars &&
        cars.map(car => {
          return {
            text: car.name,
            value: car._id
          }
        })
    },
    {
      title: 'Řidič',
      dataIndex: 'driver',
      render: driver => driver.lastName,
      filterMultiple: false,
      filters:
        users &&
        users
          .filter(user => user.roles.includes('driver'))
          .map(user => {
            return {
              text: user.lastName,
              value: user._id
            }
          })
    },
    {
      title: 'Schvalující',
      dataIndex: 'approver',
      render: approver => approver.lastName,
      filterMultiple: false,
      filters:
        users &&
        users
          .filter(user => user.roles.includes('approver'))
          .map(user => {
            return {
              text: user.lastName,
              value: user._id
            }
          })
    },
    {
      title: 'Datum cesty',
      dataIndex: 'startDate',
      render: startDate => moment(startDate).format('DD.MM.YYYY HH:mm'),
      filterMultiple: false,
      filters: [
        { text: 'Dnes', value: [moment().startOf('day'), moment().endOf('day')] },
        {
          text: 'Zítra',
          value: [
            moment()
              .add(1, 'day')
              .startOf('day'),
            moment()
              .add(1, 'day')
              .endOf('day')
          ]
        },
        {
          text: 'Týden',
          value: [
            moment().startOf('day'),
            moment()
              .add(1, 'week')
              .endOf('day')
          ]
        }
      ]
    },
    {
      title: 'Stav',
      dataIndex: 'status',
      render: status => mapStatusToText(status),
      filterMultiple: false,
      filters: [
        {
          text: 'neschválena',
          value: 'unapproved'
        },
        {
          text: 'schválena',
          value: 'approved'
        },
        {
          text: 'provedena',
          value: 'done'
        }
      ]
    }
  ]

  const handleTableChange = (
    { current, pageSize },
    { car, driver, approver, status, startDate }
  ) => {
    fetchMore({
      query: REQUISITION_TABLE_QUERY,
      variables: {
        limit: pageSize,
        offset: current * pageSize - pageSize,
        car: car && car[0],
        driver: driver && driver[0],
        approver: approver && approver[0],
        status: status && status[0],
        date: startDate && startDate[0]
      },
      updateQuery: (prev, { fetchMoreResult }) =>
        !fetchMoreResult ? null : { cars: prev.cars, users: prev.users, ...fetchMoreResult }
    })
  }
  return (
    <Wrapper>
      <SwipeableViews>
        <Table
          rowKey={record => record._id}
          onRow={record => {
            return {
              onClick: () => history.push(`${Routes.REQUISITION.path}/${record._id}`)
            }
          }}
          rowClassName="row-hover"
          size="middle"
          loading={loading}
          columns={columns}
          dataSource={requisitions}
          pagination={{ total: requisitionsCount }}
          onChange={handleTableChange}
          locale={{ emptyText: 'Žádná data', filterReset: 'Zrušit' }}
        />
      </SwipeableViews>
    </Wrapper>
  )
}

export default compose(
  withRouter,
  graphql(REQUISITION_TABLE_WITH_DATA_QUERY, {
    options: ({ history }) => ({
      variables: { limit: 10, offset: 0 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(RequisitionsList)
