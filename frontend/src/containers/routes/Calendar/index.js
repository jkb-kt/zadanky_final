import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import BigCalendar from '../../../components/BigCalendar'
import CenteredSpin from '../../../components/CenteredSpin'
import { REQUISITION_CALENDAR_QUERY } from '../../../graphql/requisitions'
import { handleErrors } from '../../../utils/helpers'

const Calendar = ({ data: { requisitions, loading }, history }) => {
  if (loading || !requisitions) {
    return <CenteredSpin />
  }

  return <BigCalendar events={requisitions} history={history} />
}

export default compose(
  withRouter,
  graphql(REQUISITION_CALENDAR_QUERY, {
    options: ({ history }) => ({
      fetchPolicy: 'network-only',
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(Calendar)
