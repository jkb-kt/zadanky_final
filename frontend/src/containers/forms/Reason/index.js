import { Formik } from 'formik'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import FormButtons from '../../../components/FormButtons'
import FormInput from '../../../components/FormInput'
import Modal from '../../../components/Modal'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { CREATE_REASON, REASONS_QUERY } from '../../../graphql/reasons'
import { handleErrors, handleSubmit } from '../../../utils/helpers'
import { reasonValidation } from '../shared'
import { StyledForm, StyledH2 } from '../shared/styled'

const initialValues = { name: '' }

const ReasonForm = ({ mutate, history }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  return (
    <>
      <StyledH2>Vytvořte nový účel jízdy</StyledH2>
      <Formik
        initialValues={initialValues}
        validationSchema={reasonValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, resetForm }) => (
          <>
            <StyledForm>
              <FormInput
                name="name"
                label="Účel jízdy"
                errors={errors}
                touched={touched}
                required
              />
              <FormButtons history={history} />
            </StyledForm>
            <Modal
              message={ModalText.REASON_CREATE_MESSAGE}
              title={ModalText.REASON_CREATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleSubmit({
                  values,
                  cb: mutate,
                  resetForm,
                  initialValues,
                  message: Notifications.REASON_CREATED,
                  history,
                  refetchQuery: REASONS_QUERY
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
  graphql(CREATE_REASON, {
    options: ({ history }) => ({
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(ReasonForm)
