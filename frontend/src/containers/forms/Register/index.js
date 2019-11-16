import { Formik } from 'formik'
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import * as yup from 'yup'
import FormInput from '../../../components/FormInput'
import { FormErrors, Notifications } from '../../../constants'
import { REGISTER } from '../../../graphql/auths'
import { handleRegister } from '../../../utils/helpers'
import { Routes } from '../../routes'
import { StyledP } from '../../templates/PublicTemplate/styled'
import { CenteredP, LoginStyledForm, StyledButton } from '../shared/styled'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(FormErrors.NOT_EMAIL)
    .required(FormErrors.EMAIL_REQUIRED),
  password: yup
    .string()
    .min(6, FormErrors.PASSWORD_LENGTH)
    .required(FormErrors.PASSWORD_REQUIRED),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], FormErrors.PASSWORDS_MISMATCH)
    .required(FormErrors.PASSWORD_REQUIRED)
})

const initialValues = { email: '', password: '', passwordConfirm: '' }

const RegisterForm = ({ mutate, history }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values =>
      handleRegister({
        values,
        cb: mutate,
        history,
        message: Notifications.REGISTER_SUCCESS
      })
    }
    render={({ errors, touched }) => (
      <>
        <StyledP>Nový účet</StyledP>
        <LoginStyledForm>
          <FormInput name="email" placeholder="Email" errors={errors} touched={touched} />
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
            Zaregistrovat se
          </StyledButton>
          <CenteredP>
            Máte-li již schválený účet, <Link to={Routes.LOGIN.path}>přihlaste se.</Link>
          </CenteredP>
        </LoginStyledForm>
      </>
    )}
  />
)

export default compose(
  withRouter,
  graphql(REGISTER)
)(RegisterForm)
