import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView";
import AptView from "../views/AptView";
import NoticeView from "../views/NoticeView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/apt",
    name: "aptMap",
    component: AptView,
  },
  {
    path: "/notice",
    name: "noticeView",
    component: NoticeView,
    children: [
      {
        path: "/",
        name: "noticeList",
        component: () => import("@/components/notice/NoticeList"),
      },
      {
        path: "list",
        name: "noticeList",
        component: () => import("@/components/notice/NoticeList"),
      },
      {
        path: "detail/:no",
        name: "noticeDetail",
        component: () => import("@/components/notice/NoticeDetail"),
      },
    ]
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
