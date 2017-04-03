/**
 * Created by 斌 on 2017/3/9.
 */

//base
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Toasted from 'vue-toasted'
import VeeValidate from 'vee-validate'

import {router} from './routes'
import store from './javascripts/store/index'
import {currency} from './javascripts/filters/custom-filter'
import custom from './javascripts/validate/custom-validate'

import {USER_LOCAL_USER_A} from './javascripts/constant'

Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Toasted);

VeeValidate.Validator.extend('phone', custom.phone);
Vue.http.options.emulateJSON = true;

Vue.filter('currency', currency);

const app = new Vue({
    store,
    router,
    created() {
        this.$store.dispatch(USER_LOCAL_USER_A);
    }
}).$mount('#app');

