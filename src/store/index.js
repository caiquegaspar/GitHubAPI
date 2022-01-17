import Vuex from 'vuex';
import fetchData from '../data/data';

export default Vuex.createStore({
  state() {
    return {
      initialData: {},
      usersList: {},
      userInfo: {},
      userStats: {},
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

    async getUserInitialData({
      commit
    }, payload) {
      const data = await fetchData.getUserInitialData(payload);
      commit('getUserInitialData', data);
    },

    async getUserStats({
      commit
    }, payload) {
      const data = await fetchData.getUserStats(payload);
      commit('getUserStats', data);
    },
  },

  mutations: {
    setPageData(state, data) {
      state.initialData = data
    },

    getUsers(state, data) {
      state.usersList = data
    },

    getUserInitialData(state, data) {
      state.userInfo = data
    },

    getUserStats(state, data) {
      state.userStats = data
    },
  },

});