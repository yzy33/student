const express = require('express');
const router = express.Router();
const check = require('../service/CheckPermissions');
const permissions = require("../config/Permissions");
const courseDao = require("../model/CourseDao");
const gradeDao = require("../model/GradeDao");
const userDao = require("../model/UsersDao");
router.post('/findPageNo', function (req, res, next) {
    const page = req.body.page;
    const limit = req.body.limit;
    const common = req.body.common;
    courseDao.find(common, function (err, db) {
        const course = db.slice((page - 1) * limit, (page - 1) * limit + limit - 1);
        res.send({
            "code": 0, "msg": "success", "data": course
            , "num": db.length
        });
    })
});
router.post('/findPage', function (req, res, next) {
    const page = req.body.page;
    const limit = req.body.limit;
    const common = req.body.common;
    if (req.session.userInfo.role === 'teacher') {
        common['teacherId'] = req.session.userInfo.userId;
    }
    if (req.session.userInfo.role === 'user') {
        common['gradeId'] = req.session.userInfo.gradeId;
    }
    courseDao.find({
        "$or": [common, {
            "gradeId": "xx",
            "userId": {"$ne": req.session.userInfo.userId}
        }]
    }, function (err, db) {
        const course = db.slice((page - 1) * limit, (page - 1) * limit + limit - 1);
        res.send({
            "code": 0, "msg": "success", "data": course
            , "num": db.length
        });
    })
});
router.put('/insert', function (req, res, next) {
    gradeDao.find({gradeId: req.body.gradeId}, function (err, db) {
        if (db.length === 0) {
            req.body['isEnbend'] = "false";
        } else {
            req.body['isEnbend'] = "true";
        }
        userDao.find({userId: req.body.teacherId, role: "teacher"}, function (err, db) {
            if (db.length === 0) {
                res.send({
                    "code": 405, "msg": "教师不存在"
                });
                return db;
            } else {
                courseDao.create(req.body, function (err, db) {
                    res.send({
                        "code": 200, "msg": "success"
                    });
                });
            }
        });
    });
});
router.put('/edit', function (req, res, next) {
    gradeDao.find({gradeId: req.body.gradeId}, function (err, db) {
        if (db.length === 0) {
            req.body['isEnbend'] = "false";
        } else {
            req.body['isEnbend'] = "true";
        }
        userDao.find({userId: req.body.teacherId, role: "teacher"}, function (err, db) {
            if (db.length === 0) {
                res.send({
                    "code": 405, "msg": "教师不存在"
                });
                return db;
            } else {
                courseDao.updateById(req.body._id, req.body, function (err, db) {
                    res.send({
                        "code": 200, "msg": "success"
                    });
                });
            }
        });
    });
});
router.post('/del', function (req, res, next) {
    courseDao.find({_id: req.body._id}, function (err, db) {
        if (db.length === 0) {
            res.send({
                "code": 405, "msg": "分数不存在"
            });
        } else {
            courseDao.delete({_id: req.body._id}, function (err, db) {
                res.send({
                    "code": 200, "msg": "success"
                });
            });
        }
    });
});
module.exports = router;