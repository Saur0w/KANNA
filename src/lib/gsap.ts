import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

if (typeof window !== "undefined") {
    ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger, useGSAP };