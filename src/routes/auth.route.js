let authRouter = require('express').Router()
let {singInUser, singUpUser} = require('../controllers/auth.controller')

authRouter.post('/signin', singInUser)
authRouter.post('/signup', singUpUser)

module.exports = authRouter