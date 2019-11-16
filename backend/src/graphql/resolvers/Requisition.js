/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Handles requisition connected logic
*/

import mongoose from 'mongoose'
import webpush from 'web-push'
import { ErrorCodes } from '../../constants'
import Car from '../../models/Car'
import Destination from '../../models/Destination'
import PushSubscription from '../../models/PushSubscription'
import Reason from '../../models/Reason'
import Requisition from '../../models/Requisition'
import User from '../../models/User'
import { hasRights, validateInput } from '../../utils'
import { requisitionExportSchema } from '../../validation'

export default {
  Query: {
    requisitions: async (
      parent,
      { limit, offset, car, driver, approver, status, date },
      { req },
      info
    ) => {
      await hasRights(req, ['requestant', 'approver', 'driver'])
      const requisitions = await Requisition.find({
        car: car || { $exists: true },
        driver: driver || { $exists: true },
        approver: approver || { $exists: true },
        status: status || { $exists: true },
        startDate: date ? { $gte: date[0], $lte: date[1] } : { $exists: true }
      })
        .sort({ startDate: -1 })
        .skip(offset)
        .limit(limit)
        .populate(['approver', 'driver', 'passengers', 'reasons', 'destinations', 'car'])
      return requisitions.map(requisition => ({
        ...requisition._doc,
        startDate: requisition.startDate.toISOString(),
        endDate: requisition.endDate.toISOString(),
        createdAt: requisition.createdAt.toISOString(),
        updatedAt: requisition.updatedAt.toISOString()
      }))
    },
    statistics: async (parent, { dateRange }, { req }, info) => {
      await hasRights(req, ['approver'])

      const cars = await Car.find()
      const users = await User.find()
      const reasons = await Reason.find()
      const destinations = await Destination.find()

      const carStatistics = await Promise.all(
        cars.map(car => {
          return Requisition.find({
            car: car._id,
            startDate: dateRange.length
              ? { $gte: dateRange[0], $lte: dateRange[1] }
              : { $exists: true }
          })
            .countDocuments()
            .then(res => ({
              _id: car._id,
              name: car.name,
              count: res
            }))
        })
      )

      const userStatistics = await Promise.all(
        users.map(user => {
          return Requisition.find({
            passengers: { $in: user._id },
            startDate: dateRange.length
              ? { $gte: dateRange[0], $lte: dateRange[1] }
              : { $exists: true }
          })
            .countDocuments()
            .then(res => ({
              _id: user._id,
              name: `${user.lastName} ${user.firstName}`,
              count: res
            }))
        })
      )

      const reasonStatistics = await Promise.all(
        reasons.map(reason => {
          return Requisition.find({
            reasons: { $in: reason._id },
            startDate: dateRange.length
              ? { $gte: dateRange[0], $lte: dateRange[1] }
              : { $exists: true }
          })
            .countDocuments()
            .then(res => ({
              _id: reason._id,
              name: reason.name,
              count: res
            }))
        })
      )

      const destinationStatistics = await Promise.all(
        destinations.map(destination => {
          return Requisition.find({
            destinations: { $in: destination._id },
            startDate: dateRange.length
              ? { $gte: dateRange[0], $lte: dateRange[1] }
              : { $exists: true }
          })
            .countDocuments()
            .then(res => ({
              _id: destination._id,
              name: destination.name,
              count: res
            }))
        })
      )

      return {
        cars: carStatistics.sort((a, b) => b.count - a.count).slice(0, 5),
        users: userStatistics.sort((a, b) => b.count - a.count).slice(0, 5),
        reasons: reasonStatistics.sort((a, b) => b.count - a.count).slice(0, 5),
        destinations: destinationStatistics.sort((a, b) => b.count - a.count).slice(0, 5)
      }
    },
    requisitionsExport: async (
      parent,
      { passengers, author, approver, car, driver, reasons, destinations, dateRange, status },
      { req },
      info
    ) => {
      await hasRights(req, ['approver'])
      validateInput({ dateRange }, requisitionExportSchema)
      const requisitions = await Requisition.find({
        passengers: passengers.length ? { $in: passengers } : { $exists: true },
        author: author.length ? { $in: author } : { $exists: true },
        approver: approver.length ? { $in: approver } : { $exists: true },
        car: car.length ? { $in: car } : { $exists: true },
        driver: driver.length ? { $in: driver } : { $exists: true },
        reasons: reasons.length ? { $in: reasons } : { $exists: true },
        destinations: destinations.length ? { $in: destinations } : { $exists: true },
        startDate: { $gte: dateRange[0], $lte: dateRange[1] },
        status: status.length ? { $in: status } : { $exists: true }
      })
        .sort({ startDate: -1 })
        .populate(['author', 'approver', 'driver', 'passengers', 'reasons', 'destinations', 'car'])
      return requisitions.map(requisition => ({
        ...requisition._doc,
        startDate: requisition.startDate.toISOString(),
        endDate: requisition.endDate.toISOString(),
        createdAt: requisition.createdAt.toISOString(),
        updatedAt: requisition.updatedAt.toISOString()
      }))
    },
    requisition: async (parent, { _id }, { req }, info) => {
      await hasRights(req, ['driver', 'approver', 'requestant'])
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Not an ObjectId')
      }
      const requisition = await Requisition.findOne({ _id }).populate(['updatedBy', 'author'])
      return {
        ...requisition._doc,
        startDate: requisition.startDate.toISOString(),
        endDate: requisition.endDate.toISOString(),
        createdAt: requisition.createdAt.toISOString(),
        updatedAt: requisition.updatedAt.toISOString()
      }
    },
    requisitionsCount: async (parent, { car, driver, approver, status }, { req }, info) => {
      const count = await Requisition.countDocuments({
        car: car || { $exists: true },
        driver: driver || { $exists: true },
        approver: approver || { $exists: true },
        status: status || { $exists: true }
      })
      return count
    }
  },
  Mutation: {
    createRequisition: async (parent, { requisitionInput }, { req }, info) => {
      await hasRights(req, ['requestant'])
      const overlappingRequisitions = await Requisition.countDocuments({
        car: requisitionInput.car,
        $or: [
          {
            $and: [
              { startDate: { $gte: requisitionInput.startDate } },
              { endDate: { $gte: requisitionInput.endDate } },
              { startDate: { $lte: requisitionInput.endDate } }
            ]
          },
          {
            $and: [
              { startDate: { $lte: requisitionInput.startDate } },
              { endDate: { $lte: requisitionInput.endDate } },
              { endDate: { $gte: requisitionInput.startDate } }
            ]
          },
          {
            $and: [
              { startDate: { $lte: requisitionInput.startDate } },
              { endDate: { $gte: requisitionInput.endDate } }
            ]
          },
          {
            $and: [
              { startDate: { $gte: requisitionInput.startDate } },
              { endDate: { $lte: requisitionInput.endDate } }
            ]
          }
        ]
      })

      if (overlappingRequisitions > 0) {
        throw new Error(ErrorCodes.REQ_OVERLAP)
      }

      /*       const createdReasons = []
      await handleValuesNotInMongo(requisitionInput.reasons, Reason, createdReasons)
      const createdDestinations = []
      await handleValuesNotInMongo(requisitionInput.destinations, Destination, createdDestinations) */

      const requisition = new Requisition({
        ...requisitionInput,
        /*         reasons: [...requisitionInput.reasons, ...createdReasons],
        destinations: [...requisitionInput.destinations, ...createdDestinations], */
        author: req.session.authId
      })
      const result = await requisition.save()
      return result._doc
    },
    updateRequisition: async (parent, { _id, requisitionInput }, { req }, info) => {
      await hasRights(req, ['driver', 'approver', 'requestant'])
      const overlappingRequisitions = await Requisition.countDocuments({
        car: requisitionInput.car,
        _id: { $nin: [mongoose.Types.ObjectId(_id)] },
        $or: [
          {
            $and: [
              { startDate: { $gte: requisitionInput.startDate } },
              { endDate: { $gte: requisitionInput.endDate } },
              { startDate: { $lte: requisitionInput.endDate } }
            ]
          },
          {
            $and: [
              { startDate: { $lte: requisitionInput.startDate } },
              { endDate: { $lte: requisitionInput.endDate } },
              { endDate: { $gte: requisitionInput.startDate } }
            ]
          },
          {
            $and: [
              { startDate: { $lte: requisitionInput.startDate } },
              { endDate: { $gte: requisitionInput.endDate } }
            ]
          },
          {
            $and: [
              { startDate: { $gte: requisitionInput.startDate } },
              { endDate: { $lte: requisitionInput.endDate } }
            ]
          }
        ]
      })

      if (overlappingRequisitions > 0) {
        throw new Error(ErrorCodes.REQ_OVERLAP)
      }

      let number = null
      if (requisitionInput.status === 'done') {
        number = await Requisition.countDocuments({
          car: requisitionInput.car,
          $and: [
            {
              startDate: {
                $gte: new Date(
                  `${new Date(requisitionInput.startDate).getFullYear()}-01-01T00:00:00`
                )
              }
            },
            {
              startDate: {
                $lte: new Date(
                  `${new Date(requisitionInput.startDate).getFullYear()}-12-31T23:59:59`
                )
              }
            },
            { number: { $ne: null } }
          ]
        })
      }

      /*       const createdReasons = []
      await handleValuesNotInMongo(requisitionInput.reasons, Reason, createdReasons)
      const createdDestinations = []
      await handleValuesNotInMongo(requisitionInput.destinations, Destination, createdDestinations) */

      const result = await Requisition.findByIdAndUpdate(
        _id,
        {
          ...requisitionInput,
          /*           reasons: [...requisitionInput.reasons, ...createdReasons],
          destinations: [...requisitionInput.destinations, ...createdDestinations], */
          number: number !== null ? number + 1 : null,
          updatedBy: req.session.authId
        },
        { new: true }
      ).populate(['updatedBy', 'driver', 'car'])

      const notifications = await PushSubscription.find().select({
        authId: 1,
        endpoint: 1,
        expirationTime: 1,
        keys: 1
      })

      notifications
        .filter(notification =>
          process.env.NODE_ENV === 'production'
            ? notification.authId.toString() !== req.session.authId.toString()
            : false
        )
        .forEach(notification => {
          webpush
            .sendNotification(
              notification,
              JSON.stringify({
                title: 'Změna na žádance',
                body: `Žádanka s vozidlem ${result.car.name} a řidičem ${result.driver.lastName} ${result.driver.firstName} byla změněna. Změnu provedl uživatel ${result.updatedBy.email}. Kliknutím žádanku otevřete.`,
                data: {
                  url:
                    process.env.NODE_ENV === 'production'
                      ? `https://harmonie.netlify.com/req/${_id}`
                      : `http://localhost:3000/req/${_id}`
                }
              })
            )
            .catch(error => {
              if (error.statusCode === 410) {
                PushSubscription.findOneAndDelete({
                  endpoint: error.endpoint
                }).then(console.log)
              }
            })
        })
      return result._doc
    },
    deleteRequisition: async (parent, { _id }, { req }, info) => {
      await hasRights(req, ['approver'])
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Not an ObjectId')
      }

      await Requisition.findByIdAndDelete(_id)
      return true
    }
  }
}
