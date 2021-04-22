const permissions = {
    user: {
        api: [
            "login", "menu", "user/edit"
        ],
        view: [
            "login", "index", "fileChoose", "tpl-note", "tpl-theme", "course/list", "work/list","user/list","scource/list"
        ],
        menu: [
            {
                "id": "1",
                "name": "我的课程",
                "uri": "/view/course/list",
                "icon": "layui-icon layui-icon-key",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "2",
                "name": "所有作业",
                "uri": "/view/work/list",
                "icon": "layui-icon layui-icon-set",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "5",
                "name": "所有成绩",
                "uri": "/view/scource/list",
                "icon": "layui-icon layui-icon-template-1",
                "series": 1,
                "parentId": "",
                "orders": 0
            }
        ]
    },
    teacher: {
        api: [
            "login", "menu"
        ],
        view: [
            "login", "index", "fileChoose", "tpl-note", "tpl-theme", "course/list", "work/list","user/list","scource/list"
        ],
        menu: [
            {
                "id": "1",
                "name": "我的课程",
                "uri": "/view/course/list",
                "icon": "layui-icon layui-icon-key",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "2",
                "name": "所有作业",
                "uri": "/view/work/list",
                "icon": "layui-icon layui-icon-set",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "4",
                "name": "我的学生",
                "uri": "/view/user/list",
                "icon": "layui-icon layui-icon-template-1",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "5",
                "name": "所有成绩",
                "uri": "/view/scource/list",
                "icon": "layui-icon layui-icon-template-1",
                "series": 1,
                "parentId": "",
                "orders": 0
            }
        ]
    },
    admin: {
        api: [
            "login", "menu", "user/edit", "grade/insert", "grade/findPage", "grade/edit", "user/insert", "user/findPage", "user/edit"
        ],
        view: [
            "login", "index", "fileChoose", "tpl-note", "tpl-theme", "grade/list", "user/list", "course/list", "work/list","scource/list"
        ],
        menu: [
            {
                "id": "1",
                "name": "班级管理",
                "uri": "/view/grade/list",
                "icon": "layui-icon layui-icon-set",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "2",
                "name": "课程管理",
                "uri": "/view/course/list",
                "icon": "layui-icon layui-icon-key",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "4",
                "name": "用户管理",
                "uri": "/view/user/list",
                "icon": "layui-icon layui-icon-template-1",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "5",
                "name": "作业管理",
                "uri": "/view/work/list",
                "icon": "layui-icon layui-icon-set",
                "series": 1,
                "parentId": "",
                "orders": 0
            },
            {
                "id": "6",
                "name": "所有成绩",
                "uri": "/view/scource/list",
                "icon": "layui-icon layui-icon-template-1",
                "series": 1,
                "parentId": "",
                "orders": 0
            }
        ]
    }
};
module.exports = permissions;