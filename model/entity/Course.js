const mongoose = require('../../config/DbConfig');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseId: {type: String},
    courseName: {type: String},
    gradeId: {type: String},
    teacherId: {type: String},
    isEnbend: {type: String},
    userId:{type:JSON}
});
module.exports = mongoose.model("course", CourseSchema);