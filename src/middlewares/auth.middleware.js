const jwt = require("jsonwebtoken")
const userResponse = require("../views/user.response")

const unAuthResponse = (res, respCode) => {
    res.status(respCode).send({
        error: true,
        message: "Oops! something went wrong"
    })
}

const verifyToken = (req, res, next) => {
    console.log(`header Authorization : ${req.headers.authorization}`)
    if (isValidAuthBearerHeader(req)) {
        jwt.verify(req.headers.authorization.split(" ")[1], process.env.APP_SECRET, (err, decode) => {
            // console.log(decode)
            if (err) {
                req.user = undefined;
                unAuthResponse(res, 404)
            } 
            req.user = userResponse(decode) 
            next()
        })
    } else {
        unAuthResponse(res, 404)
    }
}
const verifyUserOwn = (req, res, next) => {
    let reqToken = req.headers.authorization.split(" ")[1]
    console.log(`reqToken = ${reqToken}`)
    let dataUser = jwt.verify(reqToken, process.env.APP_SECRET)
    console.log(`dataUser = ${dataUser.username} == req.params.username = ${req.params.username}`)
    if(dataUser.username != req.params.username) {
        res.status(403).send({
            error: true,
            message: "Not Authorized!"
        })
    } else {
        next()
    }
}

function isValidAuthBearerHeader(req) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] == 'Bearer') {
        console.log("valid header")
        return true
    } else {
        console.log("invalid header")
        return false
    }
}

module.exports = {
    verifyToken,
    verifyUserOwn
}