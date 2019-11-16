import { Row } from 'antd'
import React from 'react'
import { StyledForm } from '../../containers/forms/shared/styled'
import FormButtons from '../FormButtons'
import FormDateInput from '../FormDateInput'
import FormInput from '../FormInput'
import FormMultipleSelect from '../FormMultipleSelect'
import FormSelect from '../FormSelect'
import FormTextArea from '../FormTextArea'

export default ({
  errors,
  touched,
  templates,
  users,
  cars,
  reasons,
  destinations,
  setFieldValue,
  handleSelect,
  setFieldTouched,
  setValues,
  requisition,
  requisitionDetail,
  isUserDriverOnly,
  isReqDone,
  history,
  required
}) => (
  <StyledForm>
    {!requisition && !requisitionDetail && (
      <FormInput name="name" label="Název vzoru" errors={errors} touched={touched} required />
    )}
    {requisition && (
      <FormSelect
        name="template"
        label="Vzor"
        errors={errors}
        touched={touched}
        options={templates}
        onSetFieldValue={setFieldValue}
        onSelect={handleSelect}
        onSetFieldTouched={setFieldTouched}
        onSetValues={setValues}
      />
    )}
    {(requisition || requisitionDetail) && (
      <Row type="flex" justify="center">
        <FormDateInput
          name="startDate"
          label="Začátek jízdy"
          errors={errors}
          touched={touched}
          onSetFieldValue={setFieldValue}
          onSetFieldTouched={setFieldTouched}
          disabled={isUserDriverOnly || isReqDone}
          required={required}
        />
        <FormDateInput
          name="endDate"
          label="Konec jízdy"
          errors={errors}
          touched={touched}
          onSetFieldValue={setFieldValue}
          onSetFieldTouched={setFieldTouched}
          disabled={isUserDriverOnly || isReqDone}
          required={required}
        />
      </Row>
    )}
    <FormMultipleSelect
      name="passengers"
      label="Cestující"
      errors={errors}
      touched={touched}
      options={users}
      onSetFieldValue={setFieldValue}
      onSetFieldTouched={setFieldTouched}
      disabled={isUserDriverOnly || isReqDone}
      required={required}
    />
    <FormSelect
      name="approver"
      label="Schvalující"
      errors={errors}
      touched={touched}
      options={users}
      onSetFieldValue={setFieldValue}
      onSetFieldTouched={setFieldTouched}
      disabled={isUserDriverOnly || isReqDone}
      required={required}
    />
    <FormSelect
      name="driver"
      label="Řidič"
      errors={errors}
      touched={touched}
      options={users}
      onSetFieldValue={setFieldValue}
      onSetFieldTouched={setFieldTouched}
      disabled={isUserDriverOnly || isReqDone}
      required={required}
    />
    <FormSelect
      name="car"
      label="Vozidlo"
      errors={errors}
      touched={touched}
      options={cars}
      onSetFieldValue={setFieldValue}
      onSetFieldTouched={setFieldTouched}
      disabled={isUserDriverOnly || isReqDone}
      required={required}
    />
    <FormMultipleSelect
      name="reasons"
      label="Účel jízdy"
      errors={errors}
      touched={touched}
      options={reasons}
      onSetFieldValue={setFieldValue}
      onSetFieldTouched={setFieldTouched}
      disabled={isUserDriverOnly || isReqDone}
      required={required}
    />
    <FormMultipleSelect
      name="destinations"
      label="Cíl jízdy"
      errors={errors}
      touched={touched}
      options={destinations}
      onSetFieldValue={setFieldValue}
      onSetFieldTouched={setFieldTouched}
      disabled={isUserDriverOnly || isReqDone}
      required={required}
    />
    <FormTextArea
      name="note"
      label="Poznámka"
      rows={4}
      errors={errors}
      touched={touched}
      disabled={isReqDone}
    />
    {!isReqDone && <FormButtons history={history} />}
  </StyledForm>
)
