<script setup>
import FancyCursor from "./components/FancyCursor.vue";
import FancyMouseIcon from "./components/FancyMouseIcon.vue"
</script>

<template>
  <FancyCursor trigger=".pointer" />
  <FancyMouseIcon position="is-fixed-b-r" />

  <div class="wrapper">

    <!-- slide 1 -->
    <section class="slide1">
      <mark>slide <a href="#">1</a></mark>
    </section>

    <!-- slide 2 -->
    <section class="slide2">
      <mark>slide 2</mark>
    </section>

  </div>
</template>
