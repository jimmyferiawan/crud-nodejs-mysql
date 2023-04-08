module.exports = function userResponse(data) {
    return {
        username: data.username,
        fullname: data.fullname,
        contact: data.contact,
    }
}