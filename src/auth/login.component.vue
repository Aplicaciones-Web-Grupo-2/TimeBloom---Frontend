<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Iniciar Sesión</h2>
      <input v-model="email" type="email" placeholder="Correo electrónico" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="login">Entrar</button>
      <p class="auth-footer">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '@/auth/services/api-auth.service'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const user = await loginUser(email.value, password.value)
    
    // Guardar en localStorage para activar las rutas privadas
    localStorage.setItem('currentUser', JSON.stringify(user))

    // Redirigir al panel principal
    router.push('/home')
  } catch (err) {
    alert('Correo o contraseña inválidos')
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #0a0f2c, #1a1a2e);
  justify-content: center;
  align-items: center;
}
.auth-box {
  background: #ffffff10;
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  width: 320px;
  text-align: center;
  color: #fff;
}
.auth-box h2 {
  margin-bottom: 1.5rem;
  color: #00d1ff;
}
.auth-box input {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 6px;
  background: #ffffff15;
  color: #fff;
}
.auth-box button {
  width: 100%;
  padding: 0.8rem;
  background: #00d1ff;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.auth-footer {
  margin-top: 1rem;
  font-size: 0.9rem;
}
.auth-footer a {
  color: #00d1ff;
}
</style>

