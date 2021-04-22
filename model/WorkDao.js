const mongoose = require('../config/DbConfig');
const work = require('../model/entity/Work');
const WorkModel = mongoose.model('work', work.schema);
const MongooseDao = require('mongoosedao');
const MeetingDao = new MongooseDao(WorkModel);
module.exports = MeetingDao;