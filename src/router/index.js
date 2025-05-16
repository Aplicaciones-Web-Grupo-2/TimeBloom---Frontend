/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */

import { createRouter, createWebHistory} from "vue-router";
import taskManagementComponent from "../tasks-management/pages/task-management.component.vue";
import userPanelComponent from "../public/user-panel.component.vue";
import advicesManagementComponent from "../advices-management/pages/advices-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/home", component:userPanelComponent,meta: { title: "Home" } },
        {path: "/tasks", component:taskManagementComponent,meta: { title: "Tasks" } },
        { path: "/",        redirect: "/home"},
        {path: "/advices", component:advicesManagementComponent,meta: {tittle: "Advices"} }
    ]
})
export default router;