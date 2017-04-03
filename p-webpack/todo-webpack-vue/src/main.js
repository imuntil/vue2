/**
 * Created by 斌 on 2017/3/7.
 */
var Vue = require('../node_modules/vue/dist/vue');
var App = require('./App.vue');

var app = new Vue({
    el:'.todoapp',
    render: function (h) {
        console.log('render');
        return h(App);
    }
});