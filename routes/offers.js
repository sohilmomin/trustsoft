const express = require('express')
const bodyParser = require('body-parser')
const Offers = require('../models/offerModel')
const authenticate = require('../routes/authenticate')
const offerRouter = express.Router()

offerRouter.use(bodyParser.json())
offerRouter.route('/')
    .get((req, res, next) => {
        Offers.find()
            .then(offers => {
                res.setHeader('Content-Type', 'application/json')
                res.json(offers)
            }, (err) => next(err))
            .catch((err) => {
                res.status(422).json(err)
                next(err)
            })
    })
    .post(authenticate.VerifyUser, (req, res, next) => {
        Offers.create(req.body)
            .then(offer => {
                Offers.findById(offer._id)
                    .then(offer => {
                        res.setHeader('Content-Type', 'application/json')
                        res.json(offer)
                    }, err => next(err))
            })
            .catch((err) => {
                res.status(422).json(err)
                next(err)
            })
    })
offerRouter.route('/:offerId')
    .put(authenticate.VerifyUser, (req, res, next) => {
        Offers.findByIdAndUpdate(req.params.offerId, { $set: req.body }, { new: true })
            .then(offer => {
                Offers.findById(offer._id)
                    .then(offer => {
                        res.setHeader('Content-Type', 'application/json')
                        res.json(offer)
                    }, err => next(err))
            })
            .catch(err => next(err))
    })
    .delete(authenticate.VerifyUser, (req, res, next) => {
        Offers.findByIdAndDelete(req.params.offerId)
            .then(offer => {
                res.setHeader('Content-Type', 'application/json')
                res.status(200).json(offer)
            })
            .catch(err => next(err))
    })
module.exports = offerRouter