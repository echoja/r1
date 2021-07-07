import * as VueRouter from "vue-router";

const routes: VueRouter.RouteRecordRaw[] = [
  {
    name: "About",
    path: "/about",
    component: () => import("@/views/About.vue"),
  },
  {
    name: "Practice",
    path: "/practice",
    component: () => import("@/views/Practice.vue"),
    meta: {
      title: "Practice",
    },
  },
  {
    name: "Award",
    path: "/award",
    component: () => import("@/views/Award.vue"),
  },
  {
    name: "Career",
    path: "/career",
    component: () => import("@/views/Career.vue"),
  },
  {
    name: "Research",
    path: "/research",
    component: () => import("@/views/Bridge.vue"),
    meta: {
      title: "연구",
    },
    children: [
      {
        name: "ResearchDefault",
        path: "",
        component: () => import("@/views/ResearchDefault.vue"),
        meta: {
          title: "기타 프로젝트",
        },
      },
      {
        name: "Classify",
        path: "classify",
        component: () => import("@/views/Bridge.vue"),
        meta: {
          title: "약품코드 정리 프로젝트",
        },
        beforeEnter(to, from, next) {
          if (to.name === "Classify") {
            next({ name: "ClassifyAbout" });
            return;
          }
          next();
        },
        children: [
          {
            name: "ClassifyAbout",
            path: "",
            meta: {
              title: "소개",
            },
            component: () => import("@/views/ClassifyAbout.vue"),
          },
          {
            name: "ClassifySearch",
            path: "search",
            meta: {
              title: "데모",
            },
            component: () => import("@/views/ClassifySearch.vue"),
          },
        ],
      },
      {
        name: "AnotherProject",
        path: "other",
        component: () => import("@/views/Bridge.vue"),
        meta: {
          title: "기타 프로젝트",
        },
      },
    ],
  },
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory("/app/"),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("router beforeEach");
  next();
});

router.afterEach(() => {
  console.log("router afterEach");
});

export default router;
