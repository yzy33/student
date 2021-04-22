const express = require('express');
const router = express.Router();
const check = require('../service/CheckPermissions');
const permissions = require("../config/Permissions");
const scoreDao = require("../model/ScoureDao");
const courseDao = require("../model/CourseDao");
router.post('/findPage', function (req, res, next) {
    const page = req.body.page;
    const limit = req.body.limit;
    const common = req.body.common;
    if(req.session.userInfo.role ==='user'){
        common['userId']=req.session.userInfo.userId;
    }
    scoreDao.find(common, function (err, db) {
        const course = db.slice((page - 1) * limit, (page - 1) * limit + limit - 1);
        res.send({
            "code": 0, "msg": "success", "data": course
            , "num": db.length
        });
    })
});
router.put('/insert', function (req, res, next) {
    courseDao.find({courseId: req.body.courseId}, function (err, db) {
        if (db.length === 0) {
            res.send({
                "code": 405, "msg": "课程不存在"
            });
        } else {
            scoreDao.create(req.body, function (err, db) {
                res.send({
                    "code": 200, "msg": "success"
                });
            });
        }
    });
});
router.post('/del', function (req, res, next) {
    scoreDao.find({_id: req.body._id}, function (err, db) {
        if (db.length === 0) {
            res.send({
                "code": 405, "msg": "分数不存在"
            });
        } else {
            scoreDao.delete({_id: req.body._id}, function (err, db) {
                res.send({
                    "code": 200, "msg": "success"
                });
            });
        }
    });
});
router.put('/edit', function (req, res, next) {
    courseDao.find({courseId: req.body.courseId}, function (err, db) {
        if (db.length === 0) {
            res.send({
                "code": 405, "msg": "课程不存在"
            });
        } else {
            scoreDao.updateById(req.body._id, req.body, function (err, db) {
                res.send({
                    "code": 200, "msg": "success"
                });
            });
        }
    });
});
module.exports = router;