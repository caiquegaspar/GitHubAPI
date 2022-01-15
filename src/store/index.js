import Vuex from 'vuex';
import fetchData from '../data/data';

export default Vuex.createStore({
  state() {
    return {
      initialData: {},
      userInfo: {},
    };
  },

  actions: {
    addPageInitialData({
      commit
    }) {
      const data = fetchData.initialData();
      commit('setPageData', data);
    },
    
    getUsers({
      commit
    }, payload) {
      const data = fetchData.getUsers(payload);
      commit('getUsers', data);
    },
  },

  mutations: {
    setPageData(state, data) {
      state.initialData = data
    },
    
    getUsers(state, data) {
      state.userInfo = data
    },
  },

});