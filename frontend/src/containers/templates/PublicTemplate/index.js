import React from 'react'
import { StyledLayout } from '../shared'
import { PublicLayout } from './styled'

export default ({ children }) => (
  <StyledLayout>
    <PublicLayout>{children}</PublicLayout>
  </StyledLayout>
)
