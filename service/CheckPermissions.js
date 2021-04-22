const permission = require('../config/Permissions');
const checkView = function (role, view) {
    if (permission[role].view.includes(view)) {
        return true;
    } else {
        return false;
    }
};
const checkApi = function (role, api) {
    if (permission[role].api.includes(api)) {
        return true;
    } else {
        return false;
    }
};
module.exports = {checkView, checkApi}