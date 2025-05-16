<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Iniciar Sesión</h2>
      <input v-model="email" type="email" placeholder="Correo electrónico" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="doLogin">Entrar</button>
      <p class="auth-footer">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../shared/services/auth.service';

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    doLogin() {
      try {
        loginUser(this.email, this.password);
        this.$router.push('/home');
      } catch (e) {
        alert(e.message);
      }
    }
  }
}
</script>

<style scoped>
/* mismo estilo que RegisterComponent */
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
