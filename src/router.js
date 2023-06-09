import { createRouter, createWebHistory } from "vue-router";
import BadgeDescriptions from "./pages/other/BadgeDescriptions.vue";
import TrainerDetails from "./pages/trainers/TrainerDetails.vue";
import TrainerRegister from "./pages/trainers/TrainerRegister.vue";
import TrainerList from "./pages/trainers/TrainerList.vue";
import TrainerProfile from "./pages/trainers/TrainerProfile.vue";
import ContactTrainer from "./pages/messages/ContactTrainer.vue";
import MessagesReceived from "./pages/messages/MessagesReceived.vue";
import NotFound from "./pages/NotFound.vue";
import UserLogin from "./pages/authentication/UserLogin.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/instructors",
    },
    {
      path: "/instructors",
      component: TrainerList,
    },
    {
      path: "/instructors/:id",
      component: TrainerDetails,
      props: true,
      children: [{ path: "contact", component: ContactTrainer }],
    },
    {
      path: "/register-instructor",
      component: TrainerRegister,
      meta: {
        requiresLogIn: true,
      },
    },
    {
      path: "/messages",
      component: MessagesReceived,
      meta: { requiresLogIn: true },
    },
    {
      path: "/authentication",
      component: UserLogin,
      meta: { requiresLogOut: true },
    },

    {
      path: "/profile",
      component: TrainerProfile,
      meta: {
        requiresLogIn: true,
      },
    },

    {
      path: "/specialities",
      component: BadgeDescriptions,
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresLogIn && !store.getters["isLoggedIn"]) {
    next("/authentication"); //daca nu e logat, userul nu are voie pe pagina si este redirectionat
  } else if (to.meta.requiresLogOut && store.getters["isLoggedIn"]) {
    next("/instructors"); //daca e logat, userul nu are voie pe pagina de logare si este redirectionat
  } else {
    next();
  }
});

export default router;
