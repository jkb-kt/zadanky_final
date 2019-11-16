import { Formik } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'
import CenteredSpin from '../../../components/CenteredSpin'
import FormArrayCheckboxes from '../../../components/FormArrayCheckboxes'
import FormButtons from '../../../components/FormButtons'
import FormInput from '../../../components/FormInput'
import FormSwitch from '../../../components/FormSwitch'
import Modal from '../../../components/Modal'
import { FormErrors, ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { AUTH_DETAIL_QUERY, AUTH_DETAIL_REFETCH, UPDATE_AUTH } from '../../../graphql/auths'
import { handleErrors, handleUpdate } from '../../../utils/helpers'
import { StyledForm, StyledH2 } from '../shared/styled'
import { BoldText, TextDiv, TextInfo } from './styled'

const authValidation = yup.object().shape({
  roles: yup.array().required(FormErrors.ROLE_REQUIRED),
  name: yup
    .string()
    .max(15, FormErrors.FIRST_NAME_LENGTH)
    .required(FormErrors.FIRST_NAME_REQUIRED)
})

const authRoles = [
  { label: 'Schvalující', value: 'approver' },
  { label: 'Žadatel', value: 'requestant' },
  { label: 'Řidič', value: 'driver' }
]

const AuthDetail = ({ data: { auth }, loading, mutate, history, match }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  if (loading || !auth) {
    return <CenteredSpin />
  }

  return (
    <>
      <StyledH2>{`Detail účtu ${auth.email}`}</StyledH2>
      <Formik
        initialValues={{
          roles: auth.roles,
          approved: auth.approved,
          name: auth.name
        }}
        validationSchema={authValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, setFieldValue }) => (
          <>
            <StyledForm>
              <FormInput
                name="name"
                label="Jméno pro zobrazení"
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
                options={authRoles}
                required
              />
              <FormSwitch
                name="approved"
                label="Schválen"
                checked={values.approved}
                errors={errors}
                touched={touched}
                onSetFieldValue={setFieldValue}
              />
              <FormButtons history={history} />
            </StyledForm>
            <TextDiv>
              <TextInfo>
                Registrováno:{' '}
                <BoldText>{moment(auth.createdAt).format('DD.MM.YYYY HH:mm')}</BoldText>
              </TextInfo>
              <TextInfo>
                {auth.updatedBy && (
                  <>
                    Naposledy změnil: <BoldText>{auth.updatedBy.name}</BoldText> dne {''}
                    {moment(auth.updatedAt).format('DD.MM.YYYY HH:mm')}
                  </>
                )}
              </TextInfo>
            </TextDiv>
            <Modal
              message={ModalText.AUTH_UPDATE_MESSAGE}
              title={ModalText.AUTH_UPDATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleUpdate({
                  values: {
                    _id: match.params.id,
                    ...values
                  },
                  cb: mutate,
                  message: Notifications.AUTH_UPDATED,
                  history,
                  refetchQuery: AUTH_DETAIL_REFETCH
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
  graphql(AUTH_DETAIL_QUERY, {
    options: props => ({
      variables: { _id: props.match.params.id },
      onError: error => {
        handleErrors(error, props.history)
      }
    })
  }),
  graphql(UPDATE_AUTH)
)(AuthDetail)
