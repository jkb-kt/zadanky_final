import { Formik } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Modal from '../../../components/Modal'
import RequisitionFormFields from '../../../components/RequisitionFormFields'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import {
  CREATE_REQUISITION,
  REQUISITION_FORM_QUERY,
  REQUISITION_TABLE_QUERY
} from '../../../graphql/requisitions'
import { TEMPLATE_SELECT_QUERY } from '../../../graphql/templates'
import { handleErrors, handleSubmit } from '../../../utils/helpers'
import { initialValues, requisitionValidation } from '../shared'
import { StyledH2 } from '../shared/styled'

const RequisitionForm = ({
  data: { templates, users, cars, reasons, destinations },
  client,
  mutate,
  history,
  location
}) => {
  const [isOpened, toggleModal] = useContext(ModalContext)
  const requisitionInitialValues = {
    ...initialValues,
    startDate: location.state ? moment(location.state.start) : moment(),
    endDate: location.state ? moment(location.state.end) : moment().add(1, 'hour'),
    note: null
  }

  const handleTemplateSelect = async (_id, setValues) => {
    const result = await client.query({
      query: TEMPLATE_SELECT_QUERY,
      variables: { _id }
    })
    setValues({
      ...result.data.template,
      template: _id,
      startDate: requisitionInitialValues.startDate,
      endDate: requisitionInitialValues.endDate
    })
  }

  return (
    <Formik
      initialValues={requisitionInitialValues}
      validationSchema={requisitionValidation}
      onSubmit={() => toggleModal(!isOpened)}
      render={({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        setValues,
        resetForm
      }) => (
        <>
          <StyledH2>Vytvořte novou žádanku</StyledH2>
          <RequisitionFormFields
            errors={errors}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            touched={touched}
            setValues={setValues}
            handleSelect={handleTemplateSelect}
            history={history}
            templates={templates}
            users={users}
            cars={cars}
            reasons={reasons}
            destinations={destinations}
            required
            requisition
          />
          <Modal
            message={ModalText.REQUISITION_CREATE_MESSAGE}
            title={ModalText.REQUISITION_CREATE_TITLE}
            toggleModal={toggleModal}
            isOpened={isOpened}
            action={() =>
              handleSubmit({
                values: {
                  ...values,
                  endDate: moment(values.endDate).subtract(1, 'minute')
                },
                cb: mutate,
                resetForm,
                initialValues: requisitionInitialValues,
                message: Notifications.REQUISITION_CREATED,
                history,
                refetchQuery: REQUISITION_TABLE_QUERY
              })
            }
          />
        </>
      )}
    />
  )
}

export default compose(
  withRouter,
  withApollo,
  graphql(REQUISITION_FORM_QUERY, {
    options: ({ history }) => ({
      onError: error => {
        handleErrors(error, history)
      }
    })
  }),
  graphql(CREATE_REQUISITION)
)(RequisitionForm)
