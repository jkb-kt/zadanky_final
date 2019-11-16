import { Formik } from 'formik'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import ColorPicker from '../../../components/ColorPicker'
import FormButtons from '../../../components/FormButtons'
import FormInput from '../../../components/FormInput'
import Modal from '../../../components/Modal'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { CARS_QUERY, CREATE_CAR } from '../../../graphql/cars'
import { handleErrors, handleSubmit } from '../../../utils/helpers'
import { carValidation } from '../shared'
import { StyledForm, StyledH2 } from '../shared/styled'

const initialValues = { name: '', spz: '', color: '' }

const CarForm = ({ mutate, history }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  return (
    <>
      <StyledH2>Vytvořte nové vozidlo</StyledH2>
      <Formik
        initialValues={initialValues}
        validationSchema={carValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, setFieldValue, resetForm }) => (
          <>
            <StyledForm>
              <FormInput
                name="name"
                label="Název vozidla"
                errors={errors}
                touched={touched}
                required
              />
              <FormInput name="spz" label="SPZ" errors={errors} touched={touched} required />
              <ColorPicker
                name="color"
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <FormButtons history={history} />
            </StyledForm>
            <Modal
              message={ModalText.CAR_CREATE_MESSAGE}
              title={ModalText.CAR_CREATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleSubmit({
                  values,
                  cb: mutate,
                  resetForm,
                  initialValues,
                  message: Notifications.CAR_CREATED,
                  history,
                  refetchQuery: CARS_QUERY
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
  graphql(CREATE_CAR, {
    options: ({ history }) => ({
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(CarForm)
