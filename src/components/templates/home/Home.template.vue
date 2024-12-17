<template>
    <main class="home">
        <header class="home__header">
            <h1 class="home__header__logo">QUEST</h1>
        </header>
        <article class="home__wrapper">
            <img
                src="https://quest.vtexassets.com/assets/vtex.file-manager-graphql/images/959d392c-0fa9-4bb0-b27b-0ddcd2377f90___2d55841aa901169d51768b92bf0c7648.jpg"
                alt="Presentación" class="home__wrapper__presentation">
            <CarouselOrganism />

            <!-- Listado de productos -->
            <section class="home__wrapper__list">
                <div class="home__wrapper__list__product-card" v-for="(product, index) in products" :key="index">
                    <img :src="product.imageUrl" alt="Imagen del producto" class="home__wrapper__list__product-card__image">
                    <div class="home__wrapper__list__product-card__info">
                        <h3 class="home__wrapper__list__product-card__name">{{ product.name }}</h3>
                        <p class="home__wrapper__list__product-card__price">${{ product.price }}</p>
                        <div class="home__wrapper__list__product-card__stars">
                            <span v-for="star in product.stars" :key="star">★</span>
                        </div>
                    </div>
                </div>
            </section>
        </article>
        <Footer/>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CarouselOrganism from "../../organisms/carousel/Carousel.organism.vue";
import Footer from "../../organisms/footer/Footer.organism.vue";
import { getImages } from "../../../services/ApiImages"; // Importa tu servicio aquí

// Datos de productos
const products = ref<any[]>([]);

onMounted(async () => {
    const images = await  getImages("t-shirts", 15);
    
    // Mapeamos la respuesta de las imágenes y le añadimos datos adicionales para los productos
    products.value = images.map((image: any, index: number) => ({
        name: `Producto ${index + 1}`, // Nombre del producto con un índice
        price: '000', // Precio quemado como '000'
        stars: Array.from({ length: 3 }), // 3 estrellas por defecto
        imageUrl: image.largeImageURL // Usamos la URL de la imagen obtenida del servicio
    }));
});
</script>
<style scoped src="./Home.template.scss"></style>
