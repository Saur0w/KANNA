"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
    charYPercent: 130,
    charRotateX: -90,
    delay: 0.25,
    charDuration: 1.25,
    charStagger: 0.05,
    phase2Duration: 1.5,
    upperSectionHeight: "60vh",
};

const MOBILE_CONFIG: IntroConfig = {
    charYPercent: 120,
    charRotateX: 0,
    delay: 0.2,
    charDuration: 1,
    charStagger: 0.04,
    phase2Duration: 1.3,
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

                gsap.set(copyRef.current, { opacity: 0, y: 15 });

                gsap.set(chars, {
                    yPercent: cfg.charYPercent,
                    rotateX: cfg.charRotateX,
                    opacity: 0,
                });

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
                        copyRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power3.out",
                        },
                        0.15
                    )
                    .to(
                        bannerRef.current,
                        {
                            height: cfg.upperSectionHeight,
                            duration: cfg.phase2Duration,
                            ease: "expo.inOut",
                        },
                        ">0.05"
                    );
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