import { Card, Icon } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`

export const StyledCard = styled(Card)`
  background-color: #fafafa !important;
  width: 150px;
  height: 100px;
  margin: 15px 20px 0 0 !important;

  :last-child {
    margin-right: 0px !important;
  }

  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: 0;
  }
`

export const StyledIcon = styled(Icon)`
  font-size: 30px;
`

export const CardText = styled.div`
  margin-top: 15px;
  margin-bottom: 5px;
`
