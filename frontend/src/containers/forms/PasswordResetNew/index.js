import { Formik } from 'formik'
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'
import FormInput from '../../../components/FormInput'
import { FormErrors, Notifications } from '../../../constants'
import { SET_NEW_PASSWORD } from '../../../graphql/auths'
import { handleRegister } from '../../../utils/helpers'
import { StyledP } from '../../templates/PublicTemplate/styled'
import { LoginStyledForm, StyledButton } from '../shared/styled'

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, FormErrors.PASSWORD_LENGTH)
    .required(FormErrors.PASSWORD_REQUIRED),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], FormErrors.PASSWORDS_MISMATCH)
    .required(FormErrors.PASSWORD_REQUIRED)
})

const initialValues = { password: '', passwordConfirm: '' }

const PasswordResetNew = ({ mutate, history, match }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values => {
      const { id, token } = match.params
      return handleRegister({
        values: {
          ...values,
          authId: id,
          resetToken: token
        },
        cb: mutate,
        history,
        message: Notifications.PASSWORD_CHANGED
      })
    }}
    render={({ errors, touched }) => (
      <>
        <StyledP>Nové heslo</StyledP>
        <LoginStyledForm>
          <FormInput
            name="password"
            type="password"
            placeholder="Heslo"
            errors={errors}
            touched={touched}
          />
          <FormInput
            name="passwordConfirm"
            type="password"
            placeholder="Heslo znovu"
            errors={errors}
            touched={touched}
          />
          <StyledButton htmlType="submit" type="primary">
            Změnit heslo
          </StyledButton>
        </LoginStyledForm>
      </>
    )}
  />
)

export default compose(
  withRouter,
  graphql(SET_NEW_PASSWORD)
)(PasswordResetNew)
