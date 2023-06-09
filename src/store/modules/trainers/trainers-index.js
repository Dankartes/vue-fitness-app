import mutations from './trainers-mutations.js';
import actions from './trainers-actions.js';
import getters from './trainers-getters.js';

export default {
  namespaced: true,

  state() {
    return {
      lastLoad: null,
      trainers: []
    };
  },
  mutations,
  actions,
  getters
}