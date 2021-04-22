const mongoose = require('../../config/DbConfig');
const Schema = mongoose.Schema;
const ScoureSchema = new Schema({
    courseId: {type: String},
    userId: {type: String},
    course: {type: String}
});
module.exports = mongoose.model("scoure", ScoureSchema);