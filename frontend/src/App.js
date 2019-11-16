/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Main frontend file, routing
*/

import ApolloClient from 'apollo-boost'
import createBrowserHistory from 'history/createBrowserHistory'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Router, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import conf from './conf'
import AuthDetail from './containers/forms/AuthDetail'
import CarForm from './containers/forms/Car'
import CarDetail from './containers/forms/CarDetail'
import DestinationForm from './containers/forms/Destination'
import Export from './containers/forms/Export'
import LoginForm from './containers/forms/Login'
import PasswordResetForm from './containers/forms/PasswordReset'
import PasswordResetNew from './containers/forms/PasswordResetNew'
import ReasonForm from './containers/forms/Reason'
import RegisterForm from './containers/forms/Register'
import RequisitionForm from './containers/forms/Requisition'
import RequisitionDetail from './containers/forms/RequisitionDetail'
import TemplateForm from './containers/forms/Template'
import TemplateDetail from './containers/forms/TemplateDetail'
import UserForm from './containers/forms/User'
import UserDetail from './containers/forms/UserDetail'
import { Routes } from './containers/routes'
import AuthsList from './containers/routes/AuthsList'
import Calendar from './containers/routes/Calendar'
import CarsList from './containers/routes/CarsList'
import DestinationsList from './containers/routes/DestinationsList'
import Home from './containers/routes/Home'
import PrivateRoute from './containers/routes/PrivateRoute'
import PublicRoute from './containers/routes/PublicRoute'
import ReasonsList from './containers/routes/ReasonsList'
import RequisitionsList from './containers/routes/RequisitionsList'
import Statistics from './containers/routes/Statistics'
import TemplatesList from './containers/routes/TemplatesList'
import UsersList from './containers/routes/UsersList'
import { ModalProvider } from './context'
import theme, { GlobalStyle } from './stylesheets/theme'

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? conf.URI_PRODUCTION : conf.URI_DEVELOPMENT,
  credentials: 'include'
})

const history = createBrowserHistory()

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <GlobalStyle />
        <Router history={history}>
          <Switch>
            <PublicRoute exact path={Routes.LOGIN.path} component={LoginForm} />
            <PublicRoute exact path={Routes.REGISTER.path} component={RegisterForm} />
            <PublicRoute exact path={Routes.PASSWORD_RESET.path} component={PasswordResetForm} />
            <PublicRoute exact path={Routes.PASSWORD_RESET_NEW.path} component={PasswordResetNew} />
            <PrivateRoute
              exact
              allowedRoles={Routes.HOME.allowedRoles}
              path={Routes.HOME.path}
              component={Home}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.REQUISITIONS.allowedRoles}
              path={Routes.REQUISITIONS.path}
              component={RequisitionsList}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.TEMPLATES.allowedRoles}
              path={Routes.TEMPLATES.path}
              component={TemplatesList}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.USERS.allowedRoles}
              path={Routes.USERS.path}
              component={UsersList}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.CARS.allowedRoles}
              path={Routes.CARS.path}
              component={CarsList}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.DESTINATIONS.allowedRoles}
              path={Routes.DESTINATIONS.path}
              component={DestinationsList}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.REASONS.allowedRoles}
              path={Routes.REASONS.path}
              component={ReasonsList}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.REQUISITION_DETAIL.allowedRoles}
              path={Routes.REQUISITION_DETAIL.path}
              component={RequisitionDetail}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.TEMPLATE_DETAIL.allowedRoles}
              path={Routes.TEMPLATE_DETAIL.path}
              component={TemplateDetail}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.USER_DETAIL.allowedRoles}
              path={Routes.USER_DETAIL.path}
              component={UserDetail}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.CAR_DETAIL.allowedRoles}
              path={Routes.CAR_DETAIL.path}
              component={CarDetail}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.REQUISITION.allowedRoles}
              path={Routes.REQUISITION.path}
              component={RequisitionForm}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.TEMPLATE.allowedRoles}
              path={Routes.TEMPLATE.path}
              component={TemplateForm}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.USER.allowedRoles}
              path={Routes.USER.path}
              component={UserForm}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.CAR.allowedRoles}
              path={Routes.CAR.path}
              component={CarForm}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.REASON.allowedRoles}
              path={Routes.REASON.path}
              component={ReasonForm}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.DESTINATION.allowedRoles}
              path={Routes.DESTINATION.path}
              component={DestinationForm}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.AUTHS.allowedRoles}
              path={Routes.AUTHS.path}
              component={AuthsList}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.AUTH_DETAIL.allowedRoles}
              path={Routes.AUTH_DETAIL.path}
              component={AuthDetail}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.EXPORT.allowedRoles}
              path={Routes.EXPORT.path}
              component={Export}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.CALENDAR.allowedRoles}
              path={Routes.CALENDAR.path}
              component={Calendar}
            />
            <PrivateRoute
              exact
              allowedRoles={Routes.STATISTICS.allowedRoles}
              path={Routes.STATISTICS.path}
              component={Statistics}
            />
          </Switch>
        </Router>
      </ModalProvider>
    </ThemeProvider>
  </ApolloProvider>
)
