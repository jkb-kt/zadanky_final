import { Formik } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import CenteredSpin from '../../../components/CenteredSpin'
import Modal from '../../../components/Modal'
import RequisitionFormFields from '../../../components/RequisitionFormFields'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import {
  TEMPLATE_DETAIL_QUERY,
  TEMPLATE_DETAIL_REFETCH,
  UPDATE_TEMPLATE
} from '../../../graphql/templates'
import { handleErrors, handleUpdate } from '../../../utils/helpers'
import { templateValidation } from '../shared'
import { StyledH2 } from '../shared/styled'
import { BoldText, TextDiv, TextInfo } from './styled'

const TemplateDetail = ({
  data: { template, users, cars, reasons, destinations },
  loading,
  mutate,
  history,
  match
}) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  if (loading || !template) {
    return <CenteredSpin />
  }

  return (
    <>
      <StyledH2>{`Detail vzoru ${template.name}`}</StyledH2>
      <Formik
        initialValues={{
          name: template.name,
          approver: template.approver,
          driver: template.driver,
          car: template.car,
          note: template.note,
          reasons: template.reasons,
          destinations: template.destinations,
          passengers: template.passengers
        }}
        validationSchema={templateValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <>
            <RequisitionFormFields
              errors={errors}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              touched={touched}
              users={users}
              cars={cars}
              reasons={reasons}
              destinations={destinations}
              history={history}
            />
            <TextDiv>
              <TextInfo>
                Vytvořil: <BoldText>{template.author.name}</BoldText> dne {''}
                {moment(template.createdAt).format('DD.MM.YYYY HH:mm')}
              </TextInfo>
              <TextInfo>
                {template.updatedBy && (
                  <>
                    Naposledy změnil: <BoldText>{template.updatedBy.name}</BoldText> dne {''}
                    {moment(template.updatedAt).format('DD.MM.YYYY HH:mm')}
                  </>
                )}
              </TextInfo>
            </TextDiv>
            <Modal
              message={ModalText.TEMPLATE_UPDATE_MESSAGE}
              title={ModalText.TEMPLATE_UPDATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleUpdate({
                  values: {
                    _id: match.params.id,
                    ...values
                  },
                  cb: mutate,
                  message: Notifications.TEMPLATE_UPDATED,
                  history,
                  refetchQuery: TEMPLATE_DETAIL_REFETCH
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
  graphql(TEMPLATE_DETAIL_QUERY, {
    options: props => ({
      variables: { _id: props.match.params.id },
      onError: error => {
        handleErrors(error, props.history)
      }
    })
  }),
  graphql(UPDATE_TEMPLATE)
)(TemplateDetail)
