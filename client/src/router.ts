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
  },
  {
    name: "Search",
    path: "/search",
    component: () => import("@/views/Search.vue"),
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
