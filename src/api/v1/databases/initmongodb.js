const mongo = require('mongoose')

const connectMongo = async (uri) => {
    try {
        await mongo.connect(uri)
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connectMongo