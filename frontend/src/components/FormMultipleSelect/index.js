import { Form, Select } from 'antd'
import { Field } from 'formik'
import React from 'react'
import { ErrorText, StyledDiv } from '../shared/styled'
import { Wrapper } from './styled'

const { Item } = Form
const SelectOption = Select.Option

export default ({
  name,
  label,
  options,
  onSetFieldValue,
  onSetFieldTouched,
  touched,
  errors,
  disabled,
  required
}) => {
  const shouldDisplayErrors = name => {
    if (touched[name] && errors[name]) {
      return touched[name] && errors[name]
    }
    return false
  }

  const displayErrors = name => {
    return shouldDisplayErrors(name) ? errors[name] : ''
  }

  return (
    <StyledDiv>
      <Field
        name={name}
        render={({ field }) => (
          <Item
            validateStatus={shouldDisplayErrors(name) ? 'error' : null}
            label={label}
            required={required}
            colon={false}
          >
            <Wrapper>
              <Select
                {...field}
                mode="multiple"
                showSearch
                disabled={disabled}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={value => onSetFieldValue(name, value)}
                onBlur={() => onSetFieldTouched(name)}
              >
                {options && options.length && options[0].roles
                  ? options &&
                    options
                      .filter(option => option.roles.includes(name) && option.active)
                      .map(option => (
                        <SelectOption key={option._id} value={option._id}>
                          {`${option.lastName} ${option.firstName}`}
                        </SelectOption>
                      ))
                  : options &&
                    options.map(option => (
                      <SelectOption key={option._id} value={option._id}>
                        {option.name}
                      </SelectOption>
                    ))}
              </Select>
            </Wrapper>
            <ErrorText>{displayErrors(name)}</ErrorText>
          </Item>
        )}
      />
    </StyledDiv>
  )
}
