import { decorate, observable, computed } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthStore {
  user = null;

  loginUser = async (userData, history) => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      history.replace("/authors");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  signupUser = async (userData, history) => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      history.replace("/authors");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  logout = () => {
    this.setUser();
  };

  setUser = token => {
    if (token) {
      localStorage.setItem("myToken", token);
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const decodedUser = jwt_decode(token);
      this.user = decodedUser;
    } else {
      localStorage.removeItem("myToken");
      delete axios.defaults.headers.common.Authorization;
      this.user = null;
    }
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.setUser();
      }
    }
  };
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
