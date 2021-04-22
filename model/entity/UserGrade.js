const mongoose = require('../../config/DbConfig');
const Schema = mongoose.Schema;
const UserGradeSchema = new Schema({
    gradeId: {type: String},
    userId: {type: String}
});
module.exports = mongoose.model("userGrade", UserGradeSchema);