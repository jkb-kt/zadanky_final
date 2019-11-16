import { Formik } from 'formik'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import FormButtons from '../../../components/FormButtons'
import FormInput from '../../../components/FormInput'
import Modal from '../../../components/Modal'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { CREATE_DESTINATION, DESTINATIONS_QUERY } from '../../../graphql/destinations'
import { handleErrors, handleSubmit } from '../../../utils/helpers'
import { destinationValidation } from '../shared'
import { StyledForm, StyledH2 } from '../shared/styled'

const initialValues = { name: '' }

const DestinationForm = ({ mutate, history }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  return (
    <>
      <StyledH2>Vytvořte novou destinaci</StyledH2>
      <Formik
        initialValues={initialValues}
        validationSchema={destinationValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, resetForm }) => (
          <>
            <StyledForm>
              <FormInput
                name="name"
                label="Název destinace"
                errors={errors}
                touched={touched}
                required
              />
              <FormButtons history={history} />
            </StyledForm>
            <Modal
              message={ModalText.DESTINATION_CREATE_MESSAGE}
              title={ModalText.DESTINATION_CREATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleSubmit({
                  values,
                  cb: mutate,
                  resetForm,
                  initialValues,
                  message: Notifications.DESTINATION_CREATED,
                  history,
                  refetchQuery: DESTINATIONS_QUERY
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
  graphql(CREATE_DESTINATION, {
    options: ({ history }) => ({
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(DestinationForm)
