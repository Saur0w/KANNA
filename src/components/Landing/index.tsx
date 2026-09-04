"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TITLE = "KANNA";

export default function Landing() {
    const containerRef = useRef<HTMLElement | null>(null);
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const copyRef = useRef<HTMLParagraphElement | null>(null);
    const imageWrapperRef = useRef<HTMLDivElement | null>(null);
    const lowerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const chars = gsap.utils.toArray<HTMLElement>(`.${styles.char}`);
            const mm = gsap.matchMedia();

            mm.add("(min-width: 769px)", () => {
                if (!copyRef.current) return;

                const split = new SplitText(copyRef.current, {
                    type: "lines",
                    linesClass: styles.line,
                    mask: "lines",
                });

                split.masks.forEach((mask) => {
                    mask.classList.add(styles.lineMask);
                    if (mask instanceof HTMLElement) {
                        mask.style.overflow = "hidden";
                    }
                });

                gsap.set(bannerRef.current, { height: "80vh" });
                gsap.set(chars, { yPercent: 130, rotateX: -90, opacity: 0 });
                gsap.set(split.lines, {
                    yPercent: 120,
                    opacity: 0,
                });

                const tl = gsap.timeline({
                    defaults: { ease: "expo.out" },
                    delay: 0.3,
                });

                tl.to(bannerRef.current, {
                    height: "60vh",
                    duration: 1.6,
                    ease: "expo.inOut",
                })
                    .to(
                        imageWrapperRef.current,
                        {
                            duration: 1.8,
                            ease: "expo.out",
                        },
                        "<0.1"
                    )
                    .to(
                        chars,
                        {
                            yPercent: 0,
                            rotateX: 0,
                            opacity: 1,
                            duration: 1.3,
                            stagger: 0.055,
                            ease: "power4.out",
                        },
                        "-=1.4"
                    )
                    .to(
                        split.lines,
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 1.2,
                            stagger: 0.08,
                            ease: "power4.out",
                        },
                        "-=0.9"
                    );

                gsap.to(imageWrapperRef.current, {
                    yPercent: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });

                return () => {
                    split.revert();
                };
            });

            mm.add("(max-width: 768px)", () => {
                if (!copyRef.current) return;

                const split = new SplitText(copyRef.current, {
                    type: "lines",
                    linesClass: styles.line,
                    mask: "lines",
                });

                split.masks.forEach((mask) => {
                    mask.classList.add(styles.lineMask);
                    if (mask instanceof HTMLElement) {
                        mask.style.overflow = "hidden";
                    }
                });

                gsap.set(chars, { yPercent: 120, opacity: 0 });
                gsap.set(split.lines, { yPercent: 120, opacity: 0 });
                gsap.set(imageWrapperRef.current, { scale: 1.08 });

                const tl = gsap.timeline({
                    defaults: { ease: "expo.out" },
                    delay: 0.2,
                });

                tl.to(
                    imageWrapperRef.current,
                    { scale: 1, duration: 1.4, ease: "expo.out" },
                    0
                )
                    .to(
                        chars,
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 1,
                            stagger: 0.04,
                            ease: "power4.out",
                        },
                        0.2
                    )
                    .to(
                        split.lines,
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 0.9,
                            stagger: 0.06,
                            ease: "power3.out",
                        },
                        "-=0.5"
                    );

                gsap.to(imageWrapperRef.current, {
                    yPercent: -5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });

                return () => {
                    split.revert();
                };
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

            <div ref={lowerRef} className={styles.lowerSection}>
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