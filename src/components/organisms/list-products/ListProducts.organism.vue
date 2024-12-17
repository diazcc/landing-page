<template>
    <section class="list-products">
      <div
        class="list-products__product-card"
        v-for="(product, index) in products"
        :key="index"
        @click="openProduct(product.id)"
      >
        <img :src="product.imageUrl" alt="Imagen del producto" class="list-products__product-card__image" />
        <div class="list-products__product-card__info">
          <h3 class="list-products__product-card__name">{{ product.name }}</h3>
          <p class="list-products__product-card__price">${{ product.price }}</p>
          <div class="list-products__product-card__stars">
            <span v-for="star in product.stars" :key="star">★</span>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { getImages } from "../../../services/ApiImages"; // Suponiendo que tienes una función `getImages` definida previamente
  
  const products = ref<any[]>([]);
  const router = useRouter();
  
  onMounted(async () => {
    try {
      const images = await getImages("t-shirts", 15); // Aquí 't-shirts' es el término de búsqueda
      products.value = images.map((image: any, index: number) => ({
        id: image.id,
        name: `Producto ${index + 1}`, // Nombre del producto
        price: "000", // Precio ficticio por ahora
        stars: Array.from({ length: 3 }), // 3 estrellas de ejemplo
        imageUrl: image.largeImageURL, // URL de la imagen obtenida
      }));
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    }
  });
  
  function openProduct(id: any) {
    router.push(`product/:${id}`); // Redirigir al producto con el ID especificado
  }
  </script>
  
  <style scoped src="./ListProducts.organism.scss">
  </style>
  