/**
 * Created by 斌 on 2017/3/14.
 */

import Vue from 'vue'
import config from './config'
import _ from 'lodash'
import {AJAX_RESPONSE_CODE, AJAX_RESPONSE_RESULT} from './constant'

const __get = function (url, params, notDeal) {
    return Vue.http.get(url, {params: params})
        .then(response => {
            let data = JSON.parse(response.body);
            if (notDeal) {
                return Promise.resolve(data);
            }
            if (+data[AJAX_RESPONSE_CODE] === 1) {
                return Promise.resolve(data[AJAX_RESPONSE_RESULT]);
            } else {
                return Promise.reject(data[AJAX_RESPONSE_RESULT]);
            }
        }, error => {
            console.info(error);
            return Promise.reject('出错了，请稍后重试');
        })
}
const __post = function (url, data) {
    return Vue.http.post(url, data)
        .then(response => {
            let data = JSON.parse(response.body);
            if (+data[AJAX_RESPONSE_CODE] === 1) {
                return Promise.resolve(data[AJAX_RESPONSE_RESULT]);
            } else {
                return Promise.reject(data[AJAX_RESPONSE_RESULT]);
            }
        }, error => {
            console.info(error);
            return Promise.reject('出错了，请稍后重试');
        })
}

export const productAndOrder = {
    /**
     * 查询我的订单
     * @param params {Object} [flag, orderstatus]
     */
    queryOrders(params) {
        return __get(config.path + 'selectOrderStatusOdr.action', params);
    }
}

export const user = {
    /**
     * 登录
     * @param params {object} [phone, password]
     */
    signIn(params) {
        return __get(config.path + 'loginUsersUsr.action', params);
    },
    /**
     * 注册
     * @param params {object} [nickname, phone, password]
     */
    login(params) {
        return __get(config.path + 'userRegsUsr.action', params);
    },
    /**
     * 获取验证码
     * @param params {object} [phone]
     */
    getCode(params) {
        return __get(config.path + 'resIdcodeSsm.action', params);
    },
    /**
     * 忘记密码
     * @param params {object} [phone, newpwd]
     */
    forget(params) {
        return __get(config.path + 'seluserPhoneUsr.action', params);
    },
    logout() {

    },
    /**
     * 修改昵称
     * @param params {object} [phone, nickname]
     */
    modifyNick(params) {
        return __get(config.path + 'updatenicknameUsr.action', params);
    },
    /**
     * 修改密码
     * @param params {object} [phone, newpwd, oldpwd]
     */
    modifyPw(params) {
        return __get(config.path + 'updatepwdrUsr.action', params);
    },
    /**
     * 修改头像
     * @param params {object} [phone, imgfile(string or base64)]
     */
    modifyAvatar(params) {
        return __post(config.path + 'uploadImgUsr.action', params);
    },
    /**
     * 查询手机号是否注册
     * @param params {object} [phone]
     */
    validatePhone(params) {
        return __get(config.path + 'seluserPhoneUsr.action', params, true);
    },
}

export function query(url, params) {
    if (config.dev) {
        if (!params.flag) {
            return new Promise((resolve, reject) => {
                resolve(_.filter(config.testData, {id: +params.id}))
            })
        }
        return new Promise((resolve, reject) => {
            resolve(config.testData);
        });
    }
    return Vue.http.get(config.path + url, params);
}

