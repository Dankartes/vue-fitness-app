import mutations from './messages-mutations.js';
import actions from './messages-actions.js';
import getters from './messages-getters.js'


export default {
    namespaced: true,

    state() {
        return {
          messages: []
        };
    },
    mutations,
    actions,
    getters


};