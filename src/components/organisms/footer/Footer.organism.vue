<template>
    <footer class="footer">
      <!-- Formulario de contacto -->
      <section class="footer__contact">
        <h3 class="footer__contact__title">¡Contáctanos!</h3>
        <form @submit.prevent="handleSubmit" class="footer__contact__form">
          <div class="footer__contact__form-group">
            <label for="name" class="footer__contact__form-label">Nombre:</label>
            <input type="text" id="name" v-model="form.name" required class="footer__contact__form-input">
          </div>
          <div class="footer__contact__form-group">
            <label for="email" class="footer__contact__form-label">Correo Electrónico:</label>
            <input type="email" id="email" v-model="form.email" required class="footer__contact__form-input">
          </div>
          <div class="footer__contact__form-group">
            <label for="message" class="footer__contact__form-label">Mensaje:</label>
            <textarea id="message" v-model="form.message" required class="footer__contact__form-input"></textarea>
          </div>
          <button type="submit" class="style-button">Enviar</button>
        </form>
      </section>
  
      <section class="footer__rights">
        <p>&copy; 2024 QUEST. Todos los derechos reservados.</p>
      </section>
    </footer>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const form = ref({
    name: '',
    email: '',
    message: ''
  });
  
  const handleSubmit = () => {
    console.log('Formulario enviado:', form.value);
    alert('¡Gracias por contactarnos!');
    form.value.name = '';
    form.value.email = '';
    form.value.message = '';
  };
  </script>
  
  <style scoped src="./Footer.organism.scss"></style>
  