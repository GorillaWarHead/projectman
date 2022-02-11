import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    departmentList: [],
    departments: [],
    selectedDepartment: {},
    drawer: false,
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setDepartmentList(state, payload) {
      state.departmentList = payload;
    },
    setDepartments(state, payload) {
      state.departments = payload;
    },
    setSelectedDepartment(state, payload) {
      state.selectedDepartment = payload;
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
    fetchDepartmentList({ commit }) {
      return HTTP()
        .get(`/departments/list`)
        .then(({ data }) => {
          commit('setDepartmentList', [...data]);
        });
    },
    fetchDepartments({ commit }) {
      return HTTP()
        .get(`/departments`)
        .then(({ data }) => {
          commit('setDepartments', [...data.departments]);
          commit('setTotalItems', data.totalItems);
        });
    },
    deleteDepartments({ dispatch }, payload) {
      return HTTP()
        .delete(`/fetchDepartments`, { params: { departmentId: payload } })
        .then(() => {
          dispatch('fetchStatus');
          notification.success({
            message: 'Department deleted successfully',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error deleting department',
          });
        });
    },
  },
};
