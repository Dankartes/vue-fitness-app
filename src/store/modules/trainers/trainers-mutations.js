export default {
  addTrainer(state, payload) {
    state.trainers.push(payload);
  },
  loadTrainersFirebase(state, payload) {
    state.trainers = payload;
  },
  setLoadtime(state){
    state.lastLoad = new Date().getTime();
  }
};