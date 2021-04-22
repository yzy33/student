require(['jquery', 'cookie', 'app', "lay", "base64"], function ($) {
    require(['vue'], function (Vue) {
        var dic = new Vue({
            el: ".vue-box"
            , data: {
                where: {},
                that: {
                    gradeId: "",
                    gradeName: "",
                    site: "",
                    _id: ""
                },
                userInfo:{}
            }
            , created: function () {
                this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
                this.loadPage();
            }
            , methods: {
                loadPage: function () {
                    load();
                    var toolbar = [];
                    toolbar.push({
                        "clas": "layui-icon layui-icon-add-1",
                        "eve": "ADD",
                        "tit": "新增",
                        "fnc": function (data) {
                            dic.that.gradeId = getCode(8);
                            dic.openAdd();
                        }
                    });
                    var tool = [];
                    tool.push({
                        "clas": "layui-btn-danger",
                        "eve": "UPDATE",
                        "tit": "修改",
                        "fnc": function (data) {
                            dic.that = data.data;
                            dic.openAdd();
                        }
                    });
                    if (this.userInfo.role != 'user') {
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "del",
                            "tit": "删除",
                            "fnc": function (data) {
                                alr(playPost("grade/del", "", JSON.stringify(data.data)).msg);
                                window.location.reload();
                            }
                        });
                    }
                    bspVIEW($("#authoritiesTable"), "/grade/findPage", [
                        {type: 'checkbox'},
                        {type: 'numbers'},
                        {field: 'gradeId', title: 'id', minWidth: 120},
                        {field: 'gradeName', title: '班级名称', minWidth: 120},
                        {field: 'site', title: '班级地址', minWidth: 120},
                        {title: '操作', toolbar: '#authoritiesTbBar', align: 'center', minWidth: 240}
                    ], {common: this.where}, toolbar, tool, function (res) {
                        return res;
                    });
                },
                seachs: function () {
                    this.where = fromName($(".el-form"));
                    this.loadPage();
                },
                refer: function () {

                },
                openAdd: function () {
                    alrYN($("#admins"), function () {
                        var jon = dic.that;
                        var ret;
                        if (jon._id.length <= 0) {
                            delete jon._id;
                            ret = playPut("grade/insert", "", jon);
                        } else {
                            ret = playPut("grade/edit", "", jon);
                        }
                        alr(ret.msg);
                    }, function () {

                    }, function () {

                    }, "保存班级", 1, ["900px", "400px"]);
                }
            }
        });
    })
});