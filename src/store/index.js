import { createStore } from 'vuex';
import trainersModule from './modules/trainers/trainers-index.js'
import messagesModule from './modules/messages/messages-index.js'
import userAuthModule from './modules/authentication/authentication-index'

const store = createStore({
    modules: {
        trainers: trainersModule,
        messages: messagesModule,
        authentication: userAuthModule
    },
});

export default store;

