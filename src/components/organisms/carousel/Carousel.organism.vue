<template>
    <ul class="carousel">
      <!-- Estado de carga -->
      <li v-if="loading" class="loading-state">
        Cargando imágenes...
      </li>
  
      <!-- Estado de error -->
      <li v-else-if="error" class="error-state">
        {{ error }}
      </li>
  
      <!-- Estado de datos vacíos -->
      <li v-else-if="topImages.length === 0" class="empty-state">
        No hay imágenes disponibles en este momento.
      </li>
  
      <!-- Carrusel de imágenes -->
      <li v-else class="carousel-container">
        <a
          class="carousel-track"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <!-- Mostrar las 4 primeras imágenes -->
          <div
            v-for="(image, index) in topImages"
            :key="image.id"
            class="carousel-slide"
          >
            <img :src="image.url" alt="Imagen de producto" />
          </div>
        </a>
  
        <!-- Botones de navegación -->
        <button class="carousel-button prev" @click="prevSlide">❮</button>
        <button class="carousel-button next" @click="nextSlide">❯</button>
      </li>
    </ul>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { getImages } from "../../../services/ApiImages"; // Importa tu servicio aquí
  
  // Variables reactivas
  const bestSellerImage = ref([]); // Almacena todas las imágenes
  const currentSlide = ref(0);
  const loading = ref(false);
  const error = ref(null);
  
  // Computed: Obtener las 4 primeras imágenes
  const topImages = computed(() => bestSellerImage.value.slice(0, 4));
  
  // Función para obtener datos
  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    bestSellerImage.value = [];
  
    try {
      const response = await getImages("t-shirts", 15);
      bestSellerImage.value = response.map((data) => ({
        id: data.id,
        url: data.largeImageURL,
      }));
      console.log("Imágenes cargadas:", bestSellerImage.value);
    } catch (err) {
      error.value = "Error al cargar las imágenes";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  
  // Funciones de navegación del carrusel
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % topImages.value.length;
  };
  
  const prevSlide = () => {
    currentSlide.value =
      (currentSlide.value - 1 + topImages.value.length) % topImages.value.length;
  };
  
  // Cargar datos cuando el componente se monta
  onMounted(() => {
    fetchData();
  });
  </script>
  
  <style scoped src="./Carousel.organism.scss"></style>
  