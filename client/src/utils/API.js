import axios from "axios";

export default {
  loadCryptos: function() {
    return axios.get("/api/coins");
  },
  saveCrypto: function (data) {
    return axios.get("/api/saveCoins", data);
  }
};
