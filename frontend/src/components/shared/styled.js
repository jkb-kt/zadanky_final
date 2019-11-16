import { Button } from 'antd'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
  margin: 0 auto;
  margin-bottom: 15px;
`
export const ErrorText = styled.div`
  color: red;
  margin: 10px auto;
  font-size: ${props => props.theme.font_size.small};
`

export const StyledDiv = styled.div`
  margin: ${props => (props.isSmaller ? 'none' : '0 auto')};
  width: 100%;

  @media only screen and (min-width: ${props => props.theme.resolution.screenSm}) {
    width: ${props => (props.isSmaller ? '70%' : '90%')};
  }

  @media only screen and (min-width: ${props => props.theme.resolution.screenLg}) {
    width: ${props => (props.isSmaller ? '50%' : '70%')};
  }
`
