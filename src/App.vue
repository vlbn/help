<script setup>
import { onMounted, ref } from "vue";

import FancyCursor from "./components/FancyCursor.vue";
import FancyMouseIcon from "./components/FancyMouseIcon.vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

// --- locomotive scroll instance ref --- //
let lmsInstance = ref();

// --- the actors --- //
let mouseIcon = ref();
let scene1Actor1 = ref();

// --- methods --- //
const scrollMeTo = (target, duration) => {
  lmsInstance.value.scrollTo(target, duration);
};

onMounted(() => {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".wrapper"),
    smooth: true,
  });

  lmsInstance.value = locoScroll;

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".wrapper", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".wrapper").style.transform ? "transform" : "fixed",
  });

  // --- scene 1 --- //

  let introTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene1",
      scroller: ".wrapper",
      pin: true,
      pinSpacing: true,
      start: "top%",
      end: "bottom 10px",
      scrub: 0.1,
      markers: false,
    },
  });
  introTl.to(mouseIcon.value, {
    duration: 2.5,
    yPercent: -100,
    autoAlpha: 0,
  });
  introTl.to(scene1Actor1.value, {
    duration: 2.5,
    yPercent: 50,
    autoAlpha: 0,
  });

  // --- scene 2 --- //

  gsap.from(".namaste", {
    scrollTrigger: {
      trigger: ".scene2",
      scroller: ".wrapper",
      scrub: 1,
      start: "top 50%",
      end: "bottom 100%",
    },
    scaleX: 0,
    transformOrigin: "left center",
    ease: "none",
  });

  // --- scrollTrigger update, do not move this --- //

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  //
});

//
</script>

<template>
  <FancyCursor trigger=".pointer" />
  <div class="wrapper">
    <!-- scene 1 -->
    <section class="scene1 hero is-danger is-fullheight">
      <div class="hero-body">
        <div ref="scene1Actor1">
          <p class="title">Fullheight hero</p>
          <p class="subtitle">Fullheight subtitle</p>
        </div>
      </div>
      <div class="is-fixed-b">
        <div class="is-flex is-justify-content-center" ref="mouseIcon">
          <FancyMouseIcon @click="scrollMeTo('.scene2', 3)" />
        </div>
      </div>
    </section>
    <!-- scene 2 -->
    <section class="scene2 hero is-warning is-fullheight">
      <div class="hero-body">
        <div class="namaste" ref="scene2Actor1">
          <p class="title">Fullheight hero</p>
          <p class="subtitle">Fullheight subtitle</p>
        </div>
      </div>
    </section>
  </div>
</template>
