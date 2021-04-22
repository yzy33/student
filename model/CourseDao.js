const mongoose = require('../config/DbConfig');
const course = require('../model/entity/Course');
const model = mongoose.model('course', course.schema);
const MongooseDao = require('mongoosedao');
const MeetingDao = new MongooseDao(model);
module.exports = MeetingDao;