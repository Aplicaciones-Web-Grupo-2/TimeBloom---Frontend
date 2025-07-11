<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Registro</h2>
      <input v-model="name" type="text" placeholder="Nombre" />
      <input v-model="email" type="email" placeholder="Correo electrónico" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <input v-model="confirm" type="password" placeholder="Repetir contraseña" />
      <button @click="doRegister">CREAR CUENTA</button>
      <p class="auth-footer">
        ¿Ya tienes cuenta?
        <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/auth/services/api-auth.service';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');

const doRegister = async () => {
  if (!name.value || !email.value || !password.value || !confirm.value) {
    alert('Por favor, completa todos los campos');
    return;
  }

  if (password.value !== confirm.value) {
    alert('Las contraseñas no coinciden');
    return;
  }

  try {
    await registerUser({
      name: name.value, // solo si tu backend espera el campo `name`
      email: email.value,
      password: password.value
    });

    alert('Cuenta creada con éxito');
    router.push('/login');
  } catch (err) {
    alert(err.response?.data?.message || 'Error al registrar');
  }
};
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
.auth-box input::placeholder {
  color: #bbb;
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
  transition: background 0.3s;
}
.auth-box button:hover {
  background: #00b8e6;
}
.auth-footer {
  margin-top: 1rem;
  font-size: 0.9rem;
}
.auth-footer a {
  color: #00d1ff;
  text-decoration: underline;
}
</style>
