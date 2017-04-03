/**
 * Created by 斌 on 2017/3/25.
 */

import tools from '../../common-tools'
import _ from 'lodash'
import * as type from '../../constant'

const key = type.THE_CART_KEY
export default {
    state: {
        all:[], //购物车
        pro:{}  //立即购买
    },
    mutations: {
        [type.CART_FETCH_CART](state) {
            state.all = tools.Ls.getValue(key) || [];

        },
        [type.CART_ADD_ITEM](state, item) {
            let index = _.findIndex(state.all, {id: item.id});
            if  (index === -1) {
                Object.assign(item, {count:1, chosen:true});
                state.all.push(item);
            } else {
                state.all[index].count += 1;
            }
            tools.Ls.putValue(key, state.all);
        },
        [type.CART_EDIT_COUNT](state, payload) {
            let index = _.findIndex(state.all, {id: payload.id});
            let item = state.all[index];
            if (payload.method === '+') {
                item.count++;
            } else {
                if (item.count > 1) {
                    item.count--;
                }
            }
            tools.Ls.putValue(key, state.all);
        },
        [type.CART_CHOOSE](state, item) {
            let index = _.findIndex(state.all, {id: item.id});
            let _item = state.all[index];
            _item.chosen = !_item.chosen;
            tools.Ls.putValue(key, state.all);
        },
        [type.CART_DELETE_ITEM](state, item) {
            let index = _.findIndex(state.all, {id: item.id});
            state.all.splice(index, 1);
            tools.Ls.putValue(key, state.all);
        },
        //全选
        [type.CART_CHOOSE_ALL](state, payload) {
            _.forEach(state.all, item => {
                item.chosen = payload;
            });
        },


        //立即购买
        [type.CART_ADD_BUY_NOW](state, item) {
            state.pro = Object.assign(item, {count: 1});
        }
    },
    getters:{
        [type.CART_ALL](state) {
            return state.all;
        },
        //是否全选
        [type.CART_ALL_CHOSEN](state) {
            return _.every(state.all, 'chosen');
        },
        //购物车中已选中商品的总金额
        [type.CART_THE_MONEY](state, getters) {
            let money = 0;
            _.forEach(getters[type.CART_THE_CHOSEN], item => {
                money += item.count * item.proprice;
            });
            return money;
        },
        //购物车中选中的所有商品
        [type.CART_THE_CHOSEN](state) {
            return _.filter(state.all, item => {
                return item.chosen
            })
        },

        test() {
            return 'test'
        },


        //立即购买
        [type.CART_THE_PRO](state) {
            return state.pro;
        }
    }
}