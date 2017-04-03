/**
 * Created by 斌 on 2017/3/25.
 */

import tools from '../../common-tools'
import _ from 'lodash'
import * as type from '../../constant'

const key = type.THE_ADDRESS_KEY
export default {
    state:{
        all:[],
        chosenAdr:{},
        defaultAdr:{},
        editingAdr:{},
    },
    mutations:{
        [type.ADR_FETCH_ADDRESSES](state) {
            state.all = tools.Ls.getValue(key) || [];
            state.defaultAdr = _.find(state.all, 'isDefault') || {};
            state.chosenAdr = _.find(state.all, 'chosen') || state.defaultAdr || {};
        },
        [type.ADR_ADD_ADDRESS](state, adr) {
            state.all.push(adr);
            tools.Ls.putValue(key, state.all);
        },
        [type.ADR_EDIT_ADDRESS](state, adr) {
            let index = _.findIndex(state.all, {id: adr.id});
            try {
                let _adr = state.all[index];
                _adr = Object.assign(_adr, adr);
                tools.Ls.putValue(key, state.all);
            } catch (e) {
                console.error(e);
            }
        },

        [type.ADR_DELETE_ADDRESS](state, adr) {
            let index = _.findIndex(state.all, {id: adr.id});

            try {
                if (adr.id === state.chosenAdr.id) {
                    state.chosenAdr = state.defaultAdr || {};
                    state.chosenAdr.id && (state.chosenAdr.chosen = 1);
                }

                state.all.splice(index, 1);
                tools.Ls.putValue(key, state.all);
            } catch (e) {
                console.error(e)
            }
        },

        [type.ADR_SET_DEFAULT_ADDRESS](state, adr) {
            _.forEach(state.all, _adr => {
                _adr.isDefault = 0;
                if (+adr.id === +_adr.id) {
                    _adr.isDefault = 1;
                    state.defaultAdr = _adr;
                }
            });
            tools.Ls.putValue(key, state.all);
        },
        [type.ADR_SET_CHOSEN_ADDRESS](state, adr) {
            _.forEach(state.all, _adr => {
                _adr.chosen = 0;
                if (+adr.id === +_adr.id) {
                    _adr.chosen = 1;
                    state.chosenAdr = _adr;
                }
            })
            tools.Ls.putValue(key, state.all);
        },
        [type.ADR_SET_EDIT_ADDRESS](state, adr) {
            state.editingAdr = adr;
        }
    },
    actions:{

    }
}