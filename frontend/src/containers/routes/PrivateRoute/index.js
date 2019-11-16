import React from 'react'
import { graphql } from 'react-apollo'
import { Redirect, Route } from 'react-router-dom'
import { Routes } from '..'
import CenteredSpin from '../../../components/CenteredSpin'
import { IS_ME_QUERY } from '../../../graphql/auths'
import { isRouteAllowed } from '../../../utils/helpers'
import PrivateTemplate from '../../templates/PrivateTemplate'

const PrivateRoute = ({
  exact,
  allowedRoles,
  path,
  component: Component,
  data: { loading, isMe }
}) => {
  if (loading) {
    return <CenteredSpin />
  }
  if (!isMe) {
    return <Redirect to={Routes.LOGIN.path} />
  }

  if (!isRouteAllowed(allowedRoles, isMe.roles)) {
    return <Redirect to={Routes.HOME.path} />
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        <PrivateTemplate authRoles={isMe.roles} name={isMe.name} authId={isMe._id}>
          <Component />
        </PrivateTemplate>
      )}
    />
  )
}

export default graphql(IS_ME_QUERY, { options: { fetchPolicy: 'network-only' } })(PrivateRoute)
