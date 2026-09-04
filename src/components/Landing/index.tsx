"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "KANNA";

export default function Landing() {
    const containerRef = useRef<HTMLElement | null>(null);
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const copyRef = useRef<HTMLParagraphElement | null>(null);
    const imageWrapperRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const chars = gsap.utils.toArray<HTMLElement>(`.${styles.char}`);

            const tl = gsap.timeline({
                defaults: { ease: "power4.out" },
            });

            // Set initial states to avoid flash
            gsap.set(bannerRef.current, { height: "80vh" });
            gsap.set(chars, { yPercent: 120 });
            gsap.set(copyRef.current, { opacity: 0, y: 24 });
            gsap.set(imageWrapperRef.current, { scale: 1.15 });

            // Settle banner height and reveal letters
            tl.to(bannerRef.current, {
                height: "60vh",
                duration: 1.5,
                ease: "expo.out",
            })
                .to(
                    imageWrapperRef.current,
                    {
                        scale: 1,
                        duration: 1.6,
                        ease: "expo.out",
                    },
                    "<"
                )
                .to(
                    chars,
                    {
                        yPercent: 0,
                        duration: 1.2,
                        stagger: 0.04,
                        ease: "power4.out",
                    },
                    "-=1.1"
                )
                .to(
                    copyRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.9"
                );

            // Parallax scroll on the lower hero image
            gsap.to(imageWrapperRef.current, {
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className={styles.landing}>
            <div ref={bannerRef} className={styles.upperSection}>
                <div className={styles.metaRow}>
                    <p ref={copyRef} className={styles.copy}>
                        Shaped by hand, tempered by flame. Monolithic forms designed with
                        quiet restraint to elevate botanical silhouettes and bring grounding
                        texture to living spaces.
                    </p>
                </div>

                <div className={styles.headingWrapper}>
                    <h1 className={styles.heading} aria-label={TITLE}>
                        {TITLE.split("").map((char, index) => (
                            <span key={index} className={styles.charMask}>
                <span className={styles.char}>{char}</span>
              </span>
                        ))}
                    </h1>
                </div>
            </div>

            <div className={styles.lowerSection}>
                <div ref={imageWrapperRef} className={styles.imageWrapper}>
                    <Image
                        src="/images/landing.png"
                        alt="Kanna ceramic vase"
                        fill
                        priority
                        unoptimized
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
}