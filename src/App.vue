<script setup>
import { onMounted, ref } from "vue";

import FancyMouseIcon from "./components/FancyMouseIcon.vue";
import GitHubLogo from "./components/GitHubLogo.vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

// --- locomotive scroll instance ref --- //
let lmsInstance = ref();

// --- the actors --- //
let Actor1 = ref();
let Actor2 = ref();
let Actor3 = ref();
let Actor4 = ref();

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
      start: "top 0%",
      end: "bottom",
      scrub: 0.1,
      markers: false,
    },
  });
  introTl.to(Actor1.value, {
    duration: 2.5,
    yPercent: 50,
    autoAlpha: 0,
  });
  introTl.to(Actor2.value, {
    duration: 5.5,
    autoAlpha: 0,
    scale: 2.9,
    xPercent: 150,
  });
  introTl.to(Actor3.value, {
    duration: 2.5,
    y: 500,
    autoAlpha: 0,
  });

  // --- scrollTrigger update, do not move this --- //

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  //
});

//
</script>

<template>
  <!-- fancy mouse icon -->
  <div class="is-fixed-b">
    <div class="is-flex is-justify-content-center pointer">
      <FancyMouseIcon @click="gsap.to('.scene2', 1.5)" />
    </div>
  </div>
  <div class="wrapper">
    <!-- scene 1 -->
    <section class="scene1 hero is-fullheight">
      <div class="hero-body is-flex is-justify-content-center">
        <div ref="Actor1" class="mr-5">
          <img src="./assets/media/fancy.svg" />
        </div>
        <div ref="Actor2">
          <strong>gsap</strong> excercise with
          <strong class="is-size-4">locomotive-scroll</strong> and
          <strong>vue</strong>
        </div>
        <div ref="scene1Actor3" class="pl-2 pt-2">♥</div>

        <div class="m-6 pointer" @click="scrollMeTo('.wrapper', 1.5)" ref="Actor3">
          <img src="https://picsum.photos/900/600" />
        </div>
        <div class="is-size-5" ref="Actor4">
          <a href="https://github.com/vlbn/help"><GitHubLogo /></a>
        </div>
      </div>
    </section>
    <!-- scene 2 -->
    <section class="scene2 hero is-fullheight is-danger">
      <div class="hero-body is-flex is-justify-content-center"></div>
    </section>
  </div>
</template>
