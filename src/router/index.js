import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Main.vue'),
    children: [
      {
        path: '/project',
        name: 'Project',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Project.vue'),
      },
      {
        path: '/planning',
        name: 'Planning',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Planning.vue'),
      },
      {
        path: '/itplanning',
        name: 'IT Planning',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/ItPlanning.vue'),
      },
      {
        path: '/itvalidity',
        name: 'IT Validity',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/ItValidity.vue'),
      },
      {
        path: '/validity',
        name: 'Validity',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Validity.vue'),
      },
      {
        path: '/semester',
        name: 'Semester',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Semester.vue'),
      },
      {
        path: '/site',
        name: 'Site',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Site.vue'),
      },
      {
        path: '/status',
        name: 'Status',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Status.vue'),
      },
      {
        path: '/department',
        name: 'Department',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Department.vue'),
      },
      {
        path: '/category',
        name: 'Category',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Category.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
