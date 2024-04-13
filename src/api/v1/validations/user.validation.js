const Users = require('../models/user.model')

const checkInforUser = (req, res) => {
    const { userName, passWord } = req.body
    if (userName === '' || passWord === '') return false
    return true
}

const isExisting = (userName) => {
    return Users.findOne({ userName: userName })
}

module.exports = {
    checkInforUser,
    isExisting
}