import HTTP from '../../plugins/http';

export default {
  namespaced: true,

  state: {
    userList: [],
  },
  getters: {},
  mutations: {
    setUserList(state, payload) {
      state.userList = payload;
    },
  },
  actions: {
    fetchUserList({ commit }) {
      return HTTP()
        .get(`/users/role`)
        .then(({ data }) => {
          commit('setUserList', [...data]);
        });
    },
  },
};
