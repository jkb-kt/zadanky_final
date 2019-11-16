import styled from 'styled-components'

export const PublicLayout = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
`

export const StyledP = styled.p`
  text-align: center;
  margin: 30px auto;
  width: 60%;
  font-size: 0.9rem;
  @media only screen and (min-width: ${props => props.theme.resolution.screenSm}) {
    font-size: 1.3rem;
  }
`
