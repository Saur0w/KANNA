"use client";

import styles from "./style.module.scss";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function Objects() {
    const containerRef = useRef<HTMLElement | null>(null);
    const kickerRef = useRef<HTMLSpanElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !titleRef.current || !descRef.current) return;

            const titleSplit = new SplitText(titleRef.current, {
                type: "lines",
                linesClass: styles.lineMask,
            });

            const descSplit = new SplitText(descRef.current, {
                type: "lines",
                linesClass: styles.lineMask,
            });

            titleSplit.lines.forEach((line) => {
                if (line instanceof HTMLElement) line.style.overflow = "hidden";
            });
            descSplit.lines.forEach((line) => {
                if (line instanceof HTMLElement) line.style.overflow = "hidden";
            });

            gsap.set(titleSplit.lines, { yPercent: 110, opacity: 0 });
            gsap.set(descSplit.lines, { yPercent: 110, opacity: 0 });

            // 1. Text entrance animation with Mill3 curves
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: `.${styles.upperSection}`,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            if (kickerRef.current) {
                tl.fromTo(
                    kickerRef.current,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.65, ease: "mill3" },
                    0
                );
            }

            tl.to(
                titleSplit.lines,
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "mill3",
                    stagger: 0.05,
                },
                0.08
            ).to(
                descSplit.lines,
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.85,
                    ease: "mill3",
                    stagger: 0.04,
                },
                0.22
            );

            // 2. Subtle smooth parallax effect across all 3 image panels
            const images = [
                { selector: `.${styles.one} .${styles.image}`, yFactor: -7 },
                { selector: `.${styles.two} .${styles.image}`, yFactor: 8 },
                { selector: `.${styles.three} .${styles.image}`, yFactor: -6 },
            ];

            images.forEach(({ selector, yFactor }) => {
                gsap.fromTo(
                    selector,
                    { yPercent: -yFactor },
                    {
                        yPercent: yFactor,
                        ease: "none",
                        scrollTrigger: {
                            trigger: `.${styles.imageContainers}`,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.2,
                        },
                    }
                );
            });
        },
        {
            scope: containerRef,
        }
    );

    return (
        <section className={styles.objects} ref={containerRef}>
            <div className={styles.upperSection}>
                <div className={styles.titleCol}>
                    <span className={styles.kicker} ref={kickerRef}>05 // SPATIAL VOLUMES</span>
                    <h2 className={styles.title} ref={titleRef}>
                        OBJECTS &amp;
                        <br />
                        ARCHITECTURE
                    </h2>
                </div>

                <div className={styles.descCol}>
                    <p className={styles.description} ref={descRef}>
                        Stripped of excess ornament, each vessel is shaped to interact with
                        shifting natural light. Raw stoneware forms designed to ground
                        modern interiors with tactile texture and quiet composure.
                    </p>
                </div>

                {/* Empty third column to maintain perfect 3-column editorial grid alignment */}
                <div className={styles.emptyCol} />
            </div>

            <div className={styles.imageContainers}>
                <div className={styles.one}>
                    <Image
                        src="/images/parallax/1.jpg"
                        alt="Minimalist warm interior architecture with bench and natural shadows"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.image}
                        priority
                    />
                </div>

                <div className={styles.two}>
                    <Image
                        src="/images/parallax/3.jpg"
                        alt="Glass bottle with dry branch in directional window light"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.image}
                    />
                </div>

                <div className={styles.three}>
                    <Image
                        src="/images/lux.jpg"
                        alt="Raw sculptural stoneware vessel on stone plinth"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
}