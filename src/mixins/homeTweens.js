import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import LocomotiveScroll from "locomotive-scroll";

export const homeTweens = {
  mounted: function () {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".home"),
      smooth: true
    });

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

    var introTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scene1",
        scroller: ".home",
        pin: true,
        pinSpacing: true,
        start: "top",
        end: "+=60%",
        scrub: true,
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
      "<"
    );
    introTl.to(
      this.$refs.logo,
      {
        duration: 2.5,
        yPercent: 50,
        autoAlpha: 0
      },
      "<"
    );

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }
};
