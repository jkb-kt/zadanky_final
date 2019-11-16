import * as yup from 'yup'
import { FormErrors } from '../../../constants'

export const initialValues = {
  approver: null,
  driver: null,
  passengers: [],
  car: null,
  reasons: [],
  destinations: []
}

export const requisitionValidation = yup.object().shape({
  approver: yup
    .string()
    .nullable()
    .required(FormErrors.APPROVER_REQUIRED),
  driver: yup
    .string()
    .nullable()
    .required(FormErrors.DRIVER_REQUIRED)
    .test('driver', FormErrors.DRIVER_ERROR, function(value) {
      const { passengers } = this.parent
      return value ? !passengers.includes(value) : true
    }),
  passengers: yup
    .array()
    .of(yup.string())
    .required(FormErrors.PASSENGER_REQUIRED),
  startDate: yup.date().required(FormErrors.START_DATE_REQUIRED),
  endDate: yup
    .date()
    .nullable()
    .required(FormErrors.END_DATE_REQUIRED)
    .test('endDate', FormErrors.END_DATE_SMALL, function(value) {
      const { startDate } = this.parent
      return value > startDate
    }),
  reasons: yup
    .array()
    .of(yup.string())
    .required(FormErrors.REASON_REQUIRED),
  destinations: yup
    .array()
    .of(yup.string())
    .required(FormErrors.DESTINATION_REQUIRED),
  car: yup
    .string()
    .nullable()
    .required(FormErrors.CAR_REQUIRED),
  note: yup
    .string()
    .nullable()
    .max(250, FormErrors.NOTE_LENGTH)
})

export const templateValidation = yup.object().shape({
  name: yup
    .string()
    .nullable()
    .max(30, FormErrors.TEMPLATE_NAME_LENGTH)
    .required(FormErrors.TEMPLATE_NAME_REQUIRED),
  approver: yup.string().nullable(),
  driver: yup
    .string()
    .nullable()
    .test('driver', FormErrors.DRIVER_ERROR, function(value) {
      const { passengers } = this.parent
      return value ? !passengers.includes(value) : true
    }),
  passengers: yup.array().of(yup.string())
})

export const userValidation = yup.object().shape({
  firstName: yup
    .string()
    .max(15, FormErrors.FIRST_NAME_LENGTH)
    .required(FormErrors.FIRST_NAME_REQUIRED),
  lastName: yup
    .string()
    .max(15, FormErrors.LAST_NAME_LENGTH)
    .required(FormErrors.LAST_NAME_REQUIRED),
  roles: yup.array().required(FormErrors.ROLE_REQUIRED)
})

export const userRoles = [
  { label: 'Schvalující', value: 'approver' },
  { label: 'Řidič', value: 'driver' },
  { label: 'Cestující', value: 'passengers' }
]

export const carValidation = yup.object().shape({
  name: yup
    .string()
    .max(25, FormErrors.CAR_NAME_LENGTH)
    .required(FormErrors.CAR_NAME_REQUIRED),
  spz: yup
    .string()
    .min(7, FormErrors.SPZ_LENGTH)
    .max(8, FormErrors.SPZ_LENGTH)
    .required(FormErrors.SPZ_REQUIRED),
  color: yup.string().required(FormErrors.COLOR_REQUIRED)
})

export const destinationValidation = yup.object().shape({
  name: yup
    .string()
    .max(25, FormErrors.DESTINATION_LENGTH)
    .required(FormErrors.DESTINATION_REQUIRED)
})

export const reasonValidation = yup.object().shape({
  name: yup
    .string()
    .max(25, FormErrors.REASON_LENGTH)
    .required(FormErrors.REASON_REQUIRED)
})
