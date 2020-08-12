import { gsap } from "gsap";

export const mousePointer = {
  mounted: function() {
    this.pointersTl = gsap
      .timeline()
      .to(this.$refs.mousePointerA, 0.1, {
        scale: 0,
      })
      .to(this.$refs.mousePointerB, 0.3, {
        scale: 3,
        ease: "bounce",
      })
      .reverse();
  },
  created: function() {
    window.addEventListener("mousemove", this.mousePointerAttach);
  },
  destroyed: function() {
    window.removeEventListener("mousemove", this.mousePointerAttach);
  },
  methods: {
    mousePointerAttach(e) {
      gsap.to(this.$refs.mousePointerA, 0.5, {
        x: e.clientX,
        y: e.clientY,
        autoAlpha: 1,
      });
      gsap.to(this.$refs.mousePointerB, 0.9, {
        x: e.clientX,
        y: e.clientY,
        autoAlpha: 1,
      });
    },
    mousePointerEnter() {
      this.pointersTl.play();
      gsap.to(this.$refs.mousePointerA, 0, { zIndex: -1 });
      gsap.to(this.$refs.mousePointerB, 0, { zIndex: 0 });
    },
    mousePointerLeave() {
      this.pointersTl.reverse();
      gsap.to(this.$refs.mousePointerA, 0, { zIndex: 2 });
      gsap.to(this.$refs.mousePointerB, 0, { zIndex: 1 });
    },
  },
  beforeDestroy() {
    this.pointersTl.kill();
    this.pointersTl = null;
  },
};
