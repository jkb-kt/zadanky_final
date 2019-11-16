import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import CenteredSpin from '../../../components/CenteredSpin'
import FormInput from '../../../components/FormInput'
import Modal from '../../../components/Modal'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { REASONS_QUERY, UPDATE_REASON } from '../../../graphql/reasons'
import { handleErrors, handleUpdate } from '../../../utils/helpers'
import { reasonValidation } from '../../forms/shared'
import { ItemGroup, MarginedButton, StyledForm, StyledH2 } from '../../forms/shared/styled'

const ReasonsList = ({ data: { reasons }, loading, mutate, history }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)
  const [currentValues, setCurrentValues] = useState({})

  if (loading || !reasons) {
    return <CenteredSpin />
  }

  return (
    <>
      <StyledH2>Seznam účelů jízd</StyledH2>
      {reasons.map(reason => (
        <Formik
          key={reason._id}
          initialValues={{
            name: reason.name
          }}
          validationSchema={reasonValidation}
          onSubmit={values => {
            setCurrentValues({ _id: reason._id, ...values })
            toggleModal(!isOpened)
          }}
          render={({ errors, touched }) => (
            <StyledForm>
              <ItemGroup>
                <FormInput
                  name="name"
                  label="Účel jízdy"
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
        message={ModalText.REASON_UPDATE_MESSAGE}
        title={ModalText.REASON_UPDATE_TITLE}
        toggleModal={toggleModal}
        isOpened={isOpened}
        action={() =>
          handleUpdate({
            values: currentValues,
            cb: mutate,
            message: Notifications.REASON_UPDATED,
            history
          })
        }
      />
    </>
  )
}

export default compose(
  withRouter,
  graphql(REASONS_QUERY, {
    options: props => ({
      onError: error => {
        handleErrors(error, props.history)
      }
    })
  }),
  graphql(UPDATE_REASON)
)(ReasonsList)
