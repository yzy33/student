//设置cookie
function setCookie(key, val) {
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (60 * 60 * 1000));
    $.cookie(key, val, {expires: expiresDate, path: '/'});
}

//获得Cookie
function getCookie(key) {
    return $.cookie(key);
}

//删除cookie
function deletedCookie() {
    document.cookie = "";
}

function jsonToString(pathMap) {
    var path = "";
    for (var key in pathMap) {
        if (path.length != 0) {
            path = path + "&" + key + "=" + pathMap[key];
        } else {
            path = key + "=" + pathMap[key];
        }
    }
    if (typeof (path) == 'undefined') {
        return "code=" + getCode(8);
    } else {
        return path;
    }
}

//get请求
function playGet(urls, pathMap, queryMap) {
    var re = "";
    $.ajax({
        url: configPro.projectName + urls + "?" + jsonToString(pathMap),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(queryMap),
        async: false,
        dataType: "json",
        success: function (as) {
            if (configPro.logger == 'debugger') {
                console.log("=============GET==============");
                console.log("path:" + configPro.projectName + urls + "?" + jsonToString(pathMap));
                console.log("data:" + JSON.stringify(queryMap));
                console.log("bank:" + JSON.stringify(as));
                console.log("=============END==============");
            }
            if (as.code != 200) {
                alr(as.msg);
            }
            re = as;
        },
        error: function (es) {
            console.log("=============GET==============");
            console.log("path:" + configPro.projectName + urls + "?" + jsonToString(pathMap));
            console.log("data:" + JSON.stringify(queryMap));
            console.log("bank:" + JSON.stringify(es));
            console.log("=============END==============");
            re = es;
        }
    });
    return re;
}

function getJsonObjLength(jsonObj) {
    var Length = 0;
    for (var item in jsonObj) {
        Length++;
    }
    return Length;
}

//post请求
function playPost(urls, pathMap, queryMap) {
    var re = "";
    $.ajax({
        url: configPro.projectName + urls + "?" + jsonToString(pathMap),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: queryMap,
        async: false,
        dataType: "json",
        success: function (as) {
            if (configPro.logger == 'debugger') {
                console.log("=============GET==============");
                console.log("path:" + configPro.projectName + urls + "?" + jsonToString(pathMap));
                console.log("data:" + JSON.stringify(queryMap));
                console.log("bank:" + JSON.stringify(as));
                console.log("=============END==============");
            }
            if (as.code != 200) {
                alr(as.msg);
            }
            re = as;
        },
        error: function (es) {
            console.log("=============GET==============");
            console.log("path:" + configPro.projectName + urls + "?" + jsonToString(pathMap));
            console.log("data:" + JSON.stringify(queryMap));
            console.log("bank:" + JSON.stringify(es));
            console.log("=============END==============");
            re = es;
        }
    });
    return re;
}

function playDelete(urls, pathMap, queryMap) {
    var re = "";
    $.ajax({
        url: configPro.projectName + urls + "?" + jsonToString(pathMap),
        type: "DELETE",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(queryMap),
        async: false,
        dataType: "json",
        success: function (as) {
            if (configPro.logger == 'debugger') {
                console.log("=============GET==============");
                console.log("path:" + configPro.projectName + urls + "?" + jsonToString(pathMap));
                console.log("data:" + JSON.stringify(queryMap));
                console.log("bank:" + JSON.stringify(as));
                console.log("=============END==============");
            }
            if (as.code != 200) {
                alr(as.msg);
            }
            re = as;
        },
        error: function (es) {
            console.log("=============GET==============");
            console.log("path:" + configPro.projectName + urls + "?" + jsonToString(pathMap));
            console.log("data:" + JSON.stringify(queryMap));
            console.log("bank:" + JSON.stringify(es));
            console.log("=============END==============");
            re = es;
        }
    });
    return re;
}

function playPut(urls, pathMap, queryMap) {
    var re = "";
    $.ajax({
        url: configPro.projectName + urls + "?" + jsonToString(pathMap),
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(queryMap),
        async: false,
        dataType: "json",
        success: function (as) {
            if (configPro.logger == 'debugger') {
                console.log("=============GET==============");
                console.log("path:" + configPro.projectName + urls + "?" + jsonToString(pathMap));
                console.log("data:" + JSON.stringify(queryMap));
                console.log("bank:" + JSON.stringify(as));
                console.log("=============END==============");
            }
            if (as.code != 200) {
                alr(as.msg);
            }
            re = as;
        },
        error: function (es) {
            console.log("=============GET==============");
            console.log("path:" + configPro.projectName + urls + "?" + jsonToString(pathMap));
            console.log("data:" + JSON.stringify(queryMap));
            console.log("bank:" + JSON.stringify(es));
            console.log("=============END==============");
            re = es;
        }
    });
    return re;
}

function treeTab(e, uri, col, done, wheres, toolbar, tool) {
    $(e).html("<table id='tab' lay-filter='tab'></table>");
    if (toolbar.length != 0) {
        $("#toolbarDemo .layui-btn-container").html("");
        for (var i = 0; i < toolbar.length; i++) {
            $("#toolbarDemo .layui-btn-container").append("<button class='layui-btn layui-btn-sm " + toolbar[i].clas + "' lay-event=" + toolbar[i].eve + ">" + toolbar[i].tit + "</button>");
        }
    }
    if (tool.length != 0) {
        $("#authoritiesTbBar").html("");
        for (var i = 0; i < tool.length; i++) {
            $("#authoritiesTbBar").append("<button class='layui-btn layui-btn-sm " + tool[i].clas + "' lay-event=" + tool[i].eve + ">" + tool[i].tit + "</button>");
        }
    }
    layui.config({
        version: "318",
        base: configPro.projectName + "/js/"
    }).use(['treeTable'], function () {
        var treeTable = layui.treeTable;
        var insTb = treeTable.render({
            elem: '#tab',
            url: uri
            , page: true //开启分页
            , limits: [10, 20, 60, 90, 100, 200, 1000]
            , toolbar: '#toolbarDemo'
            , parseData: function (res) {
                return {
                    "code": res.code,
                    "msg": res.data,
                    "count": res.num,
                    "data": res.data
                };
            }
            , where: wheres,
            tree: {
                iconIndex: 3,
                idName: 'id',
                pidName: 'parentId',
                isPidData: true
            },
            cols: [col],
            done: function (data) {
                new done(data);
            }
        });
        treeTable.on('toolbar(tab)', function (obj) {
            var checkStatus = insTb.checkStatus();//获取选中行状态
            for (var i = 0; i < toolbar.length; i++) {
                if (obj.event == toolbar[i].eve) {
                    new toolbar[i].fnc(checkStatus);
                }
            }
        });
        treeTable.on('tool(tab)', function (obj) {
            for (var i = 0; i < tool.length; i++) {
                if (obj.event == tool[i].eve) {
                    new tool[i].fnc(obj);
                }
            }
        });
    });
}

function bspVIEW(e, uri, title, wheres, toolbar, tool, dones) {
    $(e).html("<table id='tab' lay-filter='tab'></table>");
    if (toolbar.length != 0) {
        $("#toolbarDemo .layui-btn-container").html("");
        for (var i = 0; i < toolbar.length; i++) {
            $("#toolbarDemo .layui-btn-container").append("<button class='layui-btn layui-btn-sm " + toolbar[i].clas + "' lay-event=" + toolbar[i].eve + ">" + toolbar[i].tit + "</button>");
        }
    }
    if (tool.length != 0) {
        $("#authoritiesTbBar").html("");
        for (var i = 0; i < tool.length; i++) {
            $("#authoritiesTbBar").append("<button class='layui-btn layui-btn-sm " + tool[i].clas + "' lay-event=" + tool[i].eve + ">" + tool[i].tit + "</button>");
        }
    }
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#tab'
            , height: 'full-20'
            , url: uri //数据接口
            , toolbar: '#toolbarDemo'
            , contentType: "application/json"
            , method: "POST"
            , page: true //开启分页
            , cols: [title]
            , limits: [10, 20, 60, 90, 100, 200, 1000]
            , where: wheres
            , parseData: function (res) {
                res = new dones(res);
                return {
                    "code": res.code,
                    "msg": res.msg,
                    "count": res.num,
                    "data": res.data
                };
            }, done: function (res, curr, count) {

            }
            , loading: true
        });
        table.on('toolbar(tab)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id); //获取选中行状态
            for (var i = 0; i < toolbar.length; i++) {
                if (obj.event == toolbar[i].eve) {
                    new toolbar[i].fnc(checkStatus.data);
                }
            }
        });
        table.on('tool(tab)', function (obj) {
            for (var i = 0; i < tool.length; i++) {
                if (obj.event == tool[i].eve) {
                    new tool[i].fnc(obj);
                }
            }
        });
    });
}

//检测是否json
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
}

//公用弹出美化框
function alr(al) {
    setTimeout(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg(al, {zIndex: "99999999"});
        });
    }, 600);
}

function load() {
    layui.config({
        version: "318",
        // base: getProjectUrl() + "js/"
        base: configPro.projectName + "/js/"
    }).extend({
        steps: "steps",
        notice: "notice",
        cascader: "cascader",
        dropdown: "dropdown",
        fileChoose: "fileChoose",
        Split: "Split",
        Cropper: "Cropper",
        tagsInput: "tagsInput",
        citypicker: "city-picker",
        introJs: "introJs",
        zTree: "zTree",
        admin: "admin",
        index: "index"
    }).use(["layer", "admin", 'index'], function () {
        var b = layui.layer;
        var $ = layui.jquery, index = layui.index, admin = layui.admin;
    });
}

//获得表单值，以name=val组成json
function fromName(element) {
    var input = $(element).find("input");
    if (input.length == 0) {
        input = $(element).find("td");
    }
    var name = {};
    for (var i = 0; i < input.length; i++) {
        if (typeof $(input[i]).attr("name") == "undefined") {
            continue;
        }
        if ($(input[i]).val() != "" && $(input[i]).val() != null) {
            if ($(input[i]).attr("name").indexOf(".") >= 0) {
                var ds = $(input[i]).attr("name").split(".");
                var dk = {};
                dk[ds[1]] = $(input[i]).val();
                name[ds[0]] = dk;
            } else {
                name[$(input[i]).attr("name")] = $(input[i]).val();
            }
        }

    }

    var select = $(element).find("select");
    for (var i = 0; i < select.length; i++) {
        name[$(select[i]).attr("name")] = $(select[i]).val();
    }
    return name;
}

function fromNameNULL(element) {
    var input = $(element).find("input");
    if (input.length == 0) {
        input = $(element).find("td");
    }
    var name = {};
    for (var i = 0; i < input.length; i++) {
        if (typeof $(input[i]).attr("name") == "undefined") {
            continue;
        }
        if ($(input[i]).attr("name").indexOf(".") >= 0) {
            var ds = $(input[i]).attr("name").split(".");
            var dk = {};
            dk[ds[1]] = $(input[i]).val();
            name[ds[0]] = dk;
        } else {
            name[$(input[i]).attr("name")] = $(input[i]).val();
        }

    }

    var select = $(element).find("select");
    for (var i = 0; i < select.length; i++) {
        name[$(select[i]).attr("name")] = $(select[i]).val();
    }
    return name;
}

//检测邮箱
function checkEmail(str) {
    var re = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

//检测手机
function checkPhone(phone) {

    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        return false;
    } else {

        return true;
    }
}

//检测null
function checkNull(str) {
    if (str == null || str == '') {
        return true;
    } else {
        return false;
    }
}

//检查登录
function testLogin() {
    if (getCookie("token") == 'null' || getCookie("token") == "undefined" || getCookie("token") == "" || getCookie("token") == null) {
        window.location.href = "./vsp?code=1555508458588&error=未登录请登录";
    }
}

//弹出url错误参数
function msgError() {

    var error = new acquire().parameterMap['error'];

    if (error.length > 0) {

        layui.use('layer', function () {

            var layer = layui.layer;

            layer.msg(decodeURI(error));

        });

    }

}

//弹出url参数
function acquire() {

    this.parameter;

    this.parameterMap = {};

    this.test = function () {

        if (window.location.href.split("?") <= 0) {

            return null;

        } else {

            this.parameter = window.location.href.split("?")[1];

        }

    }

    this.packaging = function () {
        if (!this.parameter) {
            return false;
        }
        for (var i = 0; i < this.parameter.split("&").length; i++) {

            var name = this.parameter.split("&")[i].split("=")[0];

            var val = this.parameter.split("&")[i].split("=")[1];

            this.parameterMap[name] = val;

        }

    }

    this.test();

    this.packaging();

}

//
function managerView(code, e) {
    $(e).html(playJsp(code));
}

function review(code, name) {
    window.parent.xadmin.add_tab(name, './vsp?code=' + code);
}

//重新记载
function reload() {
    setTimeout(function () {
        window.location.reload();
    }, 1000);
}

//单项选择
function sure(e, i) {
    $(".zh").removeClass("zh");
    $(e).addClass("zh");
    /*var td = $(e).find("td");
    $(td[0]).find(".layui-unselect").addClass("layui-form-radioed");
    $(td[0]).find("i").addClass("layui-anim-scaleSpring");
    layui.table.cache.tab[i].LAY_CHECKED=true;*/
}

function sureDUO(e) {
    if ($(e).attr("class").indexOf("zh")) {
        $(e).removeClass("zh");
    } else {
        $(e).addClass("zh");
    }
}

//x-admin关闭当前页
function reClose() {
    setTimeout(function () {
        window.parent.$(".layui-tab-title .layui-this .layui-tab-close").click();
    }, 1000)
}

//x-admin关闭所有打开页
function reCloseAll() {
    setTimeout(function () {
        var li = window.parent.$(".layui-tab-title li");
        $(li[0]).find(".layui-tab-close").remove();
        window.parent.$(".layui-tab-title li .layui-tab-close").click();
    }, 1000)
}

//x-admin bug修复
function xb_refer() {
    /*setTimeout(function () {
        $.getScript('/' + configPro.projectName + '/js/xadmin.js', function () {
        });
    }, 500);*/
    layui.use('element', function () {
        var element = layui.element;
        element.init();
    });
}

function referFrom() {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}

function getCode(leng) {
    var timeNUM = (new Date().getTime()).toString();
    var a = timeNUM.split(""); //先拆分成数组
    var b = timeNUM.split("").reverse(); //再反转，但还是数组
    var c = timeNUM.split("").reverse().join("");//最后把数组变成字符串
    return c.substr(0, leng);
}

function GetDateStr(AddDayCount) {

    var dd = new Date();

    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期

    var y = dd.getFullYear();

    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0

    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0

    return y + "-" + m + "-" + d;

}

function getDete(type) {
    var date = new Date();
    switch (type) {
        case "y":
            return date.getFullYear();
            break;
        case "m":
            return date.getMonth() + 1;
            break;
        case "d":
            return date.getDate();
            break;
        case "r":
            return date.getTime();
            break;
        case "ym":
            return date.getFullYear() + "/" + (date.getMonth() + 1);
            break;
        case "ymd": {
            return date.getFullYear() + "-" + (date.getMonth() < 11 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
        }
            ;
            break;
        case "ymds":
            return date.toLocaleString();
            break;
        default:
            return "defind";
    }
}

function editBlur(e) {
    var va = $(e).val();
    $(e).parent().html(va);
}

function loadT() {
    $("#progress").show();
    setTimeout(function () {
        layui.use(['element', 'layer'], function () {
            var element = layui.element;
            element.progress('demo', "30%");
        });
    }, 100);
}

function closeLoad() {
    setTimeout(function () {
        layui.use(['element', 'layer'], function () {
            var element = layui.element;
            element.progress('demo', "100%");
            $("#progress").hide();
        });
    }, 200);
}

function getCheck(type) {
    var re = layui.table.cache.tab;
    if (re != null && re != "") {
        for (var i = 0; i < re.length; i++) {
            if (re[i].LAY_CHECKED == true) {
                switch (type) {
                    case "id": {
                        return i;
                    }
                        ;
                        break;
                    case "data": {
                        return re[i];
                    }
                        ;
                        break;
                }
            }
        }
        return false;
    }
}

function getChecks(type) {
    var re = layui.table.cache.tab;
    var rs = [];
    if (re != null && re != "") {
        for (var i = 0; i < re.length; i++) {
            if (re[i].LAY_CHECKED == true || re[i].LAY_CHECKED == 'true') {
                switch (type) {
                    case "id": {
                        rs.push(i);
                    }
                        ;
                        break;
                    case "data": {
                        rs.push(re[i]);
                    }
                        ;
                        break;
                }
            }
        }
        return rs;
    }
}

function alrYN(message, yes, no, xl, type) {
    layer.open({
        content: message
        , type: type
        , btn: ['确认', '取消']
        , yes: function (index, layero) {
            new yes();
            layer.closeAll();
        }
        , btn2: function (index, layero) {
            //按钮【按钮二】的回调
            new no();
            layer.closeAll();
            //return false 开启该代码可禁止点击该按钮关闭
        }
        , cancel: function () {
            //右上角关闭回调
            new xl();
            layer.closeAll();
            //return false 开启该代码可禁止点击该按钮关闭
        }
    });
}

function alrYN(message, yes, no, xl, title, type, area) {
    layui.use('admin', function () {
        var admin = layui.admin;
        admin.open({
            content: message
            , type: type
            , area: area
            , title: title
            , btn: ['确认', '取消']
            , yes: function (index, layero) {
                new yes();
                layer.closeAll();
            }
            , btn2: function (index, layero) {
                //按钮【按钮二】的回调
                new no();
                layer.closeAll();
                //return false 开启该代码可禁止点击该按钮关闭
            }
            , cancel: function () {
                //右上角关闭回调
                new xl();
                layer.closeAll();
                //return false 开启该代码可禁止点击该按钮关闭
            }
        });
    });
}

function reinitIframe(id) {
    var iframe = document.getElementById("test");
    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var height = Math.max(bHeight, dHeight);
        iframe.height = height;
        console.log(height);
    } catch (ex) {
    }
}

function whereJSON(e) {
    var rejson = [];
    var json = fromName(e);
    for (var key in json) {
        if (json[key] != "" && json[key] != null) {
            var iftime = key.split("_");
            if (iftime[iftime.length - 1] == "TIME") {
                var jobj = {};
                jobj['ZDNAME'] = key;
                jobj['ZDVAL'] = json[key];
                jobj['LIKE'] = "7";
                rejson.push(jobj);
            } else if (iftime[iftime.length - 1] == "END" && iftime[iftime.length - 2] == "TIME") {
                var jobj = {};
                jobj['ZDNAME'] = key.replace(/_END/g, "");
                jobj['ZDVAL'] = json[key];
                jobj['LIKE'] = "8";
                rejson.push(jobj);
            } else if (iftime[iftime.length - 1] == "IN") {
                var jobj = {};
                jobj['ZDNAME'] = key.replace(/IN/g, "");
                jobj['ZDVAL'] = json[key];
                jobj['LIKE'] = "9";
                rejson.push(jobj);
            } else {
                var jobj = {};
                jobj['ZDNAME'] = key;
                jobj['ZDVAL'] = json[key];
                jobj['LIKE'] = "0";
                rejson.push(jobj);
            }
        }
    }
    return rejson;
}

function bspNO(e, code, title, where, toolbar) {
    $(e).html("<table id='tabXX' lay-filter='tab'></table>");
    if (toolbar.length != 0) {
        $("#toolbarDemoXX .layui-btn-container").html("");
        for (var i = 0; i < toolbar.length; i++) {
            $("#toolbarDemoXX .layui-btn-container").append("<button class='layui-btn layui-btn-sm " + toolbar[i].clas + "' lay-event=" + toolbar[i].eve + ">" + toolbar[i].tit + "</button>");
        }
    }
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#tabXX'
            , height: 'full-20'
            , url: "/" + configPro.projectName + "/" + code //数据接口
            , method: "POST"
            , toolbar: '#toolbarDemoXX'
            , contentType: "application/json"
            , page: false //开启分页
            , cols: [title]
            , totalRow: true
            , parseData: function (res) { //res 即为原始返回的数据
                closeLoad();
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].LAY_CHECKED == 'false') {
                        res.data[i].LAY_CHECKED = false;
                    }
                    if (res.data[i].LAY_CHECKED == 'true') {
                        res.data[i].LAY_CHECKED = true;
                    }
                }
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.num, //解析数据长度
                    "data": res.data //解析数据列表
                };
            }, done: function () {
                var res = $(".layui-table").find("tr");
                for (var i = 0; i <= res.length; i++) {
                    (function (i) {
                        $(res[i]).attr("onclick", "sure(this," + i + ")");
                    })(i);
                }
                ;
            }
            , where: {
                common: where
            }
            , loading: true
        });
        table.on('toolbar(tab)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id); //获取选中行状态
            for (var i = 0; i < toolbar.length; i++) {
                if (obj.event == toolbar[i].eve) {
                    new toolbar[i].fnc(checkStatus.data);
                }
            }
        });
    });
}
