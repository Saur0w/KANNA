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

type IntroConfig = {
    charYPercent: number;
    charRotateX: number;
    delay: number;
    charDuration: number;
    charStagger: number;
    lineDuration: number;
    lineStagger: number;
    lineEase: string;
    wrapperY: string;
    phase2Duration: number;
    imgYPercent: number;
};

const DESKTOP_CONFIG: IntroConfig = {
    charYPercent: 130,
    charRotateX: -90,
    delay: 0.25,
    charDuration: 1.25,
    charStagger: 0.05,
    lineDuration: 1.15,
    lineStagger: 0.075,
    lineEase: "power4.out",
    wrapperY: "25vh",
    phase2Duration: 1.5,
    imgYPercent: -10,
};

const MOBILE_CONFIG: IntroConfig = {
    charYPercent: 120,
    charRotateX: 0,
    delay: 0.2,
    charDuration: 1,
    charStagger: 0.04,
    lineDuration: 0.9,
    lineStagger: 0.05,
    lineEase: "power3.out",
    wrapperY: "20vh",
    phase2Duration: 1.3,
    imgYPercent: -5,
};

export default function Landing() {
    const containerRef = useRef<HTMLElement | null>(null);
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const headingWrapperRef = useRef<HTMLDivElement | null>(null);
    const copyRef = useRef<HTMLParagraphElement | null>(null);
    const imageWrapperRef = useRef<HTMLDivElement | null>(null);
    const lowerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const chars = gsap.utils.toArray<HTMLElement>(`.${styles.char}`);
            const mm = gsap.matchMedia();

            const buildIntro = (cfg: IntroConfig) => {
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

                gsap.set(copyRef.current, { opacity: 1 });

                gsap.set(chars, {
                    yPercent: cfg.charYPercent,
                    rotateX: cfg.charRotateX,
                    opacity: 0,
                });
                gsap.set(split.lines, { yPercent: 120, opacity: 0 });
                gsap.set([lowerRef.current, headingWrapperRef.current], {
                    y: cfg.wrapperY,
                });
                gsap.set(imageWrapperRef.current, { scale: 1.08 });

                const tl = gsap.timeline({
                    defaults: { ease: "expo.out" },
                    delay: cfg.delay,
                });

                tl.to(
                    chars,
                    {
                        yPercent: 0,
                        rotateX: 0,
                        opacity: 1,
                        duration: cfg.charDuration,
                        stagger: cfg.charStagger,
                        ease: "power4.out",
                    },
                    0
                )
                    .to(
                        split.lines,
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: cfg.lineDuration,
                            stagger: cfg.lineStagger,
                            ease: cfg.lineEase,
                        },
                        0.15
                    )
                
                    .to(
                        [lowerRef.current, headingWrapperRef.current],
                        {
                            y: 0,
                            duration: cfg.phase2Duration,
                            ease: "expo.inOut",
                        },
                        ">0.05"
                    )
                    .to(
                        imageWrapperRef.current,
                        {
                            scale: 1,
                            duration: cfg.phase2Duration,
                            ease: "expo.out",
                        },
                        "<"
                    );

                gsap.to(imageWrapperRef.current, {
                    yPercent: cfg.imgYPercent,
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
            };

            mm.add("(min-width: 769px)", () => buildIntro(DESKTOP_CONFIG));
            mm.add("(max-width: 768px)", () => buildIntro(MOBILE_CONFIG));
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

                <div ref={headingWrapperRef} className={styles.headingWrapper}>
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