const express = require('express');
const router = express.Router();
const check = require('../service/CheckPermissions');
const userDao = require("../model/UsersDao");
router.post('/login', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    userDao.find({"username": username, password: password}, function (err, db) {
        if (db.length === 0 || db[0].status == "false") {
            res.send({"code": 405, "msg": "error"});
            return;
        } else {
            req.session.userInfo = db[0];
            res.send({"code": 200, "msg": "success", data: db[0]});
            return;
        }
    });
});
router.get('/loginout', function (req, res, next) {
    req.session.destroy();
    res.render("login");
});
router.post('/edit', function (req, res, next) {
    const nickName = req.body.nickName;
    const password = req.body.password;
    const id = req.body._id;
    userDao.updateById(id, {nickName: nickName, password: password}, function (err, dic) {
        res.send({"code": 200, "msg": "success"});
    });
});
router.post('/findPage', function (req, res, next) {
    const page = req.body.page;
    const limit = req.body.limit;
    const common = req.body.common;
    userDao.find(common, function (err, db) {
        res.send({
            "code": 0, "msg": "success", "data": db.slice((page - 1) * limit, (page - 1) * limit + limit - 1)
            , "num": db.length
        });
    });
});
router.put('/insert', function (req, res, next) {
    userDao.create(req.body, function (err, db) {
        res.send({
            "code": 200, "msg": "success"
        });
    });
});
router.put('/edit', function (req, res, next) {
    userDao.updateById(req.body._id, req.body, function (err, db) {
        res.send({
            "code": 200, "msg": "success"
        });
    });
});
router.post('/del', function (req, res, next) {
    userDao.find({_id: req.body._id}, function (err, db) {
        if (db.length === 0) {
            res.send({
                "code": 405, "msg": "用户不存在"
            });
        } else {
            userDao.delete({_id: req.body._id}, function (err, db) {
                res.send({
                    "code": 200, "msg": "success"
                });
            });
        }
    });
});
module.exports = router;