let {createUser} = require('./user.controller')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const userResponse = require('../views/user.response')

const singUpUser = createUser;
const singInUser = async (req, res) => {
    let userId = req.body.username;
    let userPwd =  req.body.password;
    let tokenExpiry = 300;
    try {
        let userDataFound = await userModel.findOne({ where: { username: userId } });
        if(userDataFound == null) {
            respWrongCredentials(res, 401);
        } else {
            let isValidPassword = bcrypt.compareSync(userPwd, userDataFound.password);
            if(!isValidPassword) {
                respWrongCredentials(res, 401);
            } else {
                let token = jwt.sign(
                    {
                        username: userDataFound.username,
                        fullname: userDataFound.fullname,
                        designation: userDataFound.designation,
                        account_type: userDataFound.account_type,
                        iat: Math.floor(Date.now() / 1000) + tokenExpiry
                    },
                    process.env.APP_SECRET,
                    {
                        expiresIn: tokenExpiry,
                        algorithm: 'HS256',
                    }
                );

                respCorrectCredentials(res, token, userDataFound);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: true,
            message: 'Ooops! there is something wrong'
        });
    }

};

const respWrongCredentials = (res, httpRespCode) => {
    res.status(httpRespCode).send({
        error: true,
        message: `wrong username or password`
    });
}

const respCorrectCredentials = (res, jwtToken, data) => {
    res.status(200).send({
        error: false,
        data: userResponse(data),
        message: 'Successfull login',
        accessToken: jwtToken
    });
}

module.exports = {
    singUpUser,
    singInUser
}