import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

if (typeof window !== "undefined") {
    ScrollTrigger.config({ ignoreMobileResize: true });
    try {
        CustomEase.create("mill3", "0.16, 1, 0.3, 1");
        CustomEase.create("mill3-inOut", "0.76, 0, 0.24, 1");
        CustomEase.create("mill3-expo", "0.19, 1, 0.22, 1");
        CustomEase.create("kanna", "0.76, 0, 0.24, 1");
    } catch {
        // Fallback handled by GSAP defaults
    }
}

export { gsap, ScrollTrigger, CustomEase, useGSAP };