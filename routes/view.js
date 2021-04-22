const express = require('express');
const router = express.Router();
const check = require('../service/CheckPermissions');
router.get('/:view', function (req, res, next) {
    if (req.params.view !== 'login') {
        if (req.session.hasOwnProperty("userInfo")) {
            if (check.checkView(req.session.userInfo.role, req.params.view)) {
                res.render(req.params.view);
                return;
            }
        }
        res.render("login");
        return;
    }
    res.render("login");
});
router.get('/:cl/:view', function (req, res, next) {
    if (req.params.view !== 'login') {
        if (req.session.hasOwnProperty("userInfo")) {
            if (check.checkView(req.session.userInfo.role, req.params.cl + "/" + req.params.view)) {
                res.render(req.params.cl + "/" + req.params.view);
                return;
            }
        }
        res.render("login");
        return;
    }
    res.render("login");
});
module.exports = router;