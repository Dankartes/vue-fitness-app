import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import BaseCard from "./components/base/BaseCard.vue";
import BaseButton from "./components/base/BaseButton.vue";
import BaseBadge from "./components/base/BaseBadge.vue";
import BaseLoading from "./components/base/BaseLoading.vue";
import BaseWindow from "./components/base/BaseWindow.vue";

//font awesome icoane ameno
import {
  faJs,
  faCss3,
  faHtml5,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faDumbbell,
  faHeartPulse,
  faPersonSwimming,
  faLeaf,
  faTrashCan,
  faUserPen,
  faRedo,
  faAddressBook,
  faUser,
  faSignIn,
  faSignOut,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faDumbbell,
  faHeartPulse,
  faPersonSwimming,
  faLeaf,
  faTrashCan,
  faUserPen,
  faRedo,
  faAddressBook,
  faUser,
  faSignIn,
  faSignOut,
  faFloppyDisk,
  faJs,
  faCss3,
  faHtml5,
  faVuejs
);

const app = createApp(App);

app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);
app.component("base-loading", BaseLoading);
app.component("base-window", BaseWindow);

app.mount("#app");
