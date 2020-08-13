<template>
  <div class="home">
    <!-- my custom pointer -->
    <div ref="mousePointerA" class="mouse-pointer-a"></div>
    <div ref="mousePointerB" class="mouse-pointer-b"></div>

    <!-- scene 1 -->
    <section class="fv-100 scene1">
      <div ref="logo" class="logo">
        <figure class="image is-100x100">
          <img class="is-rounded" src="../assets/images/logo.jpg" alt="help me world">
        </figure>
      </div>

      <div
        ref="mouseIcon"
        class="mouse-container pointer"
        @click="scrollMeTo('.scene2', 3)"
        @mouseenter="mousePointerEnter"
        @mouseleave="mousePointerLeave"
      >
        <div class="mouse-body">
          <div class="mouse-wheel"></div>
        </div>
      </div>
    </section>

    <!-- scene 2 -->
    <section class="fv-100 scene2 centerXY has-background-success has-text-white">
      <div @mouseenter="mousePointerEnter" @mouseleave="mousePointerLeave">
        <h1 class="is-size-1">😌 namaste</h1>
      </div>
    </section>
  </div>
</template>

<script>
// mixins are sexy yeah!
import { mousePointer } from "../mixins/mousePointer";
import { homeTweens } from "../mixins/homeTweens";

export default {
  mixins: [mousePointer, homeTweens],
  name: "Home"
};
</script>