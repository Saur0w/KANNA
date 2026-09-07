"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./style.module.scss";

type Props = Omit<ImageProps, "fill"> & {
    className?: string;
    strength?: number;
};

export default function ParallaxImage({ className, strength = 8, alt, ...img }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!wrapperRef.current || !innerRef.current) return;
        gsap.fromTo(
            innerRef.current,
            { yPercent: -strength },
            {
                yPercent: strength,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    }, { scope: wrapperRef, dependencies: [strength] });

    return (
        <div ref={wrapperRef} className={`${styles.wrapper} ${className ?? ""}`}>
            <div ref={innerRef} className={styles.inner}>
                <Image fill alt={alt} {...img} />
            </div>
        </div>
    );
}