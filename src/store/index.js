import Vue from 'vue';
import Vuex from 'vuex';
import site from './modules/site';
import department from './modules/department';
import category from './modules/category';
import project from './modules/project';
import user from './modules/user';
import planning from './modules/planning';
import itplanning from './modules/itplanning';
import semester from './modules/semester';
import validity from './modules/validity';
import itvalidity from './modules/itvalidity';
import status from './modules/status';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    site,
    department,
    category,
    project,
    user,
    planning,
    itplanning,
    semester,
    validity,
    itvalidity,
    status,
  },
});
