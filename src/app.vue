<script >

import TaskManagement from "./tasks-management/pages/task-management.component.vue";

export default{
  name: 'app',
  components: {TaskManagement},
  data(){
    return{
      drawer: false,
      items: [
        { label: 'User-Panel', to: '/home' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Pomodoro', to: '/pomodoro' }
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}



</script>

<template>
 <pv-toast/>
  <header>
    <pv-toolbar class="bg-primary" fixed>
      <template #start>
        <pv-button class="p-button-text text-white" icon="pi pi-bars" @click="toggleDrawer"/>
        <h1>TimeBloom</h1>
      </template>
      <template #end>
      </template>
    </pv-toolbar>

  </header>

  <pv-drawer v-model:visible="drawer" header="Menú">
    <ul class="list-none p-0 m-0">
      <li v-for="item in items" :key="item.label" class="mb-2">
        <router-link :to="item.to" @click="drawer = false">
          <pv-button class="w-full justify-start" severity="secondary" :label="item.label" icon="pi pi-chevron-right" />
        </router-link>
      </li>
    </ul>
  </pv-drawer>

  <main class="p-4">
    <router-view />
  </main>

</template>

<style scoped>

</style>
