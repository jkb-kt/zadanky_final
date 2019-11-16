import { Form, Input } from 'antd'
import { Field } from 'formik'
import React from 'react'
import { ErrorText, StyledDiv } from '../shared/styled'

const { Item } = Form

export default ({ name, touched, errors, label, placeholder, type, smaller, required }) => {
  return (
    <Field
      name={name}
      render={({ field }) => (
        <StyledDiv isSmaller={smaller}>
          <Item
            validateStatus={touched[name] && errors[name] && 'error'}
            label={label}
            required={required}
            colon={false}
          >
            <Input {...field} placeholder={placeholder || ''} type={type || null} />
            <ErrorText>{touched[name] && errors[name] ? errors[name] : ''}</ErrorText>
          </Item>
        </StyledDiv>
      )}
    />
  )
}
