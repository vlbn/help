import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "demo",
    component: () => import("@/views/DeMo.vue"),
    meta: { transition: "fade" },
  },
  {
    path: "/:catchAll(.*)",
    name: "where do we go now?",
    component: () => import("@/views/LostAndFound.vue"),
    meta: { transition: "fade" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;