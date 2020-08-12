import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export const reUsables = {
  methods: {
    scrollMeTo(destination, duration) {
      gsap.to(window, { duration: duration, scrollTo: destination});
    }    
  },
};
