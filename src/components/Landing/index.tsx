"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { gsap, useGSAP } from "@/lib/gsap";

const TITLE = "KANNA";

type IntroConfig = {
    charYPercent: number;
    charRotateX: number;
    delay: number;
    charDuration: number;
    charStagger: number;
    phase2Duration: number;
    upperSectionHeight: string;
};

const DESKTOP_CONFIG: IntroConfig = {
    charYPercent: 125,
    charRotateX: -25,
    delay: 0.15,
    charDuration: 1.15,
    charStagger: 0.04,
    phase2Duration: 1.4,
    upperSectionHeight: "60vh",
};

const MOBILE_CONFIG: IntroConfig = {
    charYPercent: 115,
    charRotateX: 0,
    delay: 0.12,
    charDuration: 0.95,
    charStagger: 0.035,
    phase2Duration: 1.25,
    upperSectionHeight: "60vh",
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

                gsap.set(copyRef.current, { opacity: 0, yPercent: 40 });

                gsap.set(chars, {
                    yPercent: cfg.charYPercent,
                    rotateX: cfg.charRotateX,
                    opacity: 0,
                });

                const tl = gsap.timeline({
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
                        ease: "mill3",
                    },
                    0
                )
                    .to(
                        copyRef.current,
                        {
                            opacity: 1,
                            yPercent: 0,
                            duration: 0.9,
                            ease: "mill3",
                        },
                        0.25
                    )
                    .to(
                        bannerRef.current,
                        {
                            height: cfg.upperSectionHeight,
                            duration: cfg.phase2Duration,
                            ease: "mill3-inOut",
                        },
                        ">0.05"
                    );
            };

            mm.add("(min-width: 769px)", () => buildIntro(DESKTOP_CONFIG));
            mm.add("(max-width: 768px)", () => buildIntro(MOBILE_CONFIG));

            if (imageWrapperRef.current && lowerRef.current) {
                gsap.fromTo(
                    imageWrapperRef.current,
                    { yPercent: -4, scale: 1.05 },
                    {
                        yPercent: 5,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: lowerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }
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
                        src="/images/vase.jpg"
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