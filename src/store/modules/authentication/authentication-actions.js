let timer;

export default {
  async logIn(context, payload) {
    return context.dispatch("authFirebase", {
      ...payload,
      mode: "login",
    });
  },

  async signUp(context, payload) {
    return context.dispatch("authFirebase", {
      ...payload,
      mode: "signup",
    });
  },

  logOut(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpirationDate");

    clearTimeout(timer);

    const nullObject = {
      token: null,
      userId: null,
    };
    context.commit("setUser", nullObject);
  },

  async authFirebase(context, payload) {
    const mode = payload.mode;
    let url = "";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5RcbpMY-1rKlHNCLreCToClSXBt7Rgt8";
    } else
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5RcbpMY-1rKlHNCLreCToClSXBt7Rgt8";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();
    //console.log(responseData);

    if (!response.ok) {
      let errorMessage = "";
      if (responseData.error.message === "EMAIL_NOT_FOUND")
        errorMessage = "Email-ul introdus nu există!";
      else if (responseData.error.message === "INVALID_PASSWORD")
        errorMessage = "Parolă incorectă!";
      else if (
        responseData.error.message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")
      )
        errorMessage =
          "Ați incercat de prea multe ori, vă rugam reveniți mai târziu.";
      const error = new Error(errorMessage);
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000; //expiresIn e in secunde in mod normal, inmultit cu 1000 va fi in milisecunde
    //const expiresIn =5000;

    const timeForLogOut = new Date().getTime() + expiresIn; //data expirare in milisecunde

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpirationDate", timeForLogOut);

    timer = setTimeout(() => {
      context.dispatch("autoLogOut");
    }, expiresIn);

    const userData = {
      token: responseData.idToken,
      userId: responseData.localId,
    };
    context.commit("setUser", userData);
  },

  autoLogIn(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpirationDate = localStorage.getItem("tokenExpirationDate");

    const expiresIn = tokenExpirationDate - new Date().getTime();

    if (expiresIn < 0) return;

    timer = setTimeout(() => {
      context.dispatch("autoLogOut");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },

  autoLogOut(context) {
    context.dispatch("logOut");
    context.commit("logOutExecuted");
  },
};
