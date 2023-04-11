<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  direction: {
    type: String,
    default() {
      return "down";
    },
  },
  color: {
    type: String,
    default() {
      return "#42b983";
    },
  },
});

let scrollTl = gsap.timeline({ paused: true });

let theColor = ref(props.color);
let theDirection = ref(props.direction);

onMounted(() => {
  gsap.set(".mouse-wheel", {
    background: theColor.value,
    autoAlpha: 0,
  });
  scrollTl = gsap
    .timeline({ repeat: -1, paused: false })
    .to(".mouse-wheel", {
      duration: 0.3,
      scale: 1.9,
      autoAlpha: 1,
    })
    .to(".mouse-wheel", {
      duration: 0.5,
      scale: 0.9,
      y: 10,
    })
    .to(".mouse-wheel", {
      autoAlpha: 0,
    });
});
</script>

<template>
  <div class="mouse-container">
    <div class="mouse-body">
      <div class="mouse-wheel"></div>
    </div>
  </div>
</template>

<style scoped>
.mouse-container {
  z-index: 9999 !important;
  margin: 3rem;
  width: 25px;
  height: 40px;
}
.mouse-body {
  display: flex;
  justify-content: center;
  cursor: pointer;
  height: 100%;
  border: 0.1rem solid #6e6e6e60;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
  border-radius: 15px;
}

.mouse-wheel {
  margin-top: 0.3rem;
  width: 5px;
  height: 5px;
  background: #6e6e6e;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
