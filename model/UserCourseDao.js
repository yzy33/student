const mongoose = require('../config/DbConfig');
const userCourse = require('../model/entity/UserCourse');
const model = mongoose.model('userCourse', userCourse.schema);
const MongooseDao = require('mongoosedao');
const MeetingDao = new MongooseDao(model);
module.exports = MeetingDao;