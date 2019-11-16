import { Checkbox, Form } from 'antd'
import { Field, FieldArray } from 'formik'
import React from 'react'
import { ErrorText, StyledDiv } from '../shared/styled'

const { Item } = Form

export default ({ name, values, label, options, errors, touched, required }) => (
  <FieldArray
    name={name}
    render={arrayHelpers => (
      <StyledDiv>
        <Field
          name={name}
          render={({ field }) => (
            <Item label={label} required={required} colon={false}>
              {options.map(option => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  checked={values.includes(option.value)}
                  onChange={event => {
                    if (!values.includes(event.target.value)) {
                      arrayHelpers.push(event.target.value)
                    } else {
                      const index = values.indexOf(event.target.value)
                      arrayHelpers.remove(index)
                    }
                  }}
                >
                  {option.label}
                </Checkbox>
              ))}
            </Item>
          )}
        />
        <ErrorText>{touched[name] && errors[name] ? errors[name] : ''}</ErrorText>
      </StyledDiv>
    )}
  />
)
