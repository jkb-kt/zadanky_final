import { DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/cs_CZ'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import BarChart from '../../../components/BarChart'
import CenteredSpin from '../../../components/CenteredSpin'
import PieChart from '../../../components/PieChart'
import { STATISTICS_QUERY } from '../../../graphql'
import { StyledH2 } from '../../forms/shared/styled'
import { ChartWrapper } from './styled'

const { RangePicker } = DatePicker

const Statistics = ({ client, history }) => {
  const [state, setState] = useState({ statistics: {}, loading: true })
  const getStatistics = async dateRange => {
    setState({ ...state, loading: true })
    const { data } = await client.query({
      query: STATISTICS_QUERY,
      variables: { dateRange: dateRange || [moment().startOf('year'), moment().endOf('year')] }
    })
    setState({ statistics: data.statistics, loading: false })
  }

  useEffect(() => {
    getStatistics()
  }, [])

  return (
    <>
      <StyledH2>Statistiky</StyledH2>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <RangePicker
          defaultValue={[moment().startOf('year'), moment().endOf('year')]}
          locale={locale}
          allowClear={false}
          format="DD.MM.YYYY"
          onChange={dateString => getStatistics(dateString)}
        />
      </div>
      {state.loading ? (
        <CenteredSpin />
      ) : (
        <>
          <ChartWrapper>
            <BarChart data={state.statistics.cars} label="5 nejčastěji využívaných vozidel" />
            <PieChart
              label="5 nejčastějších účelů jízd"
              data={state.statistics.reasons.map(reason => ({
                id: reason.name,
                label: reason.name,
                value: reason.count
              }))}
            />
          </ChartWrapper>
          <ChartWrapper>
            <PieChart
              label="5 nejčastějších cílů jízd"
              data={state.statistics.destinations.map(destination => ({
                id: destination.name,
                label: destination.name,
                value: destination.count
              }))}
            />
            <BarChart data={state.statistics.users} label="5 nejčastějších pasažérů" />
          </ChartWrapper>
        </>
      )}
    </>
  )
}

export default compose(
  withRouter,
  withApollo
)(Statistics)
