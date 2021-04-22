var configPro = {};
configPro.projectName = "http://localhost:3000/";
configPro.projectID = 1000;
configPro.server_img_interface = configPro.projectName + "common/upload?project=" + configPro.projectID;
configPro.server_img_interfacefr = configPro.projectName + "common/uploadsWang";
configPro.server_img_view = configPro.projectName+"common/file/";
configPro.logger = "debugger";
require.config({
    map: {
        '*': {
            css: configPro.projectName + "/js/css.js",
        }
    },
    paths: {
        jquery: configPro.projectName + "/js/jquery-3.3.1.min",
        cookie: configPro.projectName + "/js/jquery.cookie",
        app: configPro.projectName + "/js/appactions",
        vue: configPro.projectName + "/js/vue",
        lay: [configPro.projectName + "/layui/layui"],
        wangEditor: [configPro.projectName + "/js/wangEditor"],
        "jquery-ui": [configPro.projectName + "/js/jquery-ui"],
        "base64": [configPro.projectName + "/js/base64"],
        "getIP": "https://pv.sohu.com/cityjson?ie=utf-8",
        "jsPdf": "https://cdn.bootcdn.net/ajax/libs/jspdf/1.5.3/jspdf.debug",
        "cans": "https://cdn.bootcdn.net/ajax/libs/html2canvas/0.5.0-beta4/html2canvas"
    },
    shim: {
        lay: {
            deps: ["css!" + configPro.projectName + "/layui/css/layui.css", "css!" + configPro.projectName + "/css/admin.css"]
        },
        vue: {
            exports: 'Vue'
        },
        wangEditor: {
            deps: ["css!" + configPro.projectName + "/css/wangEditor.css"]
        }
    }
});