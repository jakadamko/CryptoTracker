import axios from "axios";

export default {
  loadCryptos: function() {
    return axios.get("/api/coins");
  }
};
