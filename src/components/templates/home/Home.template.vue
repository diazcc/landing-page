<template>
    <main class="home">
        <header class="home__header">
            <h1 class="home__header__logo">
                QUEST
            </h1>
        </header>
        <article class="home__wrapper">
            <img src="https://quest.vtexassets.com/assets/vtex.file-manager-graphql/images/959d392c-0fa9-4bb0-b27b-0ddcd2377f90___2d55841aa901169d51768b92bf0c7648.jpg"
                alt="" class="home__wrapper__presentation">
            <CarouselOrganism />
        </article>
        <footer class="home__footer">
            footer
            <nav class="home__footer__navegation">
                nav
            </nav>
        </footer>
    </main>
</template>
<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from "vue";
import CarouselOrganism from "../../organisms/Carousel.organism.vue";
const images = [
    "image1.jpg", // Reemplázalo con las rutas de tus imágenes
    "image2.jpg",
    "image3.jpg",
];

const currentSlide = ref(0);
let interval: any = null;

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % images.length;
};
const startAutoSlide = () => {
    interval = setInterval(() => {
        nextSlide();
    }, 3000);
};

const stopAutoSlide = () => {
    clearInterval(interval);
};

onMounted(() => {
    startAutoSlide();
});

onBeforeUnmount(() => {
    stopAutoSlide();
});

</script>
<style scoped src="./Home.template.scss"></style>