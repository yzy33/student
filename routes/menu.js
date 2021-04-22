const express = require('express');
const router = express.Router();
const check = require('../service/CheckPermissions');
const permissions = require("../config/Permissions");
router.get('/', function (req, res, next) {
    if (check.checkApi(req.session.userInfo.role, "menu")) {
        res.send({"code": 200, "msg": "success", "data": permissions[req.session.userInfo.role].menu});
    } else {
        res.send({"code": 401, "msg": "no permission"});
    }
});
module.exports = router;