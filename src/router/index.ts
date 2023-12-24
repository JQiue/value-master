import { createRouter, createWebHashHistory } from "vue-router";

import Mobile from "../views/mobile.vue";
import CPU from "../views/cpu.vue";
import GPU from "../views/gpu.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/mobile",
    },
    {
      name: "mobile",
      path: "/mobile",
      component: Mobile,
    },
    {
      name: "cpu",
      path: "/cpu",
      component: CPU,
    },
    {
      name: "gpu",
      path: "/gpu",
      component: GPU,
    },
  ],
});

export default router;
