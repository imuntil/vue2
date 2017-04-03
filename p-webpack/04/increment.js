/**
 * Created by 斌 on 2017/3/6.
 */
var add = require('./math').add;
exports.increment = function(val) {
    return add(val, 1);
};