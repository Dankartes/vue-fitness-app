export default {
  addMessage(state, payload) {
    state.messages.push(payload);
  },

  loadMessagesFirebase(state, payload) {
    state.messages = payload;
  },
};
