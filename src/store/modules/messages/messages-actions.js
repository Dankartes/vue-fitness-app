export default {
  async contactTrainer(context, payload) {
    const newMessage = {
      email: payload.email,
      content: payload.content,
    };

    const response = await fetch(
      `https://lito-fit-default-rtdb.europe-west1.firebasedatabase.app/messages/${payload.trainerId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newMessage),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error("An error has occurred!");
      throw error;
    }

    newMessage.id = responseData.name;
    newMessage.trainerId = payload.trainerId;

    context.commit("addMessage", newMessage);
  },

  async loadMessagesFirebase(context) {
    const trainerId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://lito-fit-default-rtdb.europe-west1.firebasedatabase.app/messages/${trainerId}.json?auth=${token}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error("An error has occurred!");
      throw error;
    }

    const messages = [];

    for (const key in responseData) {
      const message = {
        id: key,
        trainerId: trainerId,
        email: responseData[key].email,
        content: responseData[key].content,
      };
      messages.push(message);
    }

    context.commit("loadMessagesFirebase", messages);
  },
};
