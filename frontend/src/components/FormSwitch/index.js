import { Form, Switch } from 'antd'
import { Field } from 'formik'
import React from 'react'
import { ErrorText, StyledDiv } from '../shared/styled'

const { Item } = Form

export default ({ name, touched, errors, label, checked, onSetFieldValue, required }) => {
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
            <Switch
              checked={checked}
              onChange={event => {
                onSetFieldValue(name, event)
              }}
            />
            <ErrorText>{touched[name] && errors[name] ? errors[name] : ''}</ErrorText>
          </Item>
        </StyledDiv>
      )}
    />
  )
}
