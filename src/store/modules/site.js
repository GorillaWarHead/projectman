import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    siteList: [],
    sites: [],
    selectedSite: {},
    drawer: false,
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setSiteList(state, payload) {
      state.siteList = payload;
    },
    setSites(state, payload) {
      state.sites = payload;
    },
    setSelectedSite(state, payload) {
      state.selectedSite = payload;
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
    fetchSiteList({ commit }) {
      return HTTP()
        .get(`/sites/list`)
        .then(({ data }) => {
          commit('setSiteList', [...data]);
        });
    },
    fetchSites({ commit }) {
      return HTTP()
        .get(`/sites`)
        .then(({ data }) => {
          commit('setSites', [...data.sites]);
          commit('setTotalItems', data.totalItems);
        });
    },
    deleteSite({ dispatch }, payload) {
      return HTTP()
        .delete(`/sites`, { params: { siteId: payload } })
        .then(() => {
          dispatch('fetchSites');
          notification.success({
            message: 'Site deleted successfully',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error deleting site',
          });
        });
    },
  },
};
