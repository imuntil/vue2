/**
 * Created by 斌 on 2017/3/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import cart from './modules/cart'
import address from './modules/address'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        cart,
        address,
        user,
    }
})