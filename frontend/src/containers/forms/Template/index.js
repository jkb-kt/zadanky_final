import { Formik } from 'formik'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Modal from '../../../components/Modal'
import RequisitionFormFields from '../../../components/RequisitionFormFields'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import {
  CREATE_TEMPLATE,
  TEMPLATES_FORM_QUERY,
  TEMPLATES_REFETCH_QUERY
} from '../../../graphql/templates'
import { handleErrors, handleSubmit } from '../../../utils/helpers'
import { initialValues, templateValidation } from '../shared'
import { StyledH2 } from '../shared/styled'

const templateInitialValues = {
  ...initialValues,
  name: null,
  note: null
}

const TemplateForm = ({ data: { users, cars, reasons, destinations }, mutate, history }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  return (
    <>
      <StyledH2>Vytvořte nový vzor žádanky</StyledH2>
      <Formik
        initialValues={templateInitialValues}
        validationSchema={templateValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, setFieldValue, setFieldTouched, resetForm }) => (
          <>
            <RequisitionFormFields
              errors={errors}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              history={history}
              touched={touched}
              users={users}
              cars={cars}
              reasons={reasons}
              destinations={destinations}
            />
            <Modal
              message={ModalText.TEMPLATE_CREATE_MESSAGE}
              title={ModalText.TEMPLATE_CREATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleSubmit({
                  values,
                  cb: mutate,
                  resetForm,
                  initialValues,
                  message: Notifications.TEMPLATE_CREATED,
                  history,
                  refetchQuery: TEMPLATES_REFETCH_QUERY
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
  graphql(TEMPLATES_FORM_QUERY, {
    options: ({ history }) => ({
      onError: error => {
        handleErrors(error, history)
      }
    })
  }),
  graphql(CREATE_TEMPLATE)
)(TemplateForm)
