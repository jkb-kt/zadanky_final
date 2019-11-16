import { DatePicker, Form } from 'antd'
import locale from 'antd/lib/date-picker/locale/cs_CZ'
import { Field } from 'formik'
import React from 'react'
import { ErrorText } from '../shared/styled'
import { CenteredDate } from './styled'

const { Item } = Form

export default ({
  name,
  touched,
  errors,
  label,
  onSetFieldValue,
  onSetFieldTouched,
  disabled,
  required
}) => {
  return (
    <Field
      name={name}
      render={({ field }) => (
        <CenteredDate>
          <Item
            validateStatus={touched[name] && errors[name] && 'error'}
            label={label}
            required={required}
            colon={false}
          >
            <DatePicker
              {...field}
              style={{ width: '100%' }}
              showTime={{ format: 'HH:mm', minuteStep: 5 }}
              locale={locale}
              allowClear={false}
              format="DD.MM.YYYY HH:mm"
              onChange={dateString => onSetFieldValue(name, dateString)}
              onBlur={() => onSetFieldTouched(name)}
              disabled={disabled}
            />
            <ErrorText>{touched[name] && errors[name] ? errors[name] : ''}</ErrorText>
          </Item>
        </CenteredDate>
      )}
    />
  )
}
