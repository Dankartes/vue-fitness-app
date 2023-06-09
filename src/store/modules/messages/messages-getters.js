export default {

    getMessages(state, _, _2, rootGetters) {
        const trainerId = rootGetters.userId;
        return state.messages.filter(msg => msg.trainerId === trainerId);
    },



    hasMessages(_, getters) {
        if (getters.getMessages && getters.getMessages.length > 0)
            return true;
        else return false;
    }

}