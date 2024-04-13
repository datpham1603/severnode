const Users = require('../models/user.model')
const { isExisting } = require('../validations/user.validation')

module.exports.login = async (user) => {
    const { userName, passWord } = user;
    try {
        const foundUser = await Users.findOne({ userName, passWord });
        console.log(foundUser);
        return foundUser; // If found, return the user
    } catch (err) {
        console.error(err);
        return null; // If any error occurs, return null
    }
};

module.exports.createaccount = async (user) => {
    console.log(user);
    const { userName, passWord, email, phoneNumber } = user;
    try {
        const existingUser = await isExisting(userName);
        if (existingUser) {
            return false;
        }
        const newUser = await Users({ userName, passWord, email, phoneNumber });
        await newUser.save(); 
        if (!newUser) {
            return null;
        }
        return newUser;
    } catch (err) {
        console.error(err);
        return null;
    }
};

