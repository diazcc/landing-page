<template>
  <main class="home">
    <header class="home__header">
      <h1 class="home__header__logo">QUEST</h1>
    </header>
    <section class="home__product">
      <img
        :src="urlImg"
        alt="Product Image"
        v-if="urlImg"
        class="home__product__image"
      />
      <p v-if="error" class="error-message">{{ error }}</p>
      <article v-if="product">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <a class="product-stars">
          <span v-for="n in product.stars" :key="n" class="star">★</span>
        </a>
        <p class="product-price">${{ product.price }}</p>
        <button @click="redirectToWhatsApp" class="style-button-wpp">
          Comprar
        </button>
      </article>
    </section>
    <ListProducts />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Footer from "../../organisms/footer/Footer.organism.vue";
import ListProducts from "../../organisms/list-products/ListProducts.organism.vue";
import { getImages } from "../../../services/ApiImages";
const urlImg = ref("https://via.placeholder.com/150"); // Imagen de ejemplo
const error = ref<string | null>(null); // Mensaje de error
const product = ref<any>(null); // Información del producto

onMounted(async () => {
  try {
    product.value = {
      name: "Producto Ficticio",
      description:
        "Este es un producto de ejemplo con características fantásticas. ¡No te lo pierdas!",
      price: "19.99",
      stars: [1, 2, 3, 4, 5], // 5 estrellas
    };
    // Obtener imágenes con la función getImages, en este caso con el término "t-shirts"
    const images = await getImages("t-shirts", 15);

    // Mapeamos la respuesta y agregamos datos adicionales para los productos

    // Seleccionamos una imagen aleatoria de los productos obtenidos
    if (images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      urlImg.value = images[randomIndex].largeImageURL; // Asignamos la URL aleatoria
    }
  } catch (err) {
    error.value = "Hubo un error al obtener las imágenes.";
    console.error("Error al obtener las imágenes:", err);
  }
});
const redirectToWhatsApp = () => {
  const message = `¡Hola! Me interesa el producto con ID 12345 (${product.value.name}) que tiene un descuento del 10% y un precio de ${product.value.price}.`;
  const whatsappLink = `https://wa.me/3146724568?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappLink, "_blank");
};
</script>

<style scoped src="./Product.template.scss">
.home {
  font-family: Arial, sans-serif;
}

.home__header {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
}

.home__header__logo {
  font-size: 2.5rem;
  margin: 0;
}

.home__product {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
}

.home__product__image {
  width: 100%;
  max-width: 150px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
}

.product-stars {
  color: #ffd700; /* Color dorado para las estrellas */
  margin-bottom: 15px;
}

.star {
  font-size: 1.5rem;
}

.product-price {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 20px;
}

.whatsapp-button {
  background-color: #25d366;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.whatsapp-button:hover {
  background-color: #128c7e;
}

.home__footer {
  text-align: center;
  padding: 20px;
  background-color: #333;
  color: white;
  margin-top: 20px;
}
</style>
