const mongoose = require('../config/DbConfig');
const grade = require('../model/entity/Grade');
const model = mongoose.model('grade', grade.schema);
const MongooseDao = require('mongoosedao');
const MeetingDao = new MongooseDao(model);
module.exports = MeetingDao;