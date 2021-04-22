const mongoose = require('../../config/DbConfig');
const Schema = mongoose.Schema;
const gradeSchema = new Schema({
    gradeId: {type: String},
    gradeName: {type: String},
    site: {type: String},
    status: {type: String}
});
module.exports = mongoose.model("grade",gradeSchema);