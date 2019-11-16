import { Formik } from 'formik'
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import * as yup from 'yup'
import FormInput from '../../../components/FormInput'
import { FormErrors, Notifications } from '../../../constants'
import { RESET_PASSWORD } from '../../../graphql/auths'
import { handlePasswordResetRequest } from '../../../utils/helpers'
import { Routes } from '../../routes'
import { StyledP } from '../../templates/PublicTemplate/styled'
import { CenteredP, LoginStyledForm, StyledButton } from '../shared/styled'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(FormErrors.NOT_EMAIL)
    .required(FormErrors.EMAIL_REQUIRED)
})

const initialValues = { email: '' }

const PasswordResetForm = ({ mutate, history }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values =>
      handlePasswordResetRequest({
        values,
        cb: mutate,
        message: Notifications.PASSWORD_RESET_REQUEST,
        history
      })
    }
    render={({ errors, touched }) => (
      <>
        <StyledP>Obnova hesla</StyledP>
        <LoginStyledForm>
          <FormInput name="email" placeholder="Email" errors={errors} touched={touched} />
          <StyledButton htmlType="submit" type="primary">
            Obnovit
          </StyledButton>
          <CenteredP>
            Pokud jste si na heslo vzpomněli, <Link to={Routes.LOGIN.path}>přihlaste se.</Link>
          </CenteredP>
        </LoginStyledForm>
      </>
    )}
  />
)

export default compose(
  withRouter,
  graphql(RESET_PASSWORD)
)(PasswordResetForm)
