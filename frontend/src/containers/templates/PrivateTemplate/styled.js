import { Button, Layout, Menu } from 'antd'
import styled from 'styled-components'

const { Content, Footer } = Layout

export const StyledMenu = styled(Menu)`
  flex-grow: 1;
  background-color: #fafafa !important;
  border: none !important;
`

export const StyledContent = styled(Content)`
  margin-top: 150px;
  @media only screen and (min-width: ${props => props.theme.resolution.screenLg}) {
    margin-top: 90px;
  }
`

export const StyledFooter = styled(Footer)`
  text-align: center;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 10px 0;
  background-color: #fafafa;
  box-shadow: 0px 1px 5px -1px black;
  @media only screen and (min-width: ${props => props.theme.resolution.screenLg}) {
    flex-direction: row;
  }
`

export const AuthInfo = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${props => props.theme.resolution.screenLg}) {
    margin-top: 0;
  }
`

export const NameText = styled.span`
  margin-right: 20px;
  :hover {
    color: ${props => props.theme.colors.main};
  }
`

export const StyledH1 = styled.h1`
  white-space: nowrap;
  margin: 0 20px;
  font-weight: 500;
  text-decoration: none;
  :hover {
    color: ${props => props.theme.colors.main};
  }
`

export const MarginedButton = styled(Button)`
  margin: 0 5px;
`

export const HideableText = styled.span`
  display: none;
  @media only screen and (min-width: ${props => props.theme.resolution.screenXSm}) {
    display: initial;
  }
`
