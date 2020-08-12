<template>
  <div class="home">

    <!-- my custom pointer -->
    <div ref="mousePointerA" class="mouse-pointer-a"></div>
    <div ref="mousePointerB" class="mouse-pointer-b"></div>

    <!-- scene 1 -->
    <section class="fv-100 scene1">
      <div ref="separador1" class="separador-1"></div>
      <div ref="nombre" class="nombre">
        <figure class="image is-100x100">
          <img
            class="is-rounded"
            src="@/assets/images/x.jpg"
            alt="help me world"
          />
        </figure>
      </div>

      <div
        ref="mouseIcon"
        class="mouse-container"
        @click="scrollMeTo('.scene2', 4)"
        @mouseenter="mousePointerEnter"
        @mouseleave="mousePointerLeave"
      >
        <div class="mouse-body">
          <div class="mouse-wheel"></div>
        </div>
      </div>
    </section>

    <!-- scene 2 -->
    <section class="fv-100 scene2 centerXY has-background-warning has-text-white">
      <div
        @mouseenter="mousePointerEnter"
        @mouseleave="mousePointerLeave"
      >
        <h1 class="is-size-1">help me world =(</h1>
      </div>
    </section>

  </div>
</template>

<script>
// mixins are sexy yeah!
import { mousePointer } from "../mixins/mousePointer";
import { reUsables } from "../mixins/reUsables";
import { homeTweens } from "../mixins/homeTweens";

export default {
  mixins: [mousePointer, reUsables, homeTweens],
  name: "Home",
};
</script>
