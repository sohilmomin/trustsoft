var express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const Users = require('../models/userModel');
const authenticate = require('../routes/authenticate')

var UserRouter = express.Router();
UserRouter.use(bodyParser.json())
UserRouter.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please add all the  fields" })
  }
  else {
    Users.findOne({ $or: [{ email: email }, { name: name }] })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(422).json({ error: "User with same name or email already exist" })
        }
        else {
          bcrypt.hash(password, 12)
            .then((hasedpassword => {
              const user = new Users({ name, email, password: hasedpassword })
              user.save()
                .then((user) => {
                  res.json({ message: "Signed Up Successfully." })
                })
                .catch(err => {
                  console.log(err)
                })
            }))

        }
      })
      .catch(err => {
        console.log("error to find such User")
        console.log(err)
      })
  }
})

UserRouter.post("/signin", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(422).json({ error: "Please provide Username or password" })
  }
  else {
    Users.findOne({ name: name })
      .then((saveduser) => {
        if (!saveduser) {
          return res.status(422).json({ error: "Invalid Username or password" })
        }
        else {
          bcrypt.compare(password, saveduser.password)
            .then(doMatch => {
              if (doMatch) {
                const token = jwt.sign({ _id: saveduser._id }, JWT_SECRET)
                const { _id, name, email } = saveduser
                res.json({ token, user: { _id, name, email } })
              }
              else {
                return res.status(422).json({ error: "Invalid Username or password" })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
  }
})

module.exports = UserRouter;
