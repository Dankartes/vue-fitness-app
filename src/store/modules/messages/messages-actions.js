export default {
    async contactTrainer(context, payload) {

        const newMessage = {
            email: payload.email,
            content: payload.content
        };


        const response = await fetch(`https://lito-fit-default-rtdb.europe-west1.firebasedatabase.app/messages/${payload.trainerId}.json`, {
            method: 'POST',
            body: JSON.stringify(newMessage)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error('A aparut o eroare!');
            throw error;
        }

        newMessage.id = responseData.name; // se adauga proprietatea id automat si cu valoarea generata automat de firebase(name)
        newMessage.trainerId = payload.trainerId; // nu mai este trimis id-ul trainerului catre server, dar este incarcat local

        context.commit('addMessage', newMessage);

    },

    async loadMessagesFirebase(context) {

        const trainerId = context.rootGetters.userId;
        const token = context.rootGetters.token;


        const response = await fetch(`https://lito-fit-default-rtdb.europe-west1.firebasedatabase.app/messages/${trainerId}.json?auth=${token}`);
        const responseData = await response.json();


        if (!response.ok) {
            const error = new Error('A aparut o eroare!');
            throw error;
        }

        const messages = [];

        for (const key in responseData) {
            const message = {
                id: key,
                trainerId: trainerId,
                email: responseData[key].email,
                content: responseData[key].content
            };
            messages.push(message);
        }

        context.commit('loadMessagesFirebase', messages);
    }
}