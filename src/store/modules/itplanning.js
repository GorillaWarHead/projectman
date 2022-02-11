import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    itPlannings: [],
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setItPlannings(state, payload) {
      state.itPlannings = payload;
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
    fetchItPlannings({ commit, state }) {
      return HTTP()
        .get(`/itPlannings`, {
          params: {
            page: state.meta.current - 1,
            size: state.meta.itemsPerPage,
          },
        })
        .then(({ data }) => {
          commit('setItPlannings', [...data.iTPlannings]);
          commit('setTotalItems', data.totalItems);
        });
    },
    postQuantity({ dispatch }, payload) {
      return HTTP()
        .post(`/itPlannings`, payload)
        .then(() => {
          notification.success({
            message: 'Quantity added successfully',
          });
          dispatch('fetchItPlannings');
        })
        .catch(() => {
          notification.error({
            message: 'Something went wrong',
          });
        });
    },
    deleteQuantity({ dispatch }, payload) {
      return HTTP()
        .delete(`/itPlannings`, { params: payload })
        .then(() => {
          notification.success({
            message: 'Quantity deleted successfully',
          });
          dispatch('fetchItPlannings');
        })
        .catch(() => {
          notification.error({
            message: 'Something went wrong',
          });
        });
    },
  },
};
