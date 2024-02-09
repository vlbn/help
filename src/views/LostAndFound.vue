<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

const route = useRoute();

let ruta = ref(route.path);

let theFace = ref();

let displayMessage = ref();

const truncatedUrl = computed(() => {
  const length = 10;
  if (ruta.value.length > length) {
    return ruta.value.substring(0, length) + "...";
  } else {
    return ruta.value;
  }
});

onMounted(() => {
  if (ruta.value === "/wp-admin") {
    displayMessage.value = "hahaha are you f*cking serious?";
    theFace.value = "😂";
  } else {
    displayMessage.value = "that's not a valid URL";
    theFace.value = "😒";
  }
});
</script>

<template>
  <div @click="$router.push('/')" class="fv-100 centerXY iPoint">
    <h1 class="title is-1">{{ theFace }} {{ truncatedUrl }} ?</h1>
    <h2 class="subtitle mt-1">{{ displayMessage }}</h2>
  </div>
</template>
