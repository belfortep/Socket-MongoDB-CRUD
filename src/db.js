const { connect } = require('mongoose')
const { MONGODB_URI } = require('./config')

const connectDB = async () => {
    try {
        await connect(MONGODB_URI);
        console.log('db connected')
    } catch (err) {
        console.log(err)
    }

}

module.exports = { connectDB }