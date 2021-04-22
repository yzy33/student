const mongoose = require('../../config/DbConfig');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: {type: String},
    username: {type: String},
    nickName: {type: String},
    password: {type: String},
    role: {type: String},
    sex: {type: String},
    age: {type: String},
    gradeId: {type: String},
    status: {type: String}
});
module.exports = mongoose.model("user", userSchema);