"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";

interface SkewOptions {
    maxSkew?: number;
    factor?: number;
}

export function useScrollSkew<T extends HTMLElement>({ maxSkew = 4, factor = 0.06 }: SkewOptions = {}) {
    const ref = useRef<T>(null);
    const skewTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

    useGSAP(
        () => {
            if (!ref.current) return;
            gsap.set(ref.current, { transformOrigin: "50% 50%", force3D: true });
            skewTo.current = gsap.quickTo(ref.current, "skewY", { duration: 0.6, ease: "power3.out" });
            return () => {
                skewTo.current = null;
            };
        },
        { scope: ref }
    );

    useLenis(
        (lenis) => {
            if (!skewTo.current) return;
            const raw = lenis.isScrolling === "smooth" ? lenis.velocity * factor : 0;
            const skew = gsap.utils.clamp(-maxSkew, maxSkew, raw);
            skewTo.current(Math.abs(skew) < 0.01 ? 0 : skew);
        },
        [maxSkew, factor]
    );

    return ref;
}