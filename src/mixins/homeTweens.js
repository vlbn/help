import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import LocomotiveScroll from "locomotive-scroll";

export const homeTweens = {
  data() {
    return {
      x: null
    };
  },
  mounted: function () {

    // --- locomotive-scroll init --- //

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".home"),
      smooth: true
    });

    this.x = locoScroll;

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".home", {
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
          height: window.innerHeight
        };
      },
      pinType: document.querySelector(".home").style.transform
        ? "transform"
        : "fixed"
    });

    // --- scene 1 --- //

    var introTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scene1",
        scroller: ".home",
        pin: true,
        pinSpacing: true,
        start: "top%",
        end: "bottom 10px",
        scrub: .1,
        markers: false
      }
    });
    introTl.to(
      this.$refs.mouseIcon,
      {
        duration: 1.5,
        yPercent: -200,
        autoAlpha: 0
      },
    );
    introTl.to(
      this.$refs.logo,
      {
        duration: 2.5,
        yPercent: 50,
        autoAlpha: 0
      },
    );
    
    // --- scene 2 --- //

    gsap.from(".namaste", {
      scrollTrigger: {
        trigger: ".scene2",
        scroller: ".home",
        scrub: 1,
        start: "top 50%",
        end: "bottom 100%"
      },
      scaleX: 0,
      transformOrigin: "left center", 
      ease: "none"
    });
    
    // --- scrollTrigger update, do not move this --- //

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
    
  },
  methods: {
    scrollMeTo(target, duration) {
      var z = this.x;
      z.scrollTo(target, duration);
    }
  }
};
