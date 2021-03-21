const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const mongoose = require('mongoose')
const Users = require('../models/userModel');
exports.VerifyUser = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "You must be loggin In" })
    }
    else {
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({ error: "you must be logginIn" })
            }
            else {
                const { _id } = payload
                Users.findById({ _id })
                    .then(userdata => {
                        req.user = userdata
                        next()
                    })
            }
        })
    }
}
