const mongoose = require('../config/DbConfig');
const userGrade = require('../model/entity/UserGrade');
const model = mongoose.model('userGrade', userGrade.schema);
const MongooseDao = require('mongoosedao');
const MeetingDao = new MongooseDao(model);
module.exports = MeetingDao;