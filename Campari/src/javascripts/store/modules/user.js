/**
 * Created by 斌 on 2017/3/27.
 */
import tools from '../../common-tools'
import _ from 'lodash'
import {user} from '../../services'
import * as type from '../../constant'

const key = type.THE_USER_KEY;
export default {
    state:{
        user:undefined,
        loginTemData:{phone:undefined, code:undefined},
    },
    mutations:{
        [type.USER_LOCAL_USER_M](state) {
            state.user = tools.Ls.getValue(key) || undefined;
        },
        [type.USER_SET_USER_M](state, user) {
            state.user = _.assign(state.user, user);
            tools.Ls.putValue(key, user);
        },
        [type.USER_MODIFY_AVATAR_M](state, avatar) {
            state.user.avatar = avatar;
            state.user.imgname = avatar;
            tools.Ls.putValue(key, state.user);
        },
        [type.USER_SAVE_PHONE_CODE_M](state, data) {
            state.user.loginTemData = data;
        },
        [type.USER_DELETE_PHONE_CODE_M](state) {
            state.user.loginTemData = {};
        }
    },
    actions:{
        [type.USER_LOCAL_USER_A](context) {
            context.commit(type.USER_LOCAL_USER_M);
            if (context.state.user) {
                context.commit(type.CART_FETCH_CART);
                context.commit(type.ADR_FETCH_ADDRESSES);
            }
        },
        [type.USER_SET_USER_A](context, user) {
            context.commit(type.USER_SET_USER_M, user);
            context.commit(type.CART_FETCH_CART);
            context.commit(type.ADR_FETCH_ADDRESSES);
        },
        [type.USER_MODIFY_AVATAR_A](context, avatar) {
            //ajax
            context.commit(type.USER_MODIFY_AVATAR_M, avatar);
        }
    },
    getters:{
        [type.USER_INFO](state) {
            return state.user;
        }
    }
}