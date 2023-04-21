const UserModel = require('../models/user.model')
const userResponse = require('../views/user.response')
const bcrypt = require('bcrypt')

let createUser = (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.fullname || !req.body.contact) {
        res.status(400).send({
            message: "Mandatory field should not be empty"
        })

        return
    }

    const User1 = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 12),
        fullname: req.body.fullname,
        designation: 1,
        contact: req.body.contact,
        account_type: 1
    }

    UserModel.create(User1)
        .then(data => {
            console.log("data")
            console.log(data);
            res.status(201).send(userResponse(data))
        })
        .catch(err => {
            console.log('UserModel.create error')
            console.log(err)
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403).send({
                    message: "Username already exists"
                })
            } else {
                res.status(500).send({
                    message: err.message || "Some error occured, please try again later."
                })
            }
            
        })
}

let findAllUser = (req, res) => {
    UserModel.findAll()
        .then(data => {
            res.send(data.map(userResponse))
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            })
        })
}

let findOneUser = (req, res) => {
    const idUser = req.params.id
    UserModel.findOne({
        where: {
            username: req.params.id
        }
    })
    .then(data => {
        if(data) {
            res.send(userResponse(data))
        } else {
            res.status(404).send({
                message: `Cannot find User ${idUser}`
            })
        }
    })
    .catch(err => {
        res.status(404).send({
            message: "Error retrieving Tutorial with id=" + id
        })
    })
}

let updateUser = (req, res) => {
    res.send({
        "update": "update user"
    })
}

let deleteUser = (req, res) => {
    res.send({
        "delete": "delete user"
    })
}

module.exports = {
    createUser,
    findAllUser,
    findOneUser,
    updateUser,
    deleteUser
}