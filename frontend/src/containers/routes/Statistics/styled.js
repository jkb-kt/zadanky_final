import styled from 'styled-components'

export const ChartWrapper = styled.div`
  display: flex;
  height: 50vh;
  margin: 20px 0;

  @media only screen and (max-width: ${props => props.theme.resolution.screenXl}) {
    flex-direction: column;
    height: 90vh;
  }
`
