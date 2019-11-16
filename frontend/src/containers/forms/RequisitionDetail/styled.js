import styled from 'styled-components'

export const TextDiv = styled.div`
  width: 60%;
  margin: 0 auto;
`

export const TextInfo = styled.p`
  margin-bottom: 3px;
  font-size: ${props => props.theme.font_size.small};
`

export const BoldText = styled.span`
  font-weight: bold;
`

export const StatusInfo = styled.div`
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
`
