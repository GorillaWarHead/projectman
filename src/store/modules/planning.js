import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    plannings: [],
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setPlannings(state, payload) {
      state.plannings = payload;
    },
    setCurrent(state, payload) {
      state.meta.current = payload;
    },
    setTotalItems(state, payload) {
      state.meta.totalItems = payload;
    },
    setItemsPerPage(state, payload) {
      state.meta.itemsPerPage = payload;
    },
  },
  actions: {
    fetchPLannings({ commit, state }) {
      return HTTP()
        .get(`/overallplannings`, {
          params: {
            page: state.meta.current - 1,
            size: state.meta.itemsPerPage,
          },
        })
        .then(({ data }) => {
          commit('setPlannings', [...data.OverallPlannings]);
          commit('setTotalItems', data.totalItems);
        });
    },
    postQuantity({ dispatch }, payload) {
      return HTTP()
        .post(`/overallplannings`, payload)
        .then(() => {
          notification.success({
            message: 'Quantity added successfully',
          });
          dispatch('fetchPLannings');
        })
        .catch(() => {
          notification.error({
            message: 'Something went wrong',
          });
        });
    },
    deleteQuantity({ dispatch }, payload) {
      return HTTP()
        .delete(`/overallplannings`, { params: payload })
        .then(() => {
          notification.success({
            message: 'Quantity deleted successfully',
          });
          dispatch('fetchPLannings');
        })
        .catch(() => {
          notification.error({
            message: 'Something went wrong',
          });
        });
    },
  },
};
