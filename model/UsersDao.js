const mongoose = require('../config/DbConfig');
const User = require('../model/entity/User');
const UserModel = mongoose.model('user', User.schema);
const MongooseDao = require('mongoosedao');
const MeetingDao = new MongooseDao(UserModel);
module.exports = MeetingDao;