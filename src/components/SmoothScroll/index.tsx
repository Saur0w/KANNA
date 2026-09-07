"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const COARSE = "(pointer: coarse)";
const REDUCED = "(prefers-reduced-motion: reduce)";

function ScrollTriggerBridge() {
    useLenis(() => ScrollTrigger.update());
    return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<LenisRef>(null);
    const [smooth, setSmooth] = useState(true);

    useEffect(() => {
        const queries = [window.matchMedia(COARSE), window.matchMedia(REDUCED)];
        const evaluate = () => setSmooth(!queries.some((q) => q.matches));
        evaluate();
        queries.forEach((q) => q.addEventListener("change", evaluate));
        return () => queries.forEach((q) => q.removeEventListener("change", evaluate));
    }, []);

    useEffect(() => {
        const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();

        return () => {
            gsap.ticker.remove(update);
            gsap.ticker.lagSmoothing(500, 33);
        };
    }, [smooth]);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,
                smoothWheel: smooth,
                syncTouch: false,
                lerp: 0.085,
                wheelMultiplier: 0.9,
                anchors: true,
            }}
        >
            <ScrollTriggerBridge />
            {children}
        </ReactLenis>
    );
}