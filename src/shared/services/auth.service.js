// src/services/auth.service.js
export function registerUser(user) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === user.email)) {
    throw new Error('Ya existe un usuario con ese correo');
  }
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Correo o contraseña inválidos');
  }
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}
