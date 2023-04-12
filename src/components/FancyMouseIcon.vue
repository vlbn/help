<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  isInteractive: {
    type: Boolean,
    default: true,
  },
  wheelColor: {
    type: String,
    default: "#42b983",
  },
});

// mouse-wheel TimeLine
let mwTl = ref();

onMounted(() => {
  // initial values
  gsap.set(".mouse-wheel", {
    background: props.wheelColor,
    autoAlpha: 0,
    y: 0,
  });

  // mouse-wheel TimeLine animation
  mwTl = gsap
    .timeline({ repeat: -1 })
    .to(".mouse-wheel", {
      duration: 0.5,
      scale: 1.9,
      autoAlpha: 1,
    })
    .to(
      ".mouse-wheel",
      {
        duration: 0.5,
        scale: 0.9,
        y: 12,
      },
      0.3
    )
    .to(".mouse-wheel", {
      autoAlpha: 0,
    })
    .set(".mouse-wheel", {
      y: 0,
      scale: 0,
    })
    .paused(true);

  //

  if (props.isInteractive) {
    mwTl.paused(false);
  }
});

//
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
