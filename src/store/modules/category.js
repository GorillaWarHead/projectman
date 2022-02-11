import HTTP from '../../plugins/http';
import { notification } from 'ant-design-vue';

export default {
  namespaced: true,

  state: {
    categoryList: [],
    categories: [],
    selectedCategory: {},
    drawer: false,
    meta: {
      current: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  },
  getters: {},
  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
    setSelectedCategory(state, payload) {
      state.selectedCategory = payload;
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
    fetchCategoryList({ commit }) {
      return HTTP()
        .get(`/categories/list`)
        .then(({ data }) => {
          commit('setCategoryList', [...data]);
        });
    },
    fetchCategories({ commit }) {
      return HTTP()
        .get(`/categories`)
        .then(({ data }) => {
          commit('setCategories', [...data.categories]);
          commit('setTotalItems', data.totalItems);
        });
    },
    deleteCategories({ dispatch }, payload) {
      return HTTP()
        .delete(`/categories`, { params: { categoryId: payload } })
        .then(() => {
          dispatch('fetchStatus');
          notification.success({
            message: 'Category deleted successfully',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error deleting Category',
          });
        });
    },
  },
};
