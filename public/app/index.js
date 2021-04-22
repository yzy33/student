require(['jquery', 'cookie', 'app'], function ($) {
    require(['vue'], function (Vue) {
        var dic = new Vue({
            el: ".vue-box"
            , data: {
                menu: [],
                that: {
                    nickName: "",
                    password: "",
                },
                thatUser: {}
            }
            , created: function () {
                this.thatUser = JSON.parse(localStorage.getItem("userInfo"));
                this.menu = playGet("menu").data;
                this.loadPage();
            }
            , methods: {
                loadPage: function () {
                    load();
                    layui.use(["layer", "admin", 'index'], function () {
                        var b = layui.layer;
                        var $ = layui.jquery, index = layui.index, admin = layui.admin;
                        admin.changeTheme(localStorage.getItem("theme"));
                        // 默认加载主页
                        index.loadHome({
                            menuPath: 'https://www.baidu.com',
                            menuName: '<i class="layui-icon layui-icon-home"></i>'
                        })
                    })
                },
                loginOut: function () {
                    window.location.href = "/user/loginout";
                },
                openAdd: function () {
                    this.that = JSON.parse(localStorage.getItem("userInfo"));
                    alrYN($("#admins"), function () {
                        var jon = dic.that;
                        var ret = playPost("user/edit", "", JSON.stringify(jon));
                        alr(ret.msg);
                    }, function () {

                    }, function () {

                    }, "修改信息", 1, ["600px", "350px"]);
                }
            }
        });
    })
});