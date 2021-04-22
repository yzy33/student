const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const multer = require('multer')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const upload = multer({dest: 'upload/'});
app.post('/upload-single', upload.single('file'), function (req, res, next) {
    var file = req.file;
    var name = file.originalname;
    var nameArray = name.split('');
    var nameMime = [];
    var l = nameArray.pop();
    nameMime.unshift(l);
    while (nameArray.length != 0 && l != '.') {
        l = nameArray.pop();
        nameMime.unshift(l);
    }
    var Mime = nameMime.join('');
    console.log(Mime);
    res.send({
        "code": 0
        , "msg": ""
        , "data": {
            "src": '/download/' + file.filename + Mime
        }
    });
    fs.renameSync('./upload/' + file.filename, './upload/' + file.filename + Mime);
});
app.use('/download', express.static(path.join(__dirname, 'upload')));
app.get('download/:path', function (req, res) {
    var file = __dirname + '/' + path;
    res.download(file);
});
app.use(bodyParser.json());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {maxAge: 60 * 60 * 1000}}));
app.use(bodyParser.urlencoded({
    extended: false
}));
const rout = require("./server");
rout.forEach(function (item, index) {
    app.use(item.path, require(item.route));
});
app.engine('html', ejs.__express);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render('404');
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('500');
});

module.exports = app;