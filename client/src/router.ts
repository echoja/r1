import * as VueRouter from "vue-router";

// 1. Define route components.
// These can be imported from other files

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: VueRouter.RouteRecordRaw[] = [
  { name: "Home", path: "/", component: () => import("@/views/Home.vue") },
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
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHistory("/app/"),
  routes, // short for `routes: routes`
});
