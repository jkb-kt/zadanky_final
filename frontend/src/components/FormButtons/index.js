import { Row } from 'antd'
import React from 'react'
import { CenteredButton } from './styled'

export default ({ history, confirmText }) => (
  <Row type="flex" justify="center">
    <CenteredButton htmlType="submit" type="primary">
      {confirmText || 'Uložit'}
    </CenteredButton>
    <CenteredButton type="danger" onClick={() => history.goBack()}>
      Zpět
    </CenteredButton>
  </Row>
)
