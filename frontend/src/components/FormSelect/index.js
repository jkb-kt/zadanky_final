import { Form, Select } from 'antd'
import { Field } from 'formik'
import React from 'react'
import { ErrorText, StyledDiv } from '../shared/styled'

const { Item } = Form
const Option = Select.Option

export default ({
  name,
  touched,
  errors,
  label,
  onSetFieldValue,
  options,
  onSelect,
  onSetFieldTouched,
  onSetValues,
  disabled,
  required
}) => {
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
            <Select
              {...field}
              showSearch
              disabled={disabled}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={value => {
                if (onSelect) {
                  onSelect(value, onSetValues)
                }
                onSetFieldValue(name, value)
              }}
              onBlur={() => onSetFieldTouched(name)}
            >
              {options && options.length && options[0].roles
                ? options
                    .filter(option => option.roles.includes(name) && option.active)
                    .map(option => (
                      <Option key={option._id} value={option._id}>
                        {`${option.lastName} ${option.firstName}`}
                      </Option>
                    ))
                : options && options.length && options[0].hasOwnProperty('active')
                ? options
                    .filter(option => option.active)
                    .map(option => (
                      <Option key={option._id} value={option._id}>
                        {option.name}
                      </Option>
                    ))
                : options &&
                  options.map(option => (
                    <Option key={option._id} value={option._id}>
                      {option.name || option.lastName + ' ' + option.firstName}
                    </Option>
                  ))}
            </Select>
            <ErrorText>{touched[name] && errors[name] ? errors[name] : ''}</ErrorText>
          </Item>
        </StyledDiv>
      )}
    />
  )
}
