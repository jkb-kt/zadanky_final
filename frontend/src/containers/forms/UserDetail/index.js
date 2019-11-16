import { Formik } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import CenteredSpin from '../../../components/CenteredSpin'
import FormArrayCheckboxes from '../../../components/FormArrayCheckboxes'
import FormButtons from '../../../components/FormButtons'
import FormInput from '../../../components/FormInput'
import FormSwitch from '../../../components/FormSwitch'
import Modal from '../../../components/Modal'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { UPDATE_USER, USER_DETAIL_QUERY, USER_DETAIL_REFETCH } from '../../../graphql/users'
import { handleErrors, handleUpdate } from '../../../utils/helpers'
import { userRoles, userValidation } from '../shared'
import { StyledForm, StyledH2 } from '../shared/styled'
import { BoldText, TextDiv, TextInfo } from './styled'

const UserDetail = ({ data: { user }, loading, mutate, history, match }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  if (loading || !user) {
    return <CenteredSpin />
  }

  return (
    <>
      <StyledH2>{`Detail uživatele ${user.lastName} ${user.firstName}`}</StyledH2>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
          active: user.active
        }}
        validationSchema={userValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, setFieldValue }) => (
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
              <FormSwitch
                name="active"
                label="Aktivní"
                checked={values.active}
                errors={errors}
                touched={touched}
                onSetFieldValue={setFieldValue}
              />
              <FormButtons history={history} />
            </StyledForm>
            <TextDiv>
              <TextInfo>
                Vytvořil: <BoldText>{user.author.name}</BoldText> dne {''}
                {moment(user.createdAt).format('DD.MM.YYYY HH:mm')}
              </TextInfo>
              <TextInfo>
                {user.updatedBy && (
                  <>
                    Naposledy změnil: <BoldText>{user.updatedBy.name}</BoldText> dne {''}
                    {moment(user.updatedAt).format('DD.MM.YYYY HH:mm')}
                  </>
                )}
              </TextInfo>
            </TextDiv>
            <Modal
              message={ModalText.USER_UPDATE_MESSAGE}
              title={ModalText.USER_UPDATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleUpdate({
                  values: {
                    _id: match.params.id,
                    ...values
                  },
                  cb: mutate,
                  message: Notifications.USER_UPDATED,
                  history,
                  refetchQuery: USER_DETAIL_REFETCH
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
  graphql(USER_DETAIL_QUERY, {
    options: props => ({
      variables: { _id: props.match.params.id },
      onError: error => {
        handleErrors(error, props.history)
      }
    })
  }),
  graphql(UPDATE_USER)
)(UserDetail)
