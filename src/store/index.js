import Vuex from 'vuex';
import fetchData from '../data/data';

export default Vuex.createStore({
  state() {
    return {
      initialData: {},
      usersList: {},
    };
  },

  actions: {
    addPageInitialData({
      commit
    }) {
      const data = fetchData.initialData();
      commit('setPageData', data);
    },

    async getUsers({
      commit
    }, payload) {
      const data = await fetchData.getUsers(payload);
      commit('getUsers', data);
    },
  },

  mutations: {
    setPageData(state, data) {
      state.initialData = data
    },

    getUsers(state, data) {
      state.usersList = data
    },
  },

});