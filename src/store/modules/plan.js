import HTTP from '../../plugins/http';

export default {
  namespaced: true,

  state: {
    weeks: [],
    tasks: [],
    planifications: [],
    personnel: [],
    planification: {},
  },
  getters: {},
  mutations: {
    setWeeks(state, payload) {
      state.weeks = payload;
    },
    setTasks(state, payload) {
      state.tasks = payload;
    },
    setPlanifications(state, payload) {
      state.planifications = payload;
    },
    setPlanification(state, payload) {
      state.planification = payload;
    },
    setPersonnel(state, payload) {
      state.personnel = payload;
    },
  },
  actions: {
    postPlanification({ state }) {
      const data = {
        charge: state.planification.charge,
        idCss: state.planification.idCss,
        week: state.planification.week,
        year: state.planification.year,
        tache: {
          id: state.planification.tache,
        },
        personnel: {
          id: state.planification.personnel,
        },
      };
      return HTTP()
        .post(`/planification`, data)
        .then(() => {});
    },
    fetchWeeks({ commit }) {
      return HTTP()
        .get(`/mweek`)
        .then(({ data }) => {
          commit('setWeeks', [...data]);
        });
    },
    fetchTasks({ commit }) {
      return HTTP()
        .get(`/tache/ftache`)
        .then(({ data }) => {
          commit('setTasks', [...data]);
        });
    },
    fetchPlanifications({ commit }) {
      return HTTP()
        .get(`/planification`)
        .then(({ data }) => {
          commit('setPlanifications', [...data]);
        });
    },
    fetchPersonnel({ commit }) {
      return HTTP()
        .get(`/personnel/findallL`)
        .then(({ data }) => {
          commit('setPersonnel', [...data]);
        });
    },
  },
};
