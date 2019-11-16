import { Formik } from 'formik'
import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import FormInput from '../../../components/FormInput'
import conf from '../../../conf'
import { IS_ME_QUERY, LOGIN } from '../../../graphql/auths'
import { handleLogin } from '../../../utils/helpers'
import { Routes } from '../../routes'
import { StyledP } from '../../templates/PublicTemplate/styled'
import { CenteredP, LoginStyledForm, StyledButton } from '../shared/styled'

const initialValues = { email: '', password: '' }

const LoginForm = ({ mutate }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={values =>
      handleLogin({
        values,
        cb: mutate,
        refetchQuery: IS_ME_QUERY
      })
    }
    render={({ errors, touched }) => (
      <>
        <StyledP>
          Vítejte na webovém informačním systému společnosti{' '}
          <a href={conf.COMPANY_URI} target="__blank">
            {conf.COMPANY}
          </a>{' '}
          sloužícímu žádankám o přepravu
        </StyledP>
        <LoginStyledForm>
          <FormInput name="email" placeholder="Email" errors={errors} touched={touched} />
          <FormInput
            name="password"
            type="password"
            placeholder="Heslo"
            errors={errors}
            touched={touched}
          />
          <StyledButton htmlType="submit" type="primary">
            Přihlásit se
          </StyledButton>
          <CenteredP>
            Nemáte-li ještě účet, <Link to={Routes.REGISTER.path}>zaregistrujte se.</Link>
          </CenteredP>
          <CenteredP>
            Pokud jste zapomněli své heslo, obnovit si jej můžete{' '}
            <Link to={Routes.PASSWORD_RESET.path}>zde.</Link>
          </CenteredP>
        </LoginStyledForm>
      </>
    )}
  />
)

export default graphql(LOGIN)(LoginForm)
