<script setup>
import { ref, onMounted, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  colorA: {
    type: String,
    default: "#42b983",
  },
  colorB: {
    type: String,
    default: "#ffffff",
  },
});

let colorA_ = ref(props.colorA);
let colorB_ = ref(props.colorB);

// mouse-wheel TimeLine
let mwTl = ref();

onMounted(() => {
  // initial values
  gsap.set(".mouse-wheel", {
    background: colorA_.value,
    autoAlpha: 0,
    y: 0,
  });
  gsap.set(".mouse-body", {
    background: colorB_.value,
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
    .to(".mouse-wheel", {
      y: 0,
      scale: 0,
    });
});

// scroll direction listener
let scrollPositionChange = ref();
let oldValue = 0;
let newValue = 0;
window.addEventListener("scroll", (e) => {
  newValue = window.pageYOffset;
  if (oldValue > newValue) {
    scrollPositionChange.value = false;
  } else if (oldValue < newValue) {
    scrollPositionChange.value = true;
  }
  oldValue = newValue;
});

watch(scrollPositionChange, () => {
  if (scrollPositionChange.value) {
    mwTl.reverse(0);
  } else {
    mwTl.reverse();
    mwTl.play();
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
