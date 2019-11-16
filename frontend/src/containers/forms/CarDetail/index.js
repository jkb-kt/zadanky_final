import { Formik } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import CenteredSpin from '../../../components/CenteredSpin'
import ColorPicker from '../../../components/ColorPicker'
import FormButtons from '../../../components/FormButtons'
import FormInput from '../../../components/FormInput'
import FormSwitch from '../../../components/FormSwitch'
import Modal from '../../../components/Modal'
import { ModalText, Notifications } from '../../../constants'
import { ModalContext } from '../../../context'
import { CAR_DETAIL_QUERY, CAR_DETAIL_REFETCH, UPDATE_CAR } from '../../../graphql/cars'
import { handleErrors, handleUpdate } from '../../../utils/helpers'
import { carValidation } from '../shared'
import { StyledForm, StyledH2 } from '../shared/styled'
import { BoldText, TextDiv, TextInfo } from './styled'

const CarDetail = ({ data: { car }, loading, mutate, history, match }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)

  if (loading || !car) {
    return <CenteredSpin />
  }

  return (
    <>
      <StyledH2>{`Detail vozidla ${car.name}`}</StyledH2>
      <Formik
        initialValues={{
          name: car.name,
          spz: car.spz,
          color: car.color,
          active: car.active
        }}
        validationSchema={carValidation}
        onSubmit={() => toggleModal(!isOpened)}
        render={({ values, errors, touched, setFieldValue }) => (
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
              <FormSwitch
                name="active"
                label="Aktivní"
                checked={values.active}
                errors={errors}
                touched={touched}
                onSetFieldValue={setFieldValue}
              />
              <ColorPicker
                name="color"
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <FormButtons history={history} />
            </StyledForm>
            <TextDiv>
              <TextInfo>
                Vytvořil: <BoldText>{car.author.name}</BoldText> dne {''}
                {moment(car.createdAt).format('DD.MM.YYYY HH:mm')}
              </TextInfo>
              <TextInfo>
                {car.updatedBy && (
                  <>
                    Naposledy změnil: <BoldText>{car.updatedBy.name}</BoldText> dne {''}
                    {moment(car.updatedAt).format('DD.MM.YYYY HH:mm')}
                  </>
                )}
              </TextInfo>
            </TextDiv>
            <Modal
              message={ModalText.CAR_UPDATE_MESSAGE}
              title={ModalText.CAR_UPDATE_TITLE}
              toggleModal={toggleModal}
              isOpened={isOpened}
              action={() =>
                handleUpdate({
                  values: {
                    _id: match.params.id,
                    ...values
                  },
                  cb: mutate,
                  message: Notifications.CAR_UPDATED,
                  history,
                  refetchQuery: CAR_DETAIL_REFETCH
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
  graphql(CAR_DETAIL_QUERY, {
    options: props => ({
      variables: { _id: props.match.params.id },
      onError: error => {
        handleErrors(error, props.history)
      }
    })
  }),
  graphql(UPDATE_CAR)
)(CarDetail)
