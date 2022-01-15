import Vuex from 'vuex';
import fetchData from '../data/data';

export default Vuex.createStore({
  state() {
    return {
      initialData: {},
    };
  },

  actions: {
    addPageInitialData({
      commit
    }) {
      const data = fetchData.initialData();
      commit('setPageData', data);
    },
    
    getUser({
      commit
    }, payload) {
      const data = fetchData.getUser(payload);
      commit('setPageData', data);
    },
  },

  mutations: {
    setPageData(state, data) {
      state.initialData = data
    },
  },

});