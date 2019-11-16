/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Handles template connected logic
*/

import mongoose from 'mongoose'
import Destination from '../../models/Destination'
import Reason from '../../models/Reason'
import Template from '../../models/Template'
import { handleValuesNotInMongo, hasRights, validateInput } from '../../utils'
import { templateSchema } from '../../validation'

export default {
  Query: {
    templates: async (parent, { limit, offset }, { req }, info) => {
      await hasRights(req, ['requestant'])
      const templates = await Template.find()
        .sort({ name: 1 })
        .skip(offset)
        .limit(limit)
        .populate(['updatedBy', 'author'])
      return templates.map(template => {
        return {
          ...template._doc,
          createdAt: template.createdAt.toISOString(),
          updatedAt: template.updatedAt.toISOString()
        }
      })
    },
    template: async (parent, { _id }, { req }, info) => {
      await hasRights(req, ['requestant'])
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Not an ObjectId')
      }
      const template = await Template.findOne({ _id }).populate(['updatedBy', 'author'])
      return {
        ...template._doc,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString()
      }
    },
    templatesCount: async (parent, args, { req }, info) => {
      const count = await Template.countDocuments()
      return count
    }
  },
  Mutation: {
    createTemplate: async (parent, { templateInput }, { req }, info) => {
      await hasRights(req, ['requestant'])
      validateInput({ name: templateInput.name }, templateSchema)

      const createdReasons = []
      if (templateInput.reasons.length) {
        await handleValuesNotInMongo(templateInput.reasons, Reason, createdReasons)
      }

      const createdDestinations = []
      if (templateInput.destinations.length) {
        await handleValuesNotInMongo(templateInput.destinations, Destination, createdDestinations)
      }

      const template = new Template({
        ...templateInput,
        reasons: [...templateInput.reasons, ...createdReasons],
        destinations: [...templateInput.destinations, ...createdDestinations],
        author: req.session.authId
      })
      const result = await template.save()
      return result._doc
    },
    updateTemplate: async (parent, { _id, templateInput }, { req }, info) => {
      await hasRights(req, ['requestant'])

      const createdReasons = []
      if (templateInput.reasons.length) {
        await handleValuesNotInMongo(templateInput.reasons, Reason, createdReasons)
      }

      const createdDestinations = []
      if (templateInput.destinations.length) {
        await handleValuesNotInMongo(templateInput.destinations, Destination, createdDestinations)
      }

      const result = await Template.findByIdAndUpdate(_id, {
        ...templateInput,
        reasons: [...templateInput.reasons, ...createdReasons],
        destinations: [...templateInput.destinations, ...createdDestinations],
        updatedBy: req.session.authId
      })
      return result._doc
    }
  }
}
