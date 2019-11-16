import moment from 'moment'
import nameday from 'nameday-api'
import React, { useEffect, useState } from 'react'
import { compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Routes } from '..'
import { IS_ME_QUERY } from '../../../graphql/auths'
import { isRouteAllowed } from '../../../utils/helpers'
import { Cards, CardText, Container, StyledCard, StyledIcon } from './styled'

const Home = ({ client, history }) => {
  const [data, setData] = useState(null)
  const { isMe } = client.readQuery({ query: IS_ME_QUERY })

  const getPageData = async () => {
    try {
      const [today, tomorrow, weather] = await Promise.all([
        nameday.today('cz'),
        nameday.tomorrow('cz'),
        fetch(
          'https://api.openweathermap.org/data/2.5/weather?id=3072656&units=metric&lang=cz&appid=bccccef2e7898a3a8f35b8daff05b577'
        ).then(res => res.json())
      ])

      setData({
        nameDayToday: today.name_cz,
        nameDayTomorrow: tomorrow.name_cz,
        weather
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPageData()
  }, [])

  if (!data) {
    return <Container>Načítání dat..</Container>
  }

  return (
    <Container>
      Vítejte <b>{isMe.name}</b>,
      <br />
      dnes je{' '}
      <b>
        {moment().format('dddd')} {moment().format('DD.MM.')}
      </b>{' '}
      a svátek má <b>{data.nameDayToday}</b>. Zítra má svátek <b>{data.nameDayTomorrow}</b>.
      <br />V Krnově je <b>{data.weather.weather[0].description}</b> o teplotě{' '}
      <b>{Math.floor(data.weather.main.temp)}</b> °C.
      <br />
      <Cards>
        {isRouteAllowed(Routes.REQUISITIONS.allowedRoles, isMe.roles) && (
          <StyledCard onClick={() => history.push(Routes.REQUISITIONS.path)}>
            <StyledIcon type="table" />
            <CardText>Seznam žádanek</CardText>
          </StyledCard>
        )}
        {isRouteAllowed(Routes.CALENDAR.allowedRoles, isMe.roles) && (
          <StyledCard onClick={() => history.push(Routes.CALENDAR.path)}>
            <StyledIcon type="calendar" />
            <CardText>Kalendář jízd</CardText>
          </StyledCard>
        )}
        {isRouteAllowed(Routes.REQUISITION.allowedRoles, isMe.roles) && (
          <StyledCard onClick={() => history.push(Routes.REQUISITION.path)}>
            <StyledIcon type="form" />
            <CardText>Nová žádanka</CardText>
          </StyledCard>
        )}
        {isRouteAllowed(Routes.STATISTICS.allowedRoles, isMe.roles) && (
          <StyledCard onClick={() => history.push(Routes.STATISTICS.path)}>
            <StyledIcon type="bar-chart" />
            <CardText>Statistiky</CardText>
          </StyledCard>
        )}
        {isRouteAllowed(Routes.EXPORT.allowedRoles, isMe.roles) && (
          <StyledCard onClick={() => history.push(Routes.EXPORT.path)}>
            <StyledIcon type="export" />
            <CardText>Export</CardText>
          </StyledCard>
        )}
      </Cards>
    </Container>
  )
}

export default compose(withRouter, withApollo)(Home)
