const mongoose = require('../../config/DbConfig');
const Schema = mongoose.Schema;
const WorkSchema = new Schema({
    courseId: {type: String},
    workName: {type: String},
    gradeId: {type: String},
    teacherId: {type: String},
    workId: {type: String},
    url: {type: String},
    user:{type:JSON}
});
module.exports = mongoose.model("work", WorkSchema);