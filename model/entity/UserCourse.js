const mongoose = require('../../config/DbConfig');
const Schema = mongoose.Schema;
const UserCourseSchema = new Schema({
    courseId: {type: String},
    userId: {type: String}
});
module.exports = mongoose.model("userCourse", UserCourseSchema);