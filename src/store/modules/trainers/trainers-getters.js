export default {

    getTrainers(state) {
        return state.trainers;
    },

    hasTrainers(state) {
        if (state.trainers && state.trainers.length > 0)
            return true;
        else return false;
    },

    isTrainer(_1, getters, _2, rootGetters) {
        const trainers = getters.getTrainers;
        const userId = rootGetters.userId;
        return trainers.some(trainer => trainer.id === userId);
    },


    shouldUpdateLoad(state) {
        const lastLoad = state.lastLoad;
        if (!lastLoad)
            return true;

        const currentTime = new Date().getTime();
        const twoMinPassed = (currentTime - lastLoad) / 100 > 120;
        return twoMinPassed;

    },

    currentTrainer(_1, getters, _2, rootGetters) {
        const trainers = getters.getTrainers;
        const userId = rootGetters.userId;
        const val = trainers.filter(coach => coach.id === userId)[0];
        if (val)
            return val;

    }

};