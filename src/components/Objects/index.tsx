"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Objects() {
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            // 1. Text entrance animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: `.${styles.upperSection}`,
                    start: "top 80%",
                },
            });

            tl.from(`.${styles.title}`, {
                opacity: 0,
                y: 25,
                duration: 1,
                ease: "power3.out",
            }).from(
                `.${styles.description}`,
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.9,
                    ease: "power3.out",
                },
                "-=0.6"
            );

            // 2. Subtle smooth parallax effect across all 3 image panels
            const images = [
                { selector: `.${styles.one} .${styles.image}`, yFactor: -6 },
                { selector: `.${styles.two} .${styles.image}`, yFactor: 7 },
                { selector: `.${styles.three} .${styles.image}`, yFactor: -5 },
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
                    <h2 className={styles.title}>
                        OBJECTS &amp;
                        <br />
                        ARCHITECTURE
                    </h2>
                </div>

                <div className={styles.descCol}>
                    <p className={styles.description}>
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