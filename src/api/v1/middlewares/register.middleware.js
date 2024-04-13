const { checkInforUser } = require("../validations/user.validation")


const registermiddelware = (req, res, next) => {
    const { userName, passWord } = req.body
    console.log(userName)
    if (!checkInforUser( userName,passWord)) {
        res.json({ message: 'lỗi' })
    }
    next()
}


module.exports = {
    registermiddelware: registermiddelware
}