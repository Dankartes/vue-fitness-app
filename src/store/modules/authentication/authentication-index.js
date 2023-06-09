import mutations from './authentication-mutations.js'
import actions from './authentication-actions.js'
import getters from './authentication-getters.js'

export default {
    state() {
        return {
            userId: null,
            token: null,
        };
    },
    mutations,
    actions,
    getters
} 
