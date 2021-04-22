const express = require('express');
const router = express.Router();
const check = require('../service/CheckPermissions');
const permissions = require("../config/Permissions");
const gradeDao = require("../model/GradeDao");
router.post('/findPage', function (req, res, next) {
    const page = req.body.page;
    const limit = req.body.limit;
    const common = req.body.common;
    gradeDao.find(common, function (err, db) {
        var lb = [];
        for (var i = 0; i < db.length; i++) {
            if (typeof (db[i].status) == "undefined" || db[i].status != "false") {
                lb.push(db[i]);
            }
        }
        res.send({
            "code": 0, "msg": "success", "data": lb.slice((page - 1) * limit, (page - 1) * limit + limit - 1)
            , "num": lb.length
        });
    });
});
router.put('/insert', function (req, res, next) {
    gradeDao.create(req.body, function (err, db) {
        res.send({
            "code": 200, "msg": "success"
        });
    });
});
router.put('/edit', function (req, res, next) {
    gradeDao.updateById(req.body._id, req.body, function (err, db) {
        res.send({
            "code": 200, "msg": "success"
        });
    });
});
router.post('/del', function (req, res, next) {
    gradeDao.find({_id: req.body._id}, function (err, db) {
        if (db.length === 0) {
            res.send({
                "code": 405, "msg": "班级不存在"
            });
        } else {
            gradeDao.delete({_id: req.body._id}, function (err, db) {
                res.send({
                    "code": 200, "msg": "success"
                });
            });
        }
    });
});
module.exports = router;