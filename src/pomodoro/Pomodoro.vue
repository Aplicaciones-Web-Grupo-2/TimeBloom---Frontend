<!-- src/pomodoro/Pomodoro.vue -->
<template>
  <div class="pomodoro-page p-4">
    <h2>🍅 Técnica Pomodoro</h2>
    <!-- Ajusta la URL al servicio que prefieras -->
    <iframe
      src="https://pomofocus.io/"
      frameborder="0"
      style="width:100%; height:80vh;"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Pomodoro'
}
</script>

<style scoped>
.pomodoro-page h2 {
  margin-bottom: 1rem;
  text-align: center;
}
</style>
