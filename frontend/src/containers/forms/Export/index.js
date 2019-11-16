import { Formik } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import XLSX from 'xlsx'
import * as yup from 'yup'
import FormButtons from '../../../components/FormButtons'
import FormDateRangeInput from '../../../components/FormDateRangeInput'
import FormMultipleSelect from '../../../components/FormMultipleSelect'
import Modal from '../../../components/Modal'
import { FormErrors, ModalText } from '../../../constants'
import { ModalContext } from '../../../context'
import { EXPORT_FORM_QUERY, EXPORT_QUERY } from '../../../graphql'
import { handleErrors, mapStatusToText } from '../../../utils/helpers'
import { notificationError } from '../../../utils/notifications'
import { StyledForm, StyledH2 } from '../shared/styled'

const validationSchema = yup.object().shape({
  dateRange: yup.array().required(FormErrors.DATE_REQUIRED)
})

const exportInitialValues = {
  passengers: [],
  author: [],
  approver: [],
  driver: [],
  car: [],
  reasons: [],
  destinations: [],
  status: [],
  dateRange: ''
}

const Export = ({ client, history, data: { cars, users, reasons, destinations, authsExport } }) => {
  const [isOpened, toggleModal] = useContext(ModalContext)
  return (
    <Formik
      initialValues={exportInitialValues}
      validationSchema={validationSchema}
      onSubmit={() => toggleModal(!isOpened)}
      render={({ values, errors, touched, setFieldValue, setFieldTouched }) => (
        <StyledForm>
          <StyledH2>Export</StyledH2>
          <FormDateRangeInput
            name="dateRange"
            label="Datum"
            errors={errors}
            touched={touched}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
            required
          />
          <FormMultipleSelect
            name="passengers"
            label="Cestující"
            errors={errors}
            touched={touched}
            options={users}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
          />
          <FormMultipleSelect
            name="author"
            label="Žadatel"
            errors={errors}
            touched={touched}
            options={authsExport}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
          />
          <FormMultipleSelect
            name="approver"
            label="Schvalující"
            errors={errors}
            touched={touched}
            options={users}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
          />
          <FormMultipleSelect
            name="driver"
            label="Řidič"
            errors={errors}
            touched={touched}
            options={users}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
          />
          <FormMultipleSelect
            name="car"
            label="Vozidlo"
            errors={errors}
            touched={touched}
            options={cars}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
          />
          <FormMultipleSelect
            name="reasons"
            label="Účel jízdy"
            errors={errors}
            touched={touched}
            options={reasons}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
          />
          <FormMultipleSelect
            name="destinations"
            label="Cíl jízdy"
            errors={errors}
            touched={touched}
            options={destinations}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
          />
          <FormMultipleSelect
            name="status"
            label="Stav"
            errors={errors}
            touched={touched}
            options={[
              { _id: 'unapproved', name: 'neschválena' },
              { _id: 'approved', name: 'schválena' },
              { _id: 'done', name: 'provedena' }
            ]}
            onSetFieldValue={setFieldValue}
            onSetFieldTouched={setFieldTouched}
          />
          <FormButtons confirmText="Exportovat" history={history} />
          <Modal
            message={ModalText.EXPORT_MESSAGE}
            title={ModalText.EXPORT_TITLE}
            toggleModal={toggleModal}
            isOpened={isOpened}
            action={async () => {
              const startDate = moment(values.dateRange[0]).startOf('day')
              const endDate = moment(values.dateRange[1]).endOf('day')
              const result = await client.query({
                query: EXPORT_QUERY,
                variables: { ...values, dateRange: [startDate, endDate] }
              })
              if (result.data.requisitionsExport.length) {
                const dataForExport = result.data.requisitionsExport.map(req => {
                  return {
                    Číslo: req.number,
                    Cestující: req.passengers
                      .map(passenger => `${passenger.lastName} ${passenger.firstName}`)
                      .join(','),
                    Schvalující: `${req.approver.lastName} ${req.approver.firstName}`,
                    Žadatel: req.author.name,
                    Řidič: `${req.driver.lastName} ${req.driver.firstName}`,
                    Vozidlo: req.car.name,
                    'Účel jízdy': req.reasons.map(reason => reason.name).join(','),
                    'Cíl jízdy': req.destinations.map(destination => destination.name).join(','),
                    'Začátek jízdy': moment(req.startDate).format('DD.MM.YYYY HH:mm'),
                    'Konec jízdy': moment(req.endDate).format('DD.MM.YYYY HH:mm'),
                    Stav: mapStatusToText(req.status),
                    Poznámka: req.note
                  }
                })
                const ws = XLSX.utils.json_to_sheet(dataForExport)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, ws, 'zadanky')
                XLSX.writeFile(wb, 'zadanky_export.xlsx')
              } else {
                notificationError('Pro zadané parametry nebyly nalezeny žádné žádanky')
              }
            }}
          />
        </StyledForm>
      )}
    />
  )
}

export default compose(
  withRouter,
  withApollo,
  graphql(EXPORT_FORM_QUERY, {
    options: ({ history }) => ({
      onError: error => {
        handleErrors(error, history)
      }
    })
  })
)(Export)
