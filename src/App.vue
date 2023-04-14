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

// scene 1
let scene1Actor1 = ref();
let scene1Actor2 = ref();
let scene1Actor3 = ref();
let scene1Actor4 = ref();

// scene 2
let scene2Actor1 = ref();

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

  //

  gsap.set(scene1Actor3.value, {
    autoAlpha: 0,
    scale: 0,
    y: 0,
  });

  gsap.set(scene1Actor4.value, {
    y: -100,
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
      scrub: 3,
      markers: true,
    },
  });
  introTl.to(scene1Actor1.value, {
    duration: 2.5,
    yPercent: 50,
    autoAlpha: 0,
  });
  introTl.to(scene1Actor2.value, {
    duration: 5.5,
    autoAlpha: 0,
    scale: 2.9,
    xPercent: 150,
  });
  introTl.to(scene1Actor4.value, {
    autoAlpha: 0,
    duration: 5.5,
    y: 10,
  });
  introTl.to(scene1Actor3.value, {
    autoAlpha: 1,
    duration: 4.5,
    scale: 1,
    y: -100,
  });

  // --- scene 2 --- //

  let scene2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene2",
      scroller: ".wrapper",
      pin: true,
      pinSpacing: true,
      start: "top 0%",
      end: "bottom 80%",
      scrub: 2,
      markers: true,
    },
  });
  scene2Tl.to(scene2Actor1.value, {
    duration: 2.5,
    yPercent: 50,
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
        <div
          class="is-fixed-b is-flex is-justify-content-space-evenly"
          ref="scene1Actor3"
        >
          <figure class="image is-128x128">
            <img
              class="is-rounded pointer"
              src="https://picsum.photos/200"
              @click="scrollMeTo('.scene2', 1.5)"
            />
          </figure>
        </div>
      </div>
      <!-- fancy mouse icon -->
      <div class="is-flex is-justify-content-center" ref="scene1Actor4">
        <FancyMouseIcon @click="scrollMeTo('.is-fixed-b', 0.5)" />
      </div>
    </section>
    <!-- scene 2 -->
    <section class="scene2 hero is-fullheight is-danger">
      <div class="hero-body is-flex is-justify-content-center">
        <div class="m-6 pointer" @click="scrollMeTo('.wrapper', 1.5)">
          <img src="https://picsum.photos/900/600" />
        </div>
        <div class="is-size-5" ref="scene2Actor1">
          <a href="https://github.com/vlbn/help"><GitHubLogo /></a>
        </div>
      </div>
    </section>
  </div>
</template>
