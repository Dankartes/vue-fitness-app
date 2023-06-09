export default {

    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.logOutExecuted = false;
    },
    logOutExecuted(state){
      state.logOutExecuted = true;
    }


}