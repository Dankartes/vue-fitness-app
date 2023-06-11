export default {
  async addTrainer(context, data) {
    const userId = context.rootGetters.userId;
    const trainerData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://lito-fit-default-rtdb.europe-west1.firebasedatabase.app/instructors/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(trainerData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      //error
    }

    context.commit("addTrainer", {
      ...trainerData,
      id: userId,
    }); 
  },

  async deleteTrainer(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const urlDeleteTrainer = `https://lito-fit-default-rtdb.europe-west1.firebasedatabase.app/instructors/${userId}.json?auth=${token}`;
    const urlDeleteTrainerMessages = `https://lito-fit-default-rtdb.europe-west1.firebasedatabase.app/messages/${userId}.json`;

    const responseUser = await fetch(urlDeleteTrainer, {
      method: "DELETE",
    });

    if (!responseUser.ok) {
      //error
    }

    const responseUserMessages = await fetch(urlDeleteTrainerMessages, {
      method: "DELETE",
    });

    if (!responseUserMessages.ok) {
      //error
    }
  },

  async loadTrainersFirebase(context, payload) {
    if (!payload.refresh && !context.getters.shouldUpdateLoad) return;

    const response = await fetch(
      `https://lito-fit-default-rtdb.europe-west1.firebasedatabase.app/instructors.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error("An error has occurred!");
      throw error;
    }

    const trainers = [];

    for (const key in responseData) {
      const trainer = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      trainers.push(trainer);
    }

    context.commit("loadTrainersFirebase", trainers);
    context.commit("setLoadtime");
  },
};
