import { Icon, Menu, Tooltip } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import { Link } from 'react-router-dom'
import { LOGOUT } from '../../../graphql/auths'
import { isRouteAllowed, pushSubscribe, pushUnsubscribe } from '../../../utils/helpers'
import { Routes } from '../../routes'
import { StyledLayout } from '../shared'
import {
  AuthInfo,
  Header,
  HideableText,
  MarginedButton,
  NameText,
  StyledContent,
  StyledFooter,
  StyledH1,
  StyledMenu
} from './styled'

const { SubMenu, Item } = Menu

const PrivateTemplate = ({ children, name, authId, client, mutate, authRoles }) => {
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.getSubscription().then(subscription => setSubscription(subscription))
    })
  }, [])

  return (
    <StyledLayout>
      <Header>
        <Link style={{ textDecoration: 'none' }} to={Routes.HOME.path}>
          <StyledH1>Žádanky o přepravu</StyledH1>
        </Link>
        <StyledMenu mode="horizontal" selectedKeys={[window.location.pathname]}>
          {isRouteAllowed(Routes.REQUISITIONS.allowedRoles, authRoles) && (
            <Item key={Routes.REQUISITIONS.path}>
              <Link to={Routes.REQUISITIONS.path}>
                <Icon type="table" />
                <HideableText>Seznam žádanek</HideableText>
              </Link>
            </Item>
          )}
          {isRouteAllowed(Routes.CALENDAR.allowedRoles, authRoles) && (
            <Item key={Routes.CALENDAR.path}>
              <Link to={Routes.CALENDAR.path}>
                <Icon type="calendar" />
                <HideableText>Kalendář jízd</HideableText>
              </Link>
            </Item>
          )}
          {isRouteAllowed(['requestant', 'admin'], authRoles) && (
            <SubMenu
              title={
                <>
                  <Icon type="plus" />
                  <HideableText>Vytvořit</HideableText>
                </>
              }
            >
              {isRouteAllowed(Routes.REQUISITION.allowedRoles, authRoles) && (
                <Item key={Routes.REQUISITION.path}>
                  <Link to={Routes.REQUISITION.path}>
                    <Icon type="form" />
                    Žádanku
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.TEMPLATE.allowedRoles, authRoles) && (
                <Item key={Routes.TEMPLATE.path}>
                  <Link to={Routes.TEMPLATE.path}>
                    <Icon type="form" />
                    Vzor
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.USER.allowedRoles, authRoles) && (
                <Item key={Routes.USER.path}>
                  <Link to={Routes.USER.path}>
                    <Icon type="user-add" />
                    Uživatele
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.CAR.allowedRoles, authRoles) && (
                <Item key={Routes.CAR.path}>
                  <Link to={Routes.CAR.path}>
                    <Icon type="car" />
                    Vozidlo
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.REASON.allowedRoles, authRoles) && (
                <Item key={Routes.REASON.path}>
                  <Link to={Routes.REASON.path}>
                    <Icon type="audit" />
                    Účel jízdy
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.DESTINATION.allowedRoles, authRoles) && (
                <Item key={Routes.DESTINATION.path}>
                  <Link to={Routes.DESTINATION.path}>
                    <Icon type="global" />
                    Destinaci
                  </Link>
                </Item>
              )}
            </SubMenu>
          )}
          {isRouteAllowed(['admin', 'requestant'], authRoles) && (
            <SubMenu
              title={
                <>
                  <Icon type="edit" />
                  <HideableText>Upravit</HideableText>
                </>
              }
            >
              {isRouteAllowed(Routes.TEMPLATES.allowedRoles, authRoles) && (
                <Item key={Routes.TEMPLATES.path}>
                  <Link to={Routes.TEMPLATES.path}>
                    <Icon type="form" />
                    Vzory
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.USERS.allowedRoles, authRoles) && (
                <Item key={Routes.USERS.path}>
                  <Link to={Routes.USERS.path}>
                    <Icon type="user-add" />
                    Uživatele
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.CARS.allowedRoles, authRoles) && (
                <Item key={Routes.CARS.path}>
                  <Link to={Routes.CARS.path}>
                    <Icon type="car" />
                    Vozidla
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.REASONS.allowedRoles, authRoles) && (
                <Item key={Routes.REASONS.path}>
                  <Link to={Routes.REASONS.path}>
                    <Icon type="audit" />
                    Účely jízd
                  </Link>
                </Item>
              )}
              {isRouteAllowed(Routes.DESTINATIONS.allowedRoles, authRoles) && (
                <Item key={Routes.DESTINATIONS.path}>
                  <Link to={Routes.DESTINATIONS.path}>
                    <Icon type="global" />
                    Destinace
                  </Link>
                </Item>
              )}
            </SubMenu>
          )}
          {isRouteAllowed(Routes.STATISTICS.allowedRoles, authRoles) && (
            <Item key={Routes.STATISTICS.path}>
              <Link to={Routes.STATISTICS.path}>
                <Icon type="bar-chart" />
                <HideableText>Statistiky</HideableText>
              </Link>
            </Item>
          )}
          {isRouteAllowed(Routes.EXPORT.allowedRoles, authRoles) && (
            <Item key={Routes.EXPORT.path}>
              <Link to={Routes.EXPORT.path}>
                <Icon type="export" />
                <HideableText>Export</HideableText>
              </Link>
            </Item>
          )}
          {isRouteAllowed(Routes.AUTHS.allowedRoles, authRoles) && (
            <Item key={Routes.AUTHS.path}>
              <Link to={Routes.AUTHS.path}>
                <Icon type="team" />
                <HideableText>Přístupové účty</HideableText>
              </Link>
            </Item>
          )}
        </StyledMenu>
        <AuthInfo>
          <NameText>{name}</NameText>
          {isRouteAllowed(['driver', 'requestant', 'approver'], authRoles) && (
            <>
              {subscription ? (
                <Tooltip placement="bottom" title="Vypnout notifikace">
                  <MarginedButton
                    type="danger"
                    size="small"
                    icon="bell"
                    onClick={() => pushUnsubscribe({ client, setSubscription })}
                  />
                </Tooltip>
              ) : (
                <Tooltip placement="bottom" title="Zapnout notifikace">
                  <MarginedButton
                    type="primary"
                    size="small"
                    icon="bell"
                    onClick={() => pushSubscribe({ client, setSubscription, authId })}
                  />
                </Tooltip>
              )}
            </>
          )}
          <Tooltip placement="bottom" title="Odhlásit se">
            <MarginedButton
              type="primary"
              size="small"
              icon="poweroff"
              onClick={async () => {
                await mutate()
                client.resetStore()
              }}
            />
          </Tooltip>
        </AuthInfo>
      </Header>
      <StyledContent>{children}</StyledContent>
      <StyledFooter>
        <a href="https://jakubkot.com" target="__blank">
          © Jakub Kot {moment().year()}
        </a>
      </StyledFooter>
    </StyledLayout>
  )
}

export default compose(
  withApollo,
  graphql(LOGOUT)
)(PrivateTemplate)
