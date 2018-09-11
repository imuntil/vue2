import Vue from 'vue';
import Vuex from 'vuex';
import count from './module/count';
import other from './module/other';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    count,
    other,
  },
});
