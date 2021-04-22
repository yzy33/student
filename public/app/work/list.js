require(['jquery', 'cookie', 'app', "lay", "base64"], function ($) {
    require(['vue'], function (Vue) {
        var dic = new Vue({
            el: ".vue-box"
            , data: {
                where: {},
                userInfo: "",
                thatWork:"",
                url:"",
                wo:[]
            }
            , created: function () {
                this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
                this.loadPage();
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
            , methods: {
                loadPage: function () {
                    load();
                    var toolbar = [];
                    var tool = [];
                    if (this.userInfo.role != 'user') {
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "UPDATE",
                            "tit": "删除",
                            "fnc": function (data) {
                                alr(playPost("work/del", "", JSON.stringify(data.data)).msg);
                                window.location.reload();
                            }
                        });
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "x",
                            "tit": "学生作业",
                            "fnc": function (data) {
                                dic.wo=data.data.user;
                                alrYN($("#admin2"), function () {

                                }, function () {

                                }, function () {

                                }, "查看作业", 1, ["900px", "400px"]);
                            }
                        });
                    }
                    if (this.userInfo.role == 'user') {
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "AT",
                            "tit": "上传作业",
                            "fnc": function (data) {
                                dic.thatWork=data.data;
                                dic.openWork();
                            }
                        });
                    }
                    bspVIEW($("#authoritiesTable"), "/work/findPage", [
                        {type: 'checkbox'},
                        {type: 'numbers'},
                        {field: 'workId', title: 'id', minWidth: 120},
                        {field: 'workName', title: '作业名称', minWidth: 120},
                        {
                            templet: '<p>{{d.course.courseName}}</p>',
                            align: 'center',
                            width: 100,
                            title: '所属课程'
                            , minWidth: 120
                        },
                        {
                            templet: '#url',
                            align: 'center',
                            width: 100,
                            title: '附件'
                            , minWidth: 120
                        },
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
                        {title: '操作', toolbar: '#authoritiesTbBar', align: 'center', minWidth: 120}
                    ], {common: this.where}, toolbar, tool, function (res) {
                        res.data.forEach(item => {
                            item["teacher"] = playPost("user/findPage", "", JSON.stringify({
                                page: 1,
                                limit: 10,
                                common: {userId: item.teacherId}
                            })).data[0];
                            item["grade"] = playPost("grade/findPage", "", JSON.stringify({
                                page: 1,
                                limit: 10,
                                common: {gradeId: item.gradeId}
                            })).data[0];
                            item["course"] = playPost("course/findPage", "", JSON.stringify({
                                page: 1,
                                limit: 10,
                                common: {courseId: item.courseId}
                            })).data[0];
                        })
                        return res;
                    });
                }
                ,
                seachs: function () {
                    this.where = fromName($(".el-form"));
                    this.loadPage();
                }
                ,
                refer: function () {

                },
                openWork: function () {
                    alrYN($("#admin1"), function () {
                        var jon = dic.thatWork;
                        var ret;
                        if(jon['user']==''||jon['user']==null){
                            jon['user']=new Array();
                        }
                        var ut = {
                            userId:dic.userInfo.userId,
                            url:dic.url,
                            username:dic.userInfo.username
                        }
                        jon['user'].push(ut);
                        ret = playPut("work/edit", "", jon);
                        alr(ret.msg);
                    }, function () {

                    }, function () {

                    }, "保存作业", 1, ["900px", "400px"]);
                }
            }
        });
    })
});