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

// --- the actors refs --- //

// scene 1
let scene1Actor1 = ref();
let scene1Actor2 = ref();
let scene1Actor4 = ref();

// scene 2
let scene2Actor1 = ref();
let scene2Actor2 = ref();

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

  // --- initial properties --- //

  // fancy mouse icon
  gsap.set(scene1Actor4.value, {
    y: -100,
  });

  // the background image
  gsap.set(scene2Actor1.value, {
    duration: 3,
    autoAlpha: 0,
    scale: 1,
    x: 0,
    y: -900,
  });

  // github logo
  gsap.set(scene2Actor2.value, {
    duration: 2,
    scale: 0.5,
    autoAlpha: 0,
  });

  // --- scene 1 --- //

  let introTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene1",
      scroller: ".wrapper",
      pin: true,
      pinSpacing: true,
      start: "top 0%",
      end: "bottom 80%",
      scrub: 2,
      markers: true,
    },
  });
  introTl.to(scene1Actor1.value, {
    duration: 2.5,
    yPercent: 50,
    autoAlpha: 0,
  });
  introTl.to(scene1Actor2.value, {
    duration: 3.5,
    autoAlpha: 0,
    scale: 2.9,
    xPercent: 150,
  });
  introTl.to(scene1Actor4.value, {
    autoAlpha: 0,
    duration: 5.5,
    y: 10,
  });

  // --- scene 2 --- //

  let scene2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene2",
      scroller: ".wrapper",
      pin: false,
      pinSpacing: true,
      start: "top 80%",
      end: "bottom 100%",
      scrub: 0,
      markers: true,
    },
  });
  scene2Tl.to(scene2Actor1.value, {
    duration: 5,
    autoAlpha: 1,
    scale: 1.9,
    y: 0,
  });

  scene2Tl.to(scene2Actor2.value, {
    duration: 2,
    autoAlpha: 1,
    scale: 0.3,
  });

  // --- scrollTrigger update, do not move this --- //

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  //
});

// --- methods --- //
const scrollMeTo = (target, duration) => {
  lmsInstance.value.scrollTo(target, duration);
};

//
</script>

<template>
  <div class="wrapper">
    <!-- scene 1 -->
    <section class="scene1 hero is-fullheight">
      <div class="hero-body is-flex is-justify-content-center">
        <div ref="scene1Actor1" class="mr-5">
          <img src="./assets/media/fancy.svg" />
        </div>
        <div ref="scene1Actor2">
          <strong>gsap</strong> excercise with
          <strong class="is-size-4">locomotive-scroll</strong> and
          <strong>vue</strong>
        </div>
        <!-- fancy mouse icon -->
        <div class="is-flex is-justify-content-center is-fixed-b" ref="scene1Actor4">
          <FancyMouseIcon @click="scrollMeTo('.scene2', 0.5)" />
        </div>
      </div>
    </section>
    <!-- scene 2 -->
    <section class="scene2 hero is-fullheight">
      <div
        ref="scene2Actor1"
        class="hero-body pointer is-justify-content-center vlbn"
        @click.self="scrollMeTo('.wrapper', 2.5)"
      >
        <div class="m-1" ref="scene2Actor2">
          <a href="https://github.com/vlbn/help"
            ><GitHubLogo />
            <h1>vlbn</h1>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
