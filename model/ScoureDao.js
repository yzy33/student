const mongoose = require('../config/DbConfig');
const Scoure = require('../model/entity/Scoure');
const model = mongoose.model('scoure', Scoure.schema);
const MongooseDao = require('mongoosedao');
const MeetingDao = new MongooseDao(model);
module.exports = MeetingDao;