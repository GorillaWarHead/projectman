import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    semesters: [],
    semesterList: [],
    selectedSemester: {},

    drawer: false,
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setSemesterList(state, payload) {
      state.semesterList = payload;
    },
    setSemesters(state, payload) {
      state.semesters = payload;
    },
    setSelectedSemester(state, payload) {
      state.selectedSemester = payload;
    },
    setDrawer(state, payload) {
      state.drawer = payload;
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
    fetchSemesterList({ commit }) {
      return HTTP()
        .get(`/semesters/list`)
        .then(({ data }) => {
          commit('setSemesterList', [...data]);
        });
    },
    fetchSemesters({ commit }) {
      return HTTP()
        .get(`/semesters`)
        .then(({ data }) => {
          commit('setSemesters', [...data.semesters]);
          commit('setTotalItems', data.totalItems);
        });
    },
    deleteSemester({ dispatch }, payload) {
      return HTTP()
        .delete(`/semesters`, { params: { semesterId: payload } })
        .then(() => {
          dispatch('fetchSemesters');
          notification.success({
            message: 'Semester deleted successfully',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error deleting semester',
          });
        });
    },
  },
};
