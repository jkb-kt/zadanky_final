/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Validates user inputs
*/

import Joi from 'joi'

export const reasonSchema = {
  name: Joi.string()
    .max(25)
    .required()
}

export const destinationSchema = {
  name: Joi.string()
    .max(25)
    .required()
}

export const registerSchema = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
}

export const newPasswordSchema = {
  password: Joi.string()
    .min(6)
    .required()
}

export const authSchema = {
  roles: Joi.array().required(),
  name: Joi.string()
    .max(15)
    .required()
}

export const userSchema = {
  firstName: Joi.string()
    .max(15)
    .required(),
  lastName: Joi.string()
    .max(15)
    .required(),
  roles: Joi.array().required()
}

export const templateSchema = {
  name: Joi.string()
    .max(30)
    .required(),
  note: Joi.string().max(250)
}

export const carSchema = {
  name: Joi.string()
    .max(25)
    .required(),
  spz: Joi.string()
    .min(7)
    .max(8)
    .required(),
  color: Joi.string().required()
}

export const requisitionExportSchema = {
  dateRange: Joi.array().required()
}
