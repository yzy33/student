require(['jquery', 'cookie', 'app', "lay", "base64"], function ($) {
    require(['vue'], function (Vue) {
        var dic = new Vue({
            el: ".vue-box"
            , data: {
                where: {},
                that: {
                    courseId: "",
                    courseName: "",
                    teacherId: "",
                    gradeId: "",
                    _id: ""
                },
                thatWork: {
                    courseId: "",
                    workName: "",
                    gradeId: "",
                    teacherId: "",
                    workId: "",
                    _id: ""
                },
                userInfo: "",
                url: "",
                gradeList: [],
                teacherList: []
            }
            , created: function () {
                this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
                this.loadPage();
                this.teacherList = playPost("user/findPage", "", JSON.stringify({
                    page: 1,
                    limit: 10,
                    common: {role: "teacher"}
                })).data;
                this.gradeList = playPost("grade/findPage", "", JSON.stringify({
                    page: 1,
                    limit: 10,
                    common: {}
                })).data;
            }
            , methods: {
                loadPage: function () {
                    load();
                    var toolbar = [];
                    if (this.userInfo.role === 'admin') {
                        toolbar.push({
                            "clas": "layui-icon layui-icon-add-1",
                            "eve": "ADD",
                            "tit": "新增",
                            "fnc": function (data) {
                                dic.that.courseId = getCode(8);
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
                    }
                    if (this.userInfo.role === 'teacher') {
                        tool.push({
                            "clas": "",
                            "eve": "WORK",
                            "tit": "布置作业",
                            "fnc": function (data) {
                                dic.thatWork.courseId = data.data.courseId;
                                dic.thatWork.gradeId = data.data.gradeId;
                                dic.thatWork.teacherId = data.data.teacherId;
                                dic.thatWork.workId = getCode(5);
                                dic.openWork();
                            }
                        });
                    }
                    if (this.userInfo.role == 'admin') {
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "del",
                            "tit": "删除",
                            "fnc": function (data) {
                                alr(playPost("course/del", "", JSON.stringify(data.data)).msg);
                                window.location.reload();
                            }
                        });
                    }
                    if (this.userInfo.role == 'user') {
                        tool.push({
                            "clas": "layui-btn",
                            "eve": "xx",
                            "tit": "删除",
                            "fnc": function (data) {
                                var jon = data.data;
                                if(jon['userId']==''||jon['userId']==null){
                                    jon['userId']=new Array();
                                }
                                debugger;
                                jon['userId'].push(dic.userInfo.userId);
                                var ret = playPut("course/edit", "", jon);
                                alr(ret['msg']);
                            }
                        });
                    }
                    bspVIEW($("#authoritiesTable"), "/course/findPage", [
                        {type: 'checkbox'},
                        {type: 'numbers'},
                        {field: 'courseId', title: 'id', minWidth: 120},
                        {field: 'courseName', title: '课程名称', minWidth: 120},
                        {
                            templet: '<p>{{d.grade.gradeName}}</p>',
                            align: 'center',
                            width: 100,
                            title: '所属班级'
                            , minWidth: 120
                        },
                        {
                            templet: '<p>{{d.teacher.nickName}}</p>',
                            align: 'center',
                            width: 100,
                            title: '代课老师'
                            , minWidth: 120
                        },
                        {
                            templet: function(d){
                                if(d.isEnbend=="false"){
                                    return "选修";
                                }else{
                                    return "必修";
                                }
                            },
                            align: 'center',
                            width: 100,
                            title: '是否选修'
                            , minWidth: 120
                        },
                        {title: '操作', toolbar: '#authoritiesTbBar', align: 'center', minWidth: 240}
                    ], {common: this.where}, toolbar, tool, function (res) {
                        res.data.forEach(item => {
                            item["teacher"] = playPost("user/findPage", "", JSON.stringify({
                                page: 1,
                                limit: 10,
                                common: {userId: item.teacherId}
                            })).data[0];
                            debugger;
                            if(item.gradeId!="xx"){
                                item["grade"] = playPost("grade/findPage", "", JSON.stringify({
                                    page: 1,
                                    limit: 10,
                                    common: {gradeId: item.gradeId}
                                })).data[0];
                            }else{
                                item['grade']={
                                    "gradeName":""
                                }
                            }
                        })
                        return res;
                    });
                    layui.use('upload', function () {
                        var upload = layui.upload;

                        //执行实例
                        var uploadInst = upload.render({
                            elem: '#test1' //绑定元素
                            , url: '/upload-single/' //上传接口
                            , done: function (res) {
                                //上传完毕回调
                                dic.url = res.data.src;
                                alr("success");
                            },
                            accept: 'file'
                            , error: function () {
                                //请求异常回调
                            }
                        });
                    });
                }
                ,
                seachs: function () {
                    this.where = fromName($(".el-form"));
                    this.loadPage();
                }
                ,
                refer: function () {

                }
                ,
                openAdd: function () {
                    alrYN($("#admins"), function () {
                        var jon = dic.that;
                        var lay = $(".layui-this");
                        jon['teacherId']=$(lay[1]).attr("lay-value");
                        jon['gradeId']=$(lay[0]).attr("lay-value");
                        debugger;
                        var ret;
                        if (jon._id.length <= 0) {
                            delete jon._id;
                            ret = playPut("course/insert", "", jon);
                        } else {
                            ret = playPut("course/edit", "", jon);
                        }
                        alr(ret.msg);
                    }, function () {

                    }, function () {

                    }, "保存课程", 1, ["900px", "400px"]);
                }
                ,
                openWork: function () {
                    alrYN($("#admin1"), function () {
                        var jon = dic.thatWork;
                        var ret;
                        jon['url'] = dic.url;
                        if (jon._id.length <= 0) {
                            delete jon._id;
                            ret = playPut("work/insert", "", jon);
                        } else {
                            ret = playPut("work/edit", "", jon);
                        }
                        alr(ret.msg);
                    }, function () {

                    }, function () {

                    }, "保存作业", 1, ["900px", "400px"]);
                }
            }
        });
    })
});