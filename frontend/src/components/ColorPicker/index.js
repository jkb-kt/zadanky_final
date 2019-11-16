import { Row } from 'antd'
import { Field } from 'formik'
import React from 'react'
import { CirclePicker } from 'react-color'
import { ErrorText } from '../shared/styled'

export default ({ name, touched, errors, setFieldValue }) => {
  return (
    <Field
      name={name}
      render={({ field }) => (
        <>
          <Row type="flex" justify="center">
            <CirclePicker
              color={field.value}
              onChangeComplete={color => setFieldValue(name, color.hex)}
            />
          </Row>
          <ErrorText>{touched[name] && errors[name] ? errors[name] : ''}</ErrorText>
        </>
      )}
    />
  )
}
