import React from 'react'
import { graphql } from 'react-apollo'
import { Redirect, Route } from 'react-router-dom'
import { Routes } from '..'
import CenteredSpin from '../../../components/CenteredSpin'
import { IS_ME_QUERY } from '../../../graphql/auths'
import PublicTemplate from '../../templates/PublicTemplate'

const PublicRoute = ({ exact, path, component: Component, data: { loading, isMe } }) => {
  if (loading) {
    return <CenteredSpin />
  }

  if (isMe) {
    return <Redirect to={Routes.HOME.path} />
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        <PublicTemplate>
          <Component />
        </PublicTemplate>
      )}
    />
  )
}

export default graphql(IS_ME_QUERY, { options: { fetchPolicy: 'network-only' } })(PublicRoute)
