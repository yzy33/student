/** EasyWeb iframe v3.1.7 date:2020-03-11 License By http://easyweb.vip */
layui.config({
    version: "318",
    // base: getProjectUrl() + "js/"
    base: configPro.projectName+"js/"
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
}).use(["layer", "admin"], function () {
    var c = layui.jquery;
    var b = layui.layer;
    var a = layui.admin
    c.
});

function getProjectUrl() {
    var c = layui.cache.dir;
    if (!c) {
        var e = document.scripts,
            b = e.length - 1,
            f;
        for (var a = b; a > 0; a--) {
            if (e[a].readyState === "interactive") {
                f = e[a].src;
                break
            }
        }
        var d = f || e[b].src;
        c = d.substring(0, d.lastIndexOf("/") + 1)
    }
    return c.substring(0, c.indexOf("assets"))
};