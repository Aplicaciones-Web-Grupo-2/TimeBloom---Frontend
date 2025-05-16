<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Registro</h2>
      <input v-model="name" type="text" placeholder="Nombre" />
      <input v-model="email" type="email" placeholder="Correo electrónico" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <input v-model="confirm" type="password" placeholder="Repetir contraseña" />
      <button @click="doRegister">Crear cuenta</button>
      <p class="auth-footer">
        ¿Ya tienes cuenta?
        <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { registerUser } from '../shared/services/auth.service.js';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
    };
  },
  methods: {
    doRegister() {
      if (!this.name || !this.email || !this.password) {
        return alert('Completa todos los campos');
      }
      if (this.password !== this.confirm) {
        return alert('Las contraseñas no coinciden');
      }
      try {
        registerUser({
          name: this.name,
          email: this.email,
          password: this.password
        });
        alert('Registro exitoso. Ya puedes iniciar sesión');
        this.$router.push('/login');
      } catch (e) {
        alert(e.message);
      }
    }
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
