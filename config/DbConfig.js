const mongoose = require('mongoose');  //node js 操
const DB_URL = 'mongodb://localhost:27017/student';
mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('db connect success')
});
mongoose.connection.on('disconnected', () => {
    console.log('db connect close')
});
mongoose.connection.on('error', () => {
    console.log('db connect error')
});
module.exports = mongoose;