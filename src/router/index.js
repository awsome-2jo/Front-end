import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView";
import AptView from "../views/AptView";
import NoticeView from "../views/NoticeView";
import NewsView from "../views/NewsView";
import MyPageView from "../views/MyPageView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "HOME:IN - 아파트 실거래가 정보 사이트",
    },
  },
  {
    path: "/user",
    name: "myPage",
    component: MyPageView,
    meta: {
      title: "HOME:IN - 마이페이지",
    },
  },
  {
    path: "/apt",
    name: "aptMap",
    component: AptView,
    meta: {
      title: "HOME:IN - 실거래 정보",
    },
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
      {
        path: "modify/:no",
        name: "noticeModify",
        component: () => import("@/components/notice/NoticeModify"),
      },
      {
        path: "add",
        name: "noticeAdd",
        component: () => import("@/components/notice/NoticeModify"),
      },
    ],
  },
  {
    path: "/news",
    name: "newsView",
    component: NewsView,
    meta: {
      title: "HOME:IN - 부동산 소식",
    },
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

router.afterEach((to) => {
  const title = to.meta.title === undefined ? "HOME:IN" : to.meta.title;
  Vue.nextTick(() => {
    document.title = title;
  });
});

export default router;
