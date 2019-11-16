import { Button } from 'antd'
import { Form } from 'formik'
import styled from 'styled-components'

export const StyledForm = styled(Form)`
  margin: 0 auto;
  padding: ${props => (props.login ? '40px 0 20px 0' : '')};
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  background-color: ${props => (props.login ? 'red' : '')};
`

export const StyledH2 = styled.h2`
  padding-top: 30px;
  text-align: center;
`

export const StyledButton = styled(Button)`
  margin: 0 auto 20px auto;
`

export const StretchedDiv = styled.div`
  flex: 1;
  text-align: center;
  margin-bottom: 10px;
`

export const TwoColumns = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${props => props.theme.resolution.screenSm}) {
    flex-direction: row;
  }
`

export const ItemGroup = styled.div`
  display: flex;
  justify-content: center;
`
export const MarginedButton = styled(Button)`
  margin: 30px 0 0 20px;
  @media only screen and (min-width: ${props => props.theme.resolution.screenXSm}) {
    margin: 40px 0 0 20px;
  }
`

export const LoginStyledForm = styled(Form)`
  margin: 0 auto;
  padding: 40px 10px 0 10px;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  border: solid 1px black;
  border-radius: 15px;
`

export const CenteredP = styled.p`
  text-align: center;
  font-size: 0.6rem;
  @media only screen and (min-width: ${props => props.theme.resolution.screenSm}) {
    font-size: 0.8rem;
  }
`
