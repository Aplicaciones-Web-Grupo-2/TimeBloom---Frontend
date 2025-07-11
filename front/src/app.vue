<template>
  <pv-toast/>
  <header>
    <pv-toolbar class="bg-primary" fixed>
      <template #start>
        <pv-button
          class="p-button-text text-white"
          icon="pi pi-bars"
          @click="toggleDrawer"
        />
        <h1>TimeBloom</h1>
      </template>
    </pv-toolbar>
  </header>

  <pv-drawer
    v-model:visible="drawer"
    header="Menú"
    class="drawer"
  >
    <!-- Este es el wrapper que vamos a hacer flex -->
    <div class="drawer-body">
      <ul class="list-none p-4 m-0">
        <li
          v-for="item in items"
          :key="item.label"
          class="mb-2"
        >
          <router-link :to="item.to" @click="drawer = false">
            <pv-button
              class="w-full justify-start"
              severity="secondary"
              :label="item.label"
              icon="pi pi-chevron-right"
            />
          </router-link>
        </li>
      </ul>

      <div class="logout-area">
        <pv-button
          class="w-full"
          severity="danger"
          icon="pi pi-sign-out"
          label="Cerrar sesión"
          @click="logout"
        />
      </div>
    </div>
  </pv-drawer>

  <main class="p-4">
    <router-view />
  </main>
</template>

<script>
import TaskManagement from "./tasks-management/pages/task-management.component.vue";
import GoalManagementComponent from "./goals-management/pages/goal-management.component.vue";

export default {
  name: 'app',
  components: { TaskManagement, GoalManagementComponent },
  data() {
    return {
      drawer: false,
      items: [
        { label: 'User-Panel', to: '/home' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Pomodoro', to: '/pomodoro' },
        { label: 'Advices', to: '/advices' },
        { label: 'Misión del Día', to: '/daily-missions' },
        { label: 'Goals', to: '/goals' },
        { label: 'Statistics', to: '/statistics' },
        { label: 'Settings', to: '/settings' }
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    logout() {
      localStorage.removeItem('currentUser');
      window.location.href = 'https://aplicaciones-web-grupo-2.github.io/Landing-page/';
    }
  }
}
</script>
<style scoped>
.drawer {
  width: 250px;
  background-color: #f8f9fa;
  padding: 1rem;
}
.drawer-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.drawer-body ul {
  flex: 1;
  overflow-y: auto;
}
.logout-area {
  padding: 1rem;
}
</style>