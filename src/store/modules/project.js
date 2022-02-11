import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    projects: [],
    selectedProject: {},
    drawer: false,
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    setSelectedProject(state, payload) {
      state.selectedProject = payload;
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
    fetchProjects({ commit, state }) {
      return HTTP()
        .get(`/projects`, {
          params: {
            page: state.meta.current - 1,
            size: state.meta.itemsPerPage,
          },
        })
        .then(({ data }) => {
          commit('setProjects', [...data.projects]);
          commit('setTotalItems', data.totalItems);
        });
    },
    deleteProject({ dispatch }, payload) {
      return HTTP()
        .delete(`/projects`, { params: { projectId: payload } })
        .then(() => {
          dispatch('fetchProjects');
          notification.success({
            message: 'Project deleted successfully',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error deleting project',
          });
        });
    },
  },
};
