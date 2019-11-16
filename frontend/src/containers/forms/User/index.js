import { Formik } from 'formik'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import FormArrayCheckboxes from '../../../components/FormArrayCheckboxes'
import FormButtons from '../../../components/FormButtons'
import FormInput from '../../../components/FormInput'
import Modal from '../../../components/Modal'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { CREATE_USER, USERS_QUERY } from '../../../graphql/users'
import { handleErrors, handleSubmit } from '../../../utils/helpers'
import { userRoles, userValidation } from '../shared'
import { StyledForm, StyledH2 } from '../shared/styled'

const initialValues = { firstName: '', lastName: '', roles: [] }

const UserForm = ({ mutate, history }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  return (
    <>
      <StyledH2>Vytvořte nového uživatele</StyledH2>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, resetForm, errors, touched }) => (
          <>
            <StyledForm>
              <FormInput
                name="firstName"
                label="Jméno"
                errors={errors}
                touched={touched}
                required
              />
              <FormInput
                name="lastName"
                label="Příjmení"
                errors={errors}
                touched={touched}
                required
              />
              <FormArrayCheckboxes
                name="roles"
                label="Role"
                values={values.roles}
                errors={errors}
                touched={touched}
                options={userRoles}
                required
              />
              <FormButtons history={history} />
            </StyledForm>
            <Modal
              message={ModalText.USER_CREATE_MESSAGE}
              title={ModalText.USER_CREATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleSubmit({
                  values,
                  cb: mutate,
                  resetForm,
                  initialValues,
                  message: Notifications.USER_CREATED,
                  history,
                  refetchQuery: USERS_QUERY
                })
              }
            />
          </>
        )}
      />
    </>
  )
}

export default compose(
  withRouter,
  graphql(CREATE_USER, {
    options: ({ history }) => ({
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(UserForm)
