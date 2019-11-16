import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import CenteredSpin from '../../../components/CenteredSpin'
import FormInput from '../../../components/FormInput'
import Modal from '../../../components/Modal'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { DESTINATIONS_QUERY, UPDATE_DESTINATION } from '../../../graphql/destinations'
import { handleErrors, handleUpdate } from '../../../utils/helpers'
import { destinationValidation } from '../../forms/shared'
import { ItemGroup, MarginedButton, StyledForm, StyledH2 } from '../../forms/shared/styled'

const DestinationsList = ({ data: { destinations }, loading, mutate, history }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)
  const [currentValues, setCurrentValues] = useState({})

  if (loading || !destinations) {
    return <CenteredSpin />
  }

  return (
    <>
      <StyledH2>Seznam destinací</StyledH2>
      {destinations.map(destination => (
        <Formik
          key={destination._id}
          initialValues={{
            name: destination.name
          }}
          validationSchema={destinationValidation}
          onSubmit={values => {
            setCurrentValues({ _id: destination._id, ...values })
            toggleModal(!isOpened)
          }}
          render={({ errors, touched }) => (
            <StyledForm>
              <ItemGroup>
                <FormInput
                  name="name"
                  label="Destinace"
                  errors={errors}
                  touched={touched}
                  smaller
                  required
                />
                <MarginedButton type="primary" htmlType="submit">
                  Uložit
                </MarginedButton>
              </ItemGroup>
            </StyledForm>
          )}
        />
      ))}
      <Modal
        message={ModalText.DESTINATION_UPDATE_MESSAGE}
        title={ModalText.DESTINATION_UPDATE_TITLE}
        toggleModal={toggleModal}
        isOpened={isOpened}
        action={() =>
          handleUpdate({
            values: currentValues,
            cb: mutate,
            message: Notifications.DESTINATION_UPDATED,
            history
          })
        }
      />
    </>
  )
}

export default compose(
  withRouter,
  graphql(DESTINATIONS_QUERY, {
    options: props => ({
      onError: error => {
        handleErrors(error, props.history)
      }
    })
  }),
  graphql(UPDATE_DESTINATION)
)(DestinationsList)
