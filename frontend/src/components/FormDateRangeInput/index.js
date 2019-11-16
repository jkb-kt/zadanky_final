import { DatePicker, Form } from 'antd'
import locale from 'antd/lib/date-picker/locale/cs_CZ'
import { Field } from 'formik'
import React from 'react'
import { ErrorText, StyledDiv } from '../shared/styled'

const { Item } = Form
const { RangePicker } = DatePicker

export default ({ name, touched, errors, label, onSetFieldValue, onSetFieldTouched, required }) => {
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
            <RangePicker
              {...field}
              style={{ width: '100%' }}
              locale={locale}
              allowClear={false}
              format="DD.MM.YYYY"
              onChange={dateString => onSetFieldValue(name, dateString)}
              onBlur={() => onSetFieldTouched(name)}
            />
            <ErrorText>{touched[name] && errors[name] ? errors[name] : ''}</ErrorText>
          </Item>
        </StyledDiv>
      )}
    />
  )
}
