const express = require('express')
const router = require('./src/api/v1/routes')
const connectMongo = require('./src/api/v1/databases/initmongodb')
const DB = require('./src/config/db.config')
const cors = require('cors');


connectMongo(DB.mongoUrl)
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

module.exports = app
