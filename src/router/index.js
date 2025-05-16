import { createRouter, createWebHistory } from "vue-router";
import Login from "../auth/login.component.vue";
import Register from "../auth/register.component.vue";
import userPanelComponent from "../public/user-panel.component.vue";
import taskManagementComponent from "../tasks-management/pages/task-management.component.vue";
import advicesManagementComponent from "../advices-management/pages/advices-management.component.vue";
import Pomodoro from "../pomodoro/Pomodoro.vue";


const routes = [
  // público
  { path: "/login",    component: Login,    meta: { title: "Login" } },
  { path: "/register", component: Register, meta: { title: "Register" } },

  // privado
  { path: "/home",      component: userPanelComponent,       meta: { title: "Home" } },
  { path: "/tasks",     component: taskManagementComponent,  meta: { title: "Tasks" } },
  { path: "/advices",   component: advicesManagementComponent, meta: { title: "Advices" } },
  { path: "/user-panel", component: userPanelComponent,      meta: { title: "User Panel" } },
  { path: "/pomodoro",  component: Pomodoro,                 meta: { title: "Pomodoro" } },
  // ruta raíz: aquí decides si vas al login o directamente al home
  { path: "/", redirect: "/home" },

  // catch-all opcional para 404
  { path: "/:pathMatch(.*)*", redirect: "/" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// guard para proteger rutas privadas
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("currentUser");
  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export default router;
