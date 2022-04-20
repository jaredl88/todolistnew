module.exports = {
    getUser: function () {
      const user = sessionStorage.getItem("user");
      if (user === "undefined" || !user) {
        return null;
      } else {
        return JSON.parse(user);
      }
    },
    getAuthToken: function () {
      const auth = sessionStorage.getItem("authtoken");
      if (auth === "undefined" || !auth) {
        return null;
      } else {
        return JSON.parse(auth);
      }
    },
    getToken: function () {
      return sessionStorage.getItem("user");
      return sessionStorage.getItem("token");
    },
    setAuthToken: function (authToken) {
      sessionStorage.setItem("authtoken", JSON.stringify(authToken));
    },
    setUserSession: function (user, token) {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
    },
resetUserSession: function () {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
  };
  