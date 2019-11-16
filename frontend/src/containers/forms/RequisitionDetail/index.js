import { Row } from 'antd'
import { Formik } from 'formik'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import CenteredSpin from '../../../components/CenteredSpin'
import { CenteredButton } from '../../../components/FormButtons/styled'
import Modal from '../../../components/Modal'
import RequisitionFormFields from '../../../components/RequisitionFormFields'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { IS_ME_QUERY } from '../../../graphql/auths'
import {
  DELETE_REQUISITION,
  REQUISITION_DETAIL_QUERY,
  REQUISITION_DETAIL_REFETCH,
  UPDATE_REQUISITION
} from '../../../graphql/requisitions'
import { handleDelete, handleErrors, handleUpdate, mapStatusToText } from '../../../utils/helpers'
import { requisitionValidation } from '../shared'
import { StyledH2 } from '../shared/styled'
import { BoldText, StatusInfo, TextDiv, TextInfo } from './styled'

const RequisitionDetail = ({
  data: { requisition, users, cars, reasons, destinations },
  loading,
  client,
  mutate,
  history,
  match
}) => {
  const [isOpened, toggleModal] = useContext(ModalContext)
  const [isDeleteModalOpened, toggleDeleteModal] = useState(false)

  if (loading || !requisition) {
    return <CenteredSpin />
  }

  const { isMe } = client.readQuery({ query: IS_ME_QUERY })
  const isUserDriverOnly = isMe.roles.length === 1 && isMe.roles[0] === 'driver'

  const [car] = cars.filter(car => car._id === requisition.car)

  return (
    <>
      <StyledH2>
        {requisition.number
          ? `Detail žádanky č. ${requisition.number} pro vozidlo ${car.name}`
          : `Detail žádanky pro vozidlo ${car.name}`}
      </StyledH2>
      <Formik
        initialValues={{
          approver: requisition.approver,
          driver: requisition.driver,
          car: requisition.car,
          note: requisition.note,
          reasons: requisition.reasons,
          startDate: moment(requisition.startDate),
          endDate: moment(requisition.endDate).add(1, 'minute'),
          destinations: requisition.destinations,
          passengers: requisition.passengers,
          status: requisition.status
        }}
        validationSchema={requisitionValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, submitForm, setFieldValue, setFieldTouched }) => (
          <>
            <StatusInfo>{mapStatusToText(requisition.status)}</StatusInfo>
            {requisition.status !== 'done' && (
              <Row type="flex" justify="center">
                {requisition.status === 'unapproved' && isMe.roles.includes('approver') && (
                  <CenteredButton
                    type="primary"
                    onClick={async () => {
                      await setFieldValue('status', 'approved')
                      submitForm()
                    }}
                  >
                    Schválit žádanku
                  </CenteredButton>
                )}
                {requisition.status === 'approved' && isMe.roles.includes('driver') && (
                  <CenteredButton
                    type="primary"
                    onClick={async () => {
                      await setFieldValue('status', 'done')
                      submitForm()
                    }}
                  >
                    Žádanka proběhla
                  </CenteredButton>
                )}
                {(isMe.email === requisition.author.email ||
                  isMe.roles.includes('approver') ||
                  (isMe.roles.includes('driver') && requisition.status === 'approved')) && (
                  <CenteredButton
                    type="danger"
                    onClick={() => {
                      toggleDeleteModal(!isDeleteModalOpened)
                    }}
                  >
                    Zrušit žádanku
                  </CenteredButton>
                )}
              </Row>
            )}
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
              required
              requisitionDetail
              isUserDriverOnly={isUserDriverOnly}
              isReqDone={requisition.status === 'done'}
              requisitionStatus={requisition.status}
            />
            <TextDiv>
              <TextInfo>
                Vytvořil: <BoldText>{requisition.author.name}</BoldText> dne {''}
                {moment(requisition.createdAt).format('DD.MM.YYYY HH:mm')}
              </TextInfo>
              <TextInfo>
                {requisition.updatedBy && (
                  <>
                    Naposledy změnil: <BoldText>{requisition.updatedBy.name}</BoldText> dne {''}
                    {moment(requisition.updatedAt).format('DD.MM.YYYY HH:mm')}
                  </>
                )}
              </TextInfo>
            </TextDiv>
            <Modal
              message={ModalText.REQUISITION_UPDATE_MESSAGE}
              title={ModalText.REQUISITION_UPDATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleUpdate({
                  values: {
                    _id: match.params.id,
                    ...values,
                    endDate: moment(values.endDate).subtract(1, 'minute')
                  },
                  cb: mutate,
                  message: Notifications.REQUISITION_UPDATED,
                  history,
                  refetchQuery: REQUISITION_DETAIL_REFETCH
                })
              }
            />
            <Modal
              message={ModalText.REQUISITION_DELETE_MESSAGE}
              title={ModalText.REQUISITION_DELETE_TITLE}
              toggleModal={toggleDeleteModal}
              isOpened={isDeleteModalOpened}
              action={() =>
                handleDelete({
                  cb: () =>
                    client.mutate({
                      mutation: DELETE_REQUISITION,
                      variables: { _id: requisition._id }
                    }),
                  history,
                  message: Notifications.REQUISITION_DELETED
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
  withApollo,
  graphql(REQUISITION_DETAIL_QUERY, {
    options: props => ({
      variables: { _id: props.match.params.id },
      onError: error => {
        handleErrors(error, props.history)
      }
    })
  }),
  graphql(UPDATE_REQUISITION)
)(RequisitionDetail)
