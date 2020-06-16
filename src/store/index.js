import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import axios from "axios";
import VueAxios from "vue-axios";
import createLogger from "vuex/dist/logger";
import todos from "./modules/todos";

const vuexPersist = new VuexPersist({
  key: "gpgo",
  storage: window.localStorage,
});

Vue.use(Vuex, VueAxios, axios);

new webpack.DefinePlugin({
  API_URL: JSON.stringify(process.env.VUE_APP_API_URL),
});

// add these before Vue is instantiated
window.axios = axios;
axios.defaults.baseURL = API_URL;

const debug = process.env.NODE_ENV !== "production";
var plugins = debug
  ? [createLogger(), vuexPersist.plugin]
  : [vuexPersist.plugin];

export default new Vuex.Store({
  plugins: plugins,
  modules: {
    tds: todos,
  },
  strict: debug,
});
