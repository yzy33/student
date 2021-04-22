require(['jquery', 'cookie', 'app', "lay", "base64"], function ($) {
    require(['vue'], function (Vue) {
        var dic = new Vue({
            el: ".vue-box"
            , data: {
                where: {},
                userInfo: ""
            }
            , created: function () {
                this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
                this.loadPage();
            }
            , methods: {
                loadPage: function () {
                    load();
                    if(this.userInfo.role ==='teacher'){
                        let gradeIds = [];
                        let course = playPost("course/findPage", "", JSON.stringify({
                            page: 1,
                            limit: 100000,
                            common: {teacherId: this.userInfo.userId}
                        })).data;
                        for(let i=0;i<course.length;i++){
                            gradeIds.push(course[i].gradeId);
                        }
                        let users = playPost("user/findPage", "", JSON.stringify({
                            page: 1,
                            limit: 100000,
                            common: {gradeId: gradeIds}
                        })).data;
                        let userIds = [];
                        for(let i=0;i<users.length;i++){
                            userIds.push(users[i].userId);
                        }
                        this.where['userId']=userIds;
                    }
                    var toolbar = [];
                    var tool = [];
                    if(this.userInfo.role !='user'){
                        tool.push({
                            "clas": "layui-btn-danger",
                            "eve": "UPDATE",
                            "tit": "删除",
                            "fnc": function (data) {
                                alr(playPost("scoure/del", "", JSON.stringify(data.data)).msg);
                                window.location.reload();
                            }
                        });
                    }
                    bspVIEW($("#authoritiesTable"), "/scoure/findPage", [
                        {type: 'checkbox'},
                        {type: 'numbers'},
                        {
                            templet: '<p>{{d.courses.courseName}}</p>',
                            align: 'center',
                            width: 100,
                            title: '课程名称'
                            , minWidth: 120
                        },
                        {
                            templet: '<p>{{d.user.nickName}}</p>',
                            align: 'center',
                            width: 100,
                            title: '姓名'
                            , minWidth: 120
                        },
                        {field: 'course', title: '分数', minWidth: 120},
                        {title: '操作', toolbar: '#authoritiesTbBar', align: 'center', minWidth: 120}
                    ], {common: this.where}, toolbar, tool, function (res) {
                        res.data.forEach(item => {
                            item["user"] = playPost("user/findPage", "", JSON.stringify({
                                page: 1,
                                limit: 10,
                                common: {userId: item.userId}
                            })).data[0];
                            item["courses"] = playPost("course/findPageNo", "", JSON.stringify({
                                page: 1,
                                limit: 10,
                                common: {courseId: item.courseId}
                            })).data[0];
                        });
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

                }
                ,
                openAdd: function () {
                    alrYN($("#admins"), function () {
                        var jon = dic.that;
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

                    }, "保存分数", 1, ["900px", "400px"]);
                }
                ,
                openWork: function () {
                    alrYN($("#admin1"), function () {
                        var jon = dic.thatWork;
                        var ret;
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