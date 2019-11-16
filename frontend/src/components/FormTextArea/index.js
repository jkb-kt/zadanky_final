import { Form, Input } from 'antd'
import { Field } from 'formik'
import React from 'react'
import { ErrorText, StyledDiv } from '../shared/styled'

const { Item } = Form
const { TextArea } = Input

export default ({ name, touched, errors, label, placeholder, type, rows, disabled, required }) => {
  return (
    <Field
      name={name}
      render={({ field }) => (
        <StyledDiv>
          <Item
            validateStatus={touched[name] && errors[name] && 'error'}
            label={label}
            required={required}
            colon={false}
          >
            <TextArea
              {...field}
              rows={rows}
              placeholder={placeholder || ''}
              type={type || null}
              disabled={disabled}
            />
            <ErrorText>{touched[name] && errors[name] ? errors[name] : ''}</ErrorText>
          </Item>
        </StyledDiv>
      )}
    />
  )
}
