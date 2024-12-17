<template>
    <HomeTemplate/>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const HomeTemplate = defineAsyncComponent(() => import('../../components/templates/home/Home.template.vue'));
</script>