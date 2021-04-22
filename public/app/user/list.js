require(['jquery', 'cookie', 'app', "lay", "base64"], function ($) {
    require(['vue'], function (Vue) {
        var dic = new Vue({
            el: ".vue-box"
            , data: {
                userInfo: "",
                where: {},
                that: {
                    userId: "",
                    username: "",
                    nickName: "",
                    password: "",
                    gradeId: "",
                    role: "",
                    sex: "",
                    age: "",
                    _id: ""
                },
                thatScoure: {
                    courseId: "",
                    userId: "",
                    course: "",
                    _id: ""
                },
                courseList:[],
                gradeList:[]
            }
            , created: function () {
                this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
                this.loadPage();
                this.courseList = playPost("course/findPage", "", JSON.stringify({
                    page: 1,
                    limit: 100,
                    common: {}
                })).data;
                this.gradeList = playPost("grade/findPage", "", JSON.stringify({
                    page: 1,
                    limit: 100,
                    common: {}
                })).data;
            }
            , methods: {
                loadPage: function () {
                    load();
                    if (this.userInfo.role === 'teacher') {
                        let gradeIds = [];
                        let course = playPost("course/findPage", "", JSON.stringify({
                            page: 1,
                            limit: 100000,
                            common: {teacherId: this.userInfo.userId}
                        })).data;
                        for (let i = 0; i < course.length; i++) {
                            gradeIds.push(course[i].gradeId);
                        }
                        this.where['gradeId'] = gradeIds;
                    }
                    var toolbar = [];
                    if (this.userInfo.role === 'admin') {
                        toolbar.push({
                            "clas": "layui-icon layui-icon-add-1",
                            "eve": "ADD",
                            "tit": "新增",
                            "fnc": function (data) {
                                dic.that.userId = getCode(8);
                                dic.openAdd();
                            }
                        });
                    }

                    var tool = [];
                    if (this.userInfo.role === 'admin') {
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "UPDATE",
                            "tit": "修改",
                            "fnc": function (data) {
                                dic.that = data.data;
                                dic.openAdd();
                            }
                        });
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "DELETE",
                            "tit": "禁用",
                            "fnc": function (data) {
                                var jon = data.data;
                                jon["status"] = "false";
                                var ret = playPut("user/edit", "", jon);
                                alr(ret.msg);
                            }
                        });
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "BEING",
                            "tit": "启用",
                            "fnc": function (data) {
                                var jon = data.data;
                                jon["status"] = "true";
                                var ret = playPut("user/edit", "", jon);
                                alr(ret.msg);
                            }
                        });
                    }
                    if (this.userInfo.role === 'teacher') {
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "UPDATE",
                            "tit": "打分",
                            "fnc": function (data) {
                                dic.thatScoure.userId = data.data.userId;
                                dic.openDF();
                            }
                        });
                    }
                    if(this.userInfo.role =='admin') {
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "del",
                            "tit": "删除",
                            "fnc": function (data) {
                                alr(playPost("user/del", "", JSON.stringify(data.data)).msg);
                                window.location.reload();
                            }
                        });
                    }
                    bspVIEW($("#authoritiesTable"), "/user/findPage", [
                        {type: 'checkbox'},
                        {type: 'numbers'},
                        {field: 'userId', title: 'id', minWidth: 120},
                        {field: 'username', title: '登录名', minWidth: 120},
                        {field: 'nickName', title: '姓名', minWidth: 120},
                        {field: 'password', title: '密码', minWidth: 120},
                        {field: 'role', title: '角色', minWidth: 120},
                        {field: 'sex', title: '性别', minWidth: 120},
                        {field: 'age', title: '年龄', minWidth: 120},
                        {
                            templet: '<p>{{# if(d.status=="false"){ }} 禁用 {{# } }}{{# if(d.status=="true"||!("status" in d) ){ }} 启用 {{# } }}</p>',
                            align: 'center',
                            width: 100,
                            title: '状态'
                            , minWidth: 120
                        },
                        {
                            templet: '<p>{{d.grade.gradeName}}</p>',
                            align: 'center',
                            width: 100,
                            title: '所属班级'
                            , minWidth: 120
                        },
                        {title: '操作', toolbar: '#authoritiesTbBar', align: 'center', minWidth: 240}
                    ], {common: this.where}, toolbar, tool, function (res) {
                        res.data.forEach(item => {
                            if (item.gradeId.length > 0) {
                                item["grade"] = playPost("grade/findPage", "", JSON.stringify({
                                    page: 1,
                                    limit: 10,
                                    common: {gradeId: item.gradeId}
                                })).data[0];
                            } else {
                                item["grade"] = {
                                    gradeName: ""
                                }
                            }
                        });
                        return res;
                    });
                },
                seachs: function () {
                    this.where = fromName($(".el-form"));
                    this.loadPage();
                },
                refer: function () {

                },
                openDF: function () {
                    alrYN($("#admins1"), function () {
                        var jon = dic.thatScoure;
                        var ret;
                        var lay = $(".layui-this");
                        jon['courseId']=$(lay[1]).attr("lay-value");;
                        if (jon._id.length <= 0) {
                            delete jon._id;
                            ret = playPut("scoure/insert", "", jon);
                        } else {
                            ret = playPut("scoure/edit", "", jon);
                        }
                        alr(ret.msg);
                    }, function () {

                    }, function () {

                    }, "打分", 1, ["900px", "400px"]);
                },
                openAdd: function () {
                    alrYN($("#admins"), function () {
                        var jon = dic.that;
                        var ret;
                        jon["sex"] = $(".layui-form-radioed").find("div").text();
                        var lay = $(".layui-this");
                        jon['gradeId']=$(lay[1]).attr("lay-value");;

                        if (jon._id.length <= 0) {
                            delete jon._id;
                            ret = playPut("user/insert", "", jon);
                        } else {
                            ret = playPut("user/edit", "", jon);
                        }
                        alr(ret.msg);
                    }, function () {

                    }, function () {

                    }, "保存用户", 1, ["900px", "400px"]);
                }
            }
        });
    })
});