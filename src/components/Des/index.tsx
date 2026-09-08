"use client";

import styles from "./style.module.scss";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const text = "Conceived as quiet counterpoints to rigid contemporary architecture, Kanna vessels celebrate the tactile honesty of high-fire stoneware and raw mineral glazes. Form follows feeling—creating monolithic focal points that interact with shifting natural light and shadow throughout the day.";

export default function Des() {
    const containerRef = useRef<HTMLElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const kickerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!paragraphRef.current || !containerRef.current) return;

            let splitInstance: SplitText | null = null;
            let tweenInstance: gsap.core.Tween | null = null;

            const initSplit = () => {
                if (!paragraphRef.current || !containerRef.current) return;

                if (tweenInstance) {
                    tweenInstance.kill();
                    tweenInstance = null;
                }
                if (splitInstance) {
                    splitInstance.revert();
                    splitInstance = null;
                }

                splitInstance = new SplitText(paragraphRef.current, {
                    type: "lines",
                    linesClass: styles.line,
                    mask: "lines",
                });

                splitInstance.masks.forEach((mask) => {
                    mask.classList.add(styles.lineMask);
                    if (mask instanceof HTMLElement) {
                        mask.style.overflow = "hidden";
                    }
                });

                gsap.set(splitInstance.lines, {
                    yPercent: 110,
                    opacity: 0,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });

                if (kickerRef.current) {
                    tl.fromTo(
                        kickerRef.current,
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.7, ease: "mill3" },
                        0
                    );
                }

                tl.to(
                    splitInstance.lines,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.95,
                        stagger: 0.05,
                        ease: "mill3",
                    },
                    0.15
                );
            };

            initSplit();

            if (typeof document !== "undefined" && document.fonts) {
                document.fonts.ready.then(() => {
                    initSplit();
                    ScrollTrigger.refresh();
                });
            }

            let resizeTimer: NodeJS.Timeout;
            const handleResize = () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    initSplit();
                    ScrollTrigger.refresh();
                });
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                clearTimeout(resizeTimer);
                if (tweenInstance) {
                    tweenInstance.kill();
                }
                if (splitInstance) {
                    splitInstance.revert();
                }
            };
        },
        { scope: containerRef }
    );

    return (
        <section className={styles.des} ref={containerRef}>
            <div className={styles.container}>
                <div className={styles.leftCol} ref={kickerRef}>
                    <span className={styles.kicker}>01 // CONTEXT</span>
                    <h2 className={styles.sectionHeading}>
                        OBJECTS IN
                        <br />
                        DIALOGUE
                    </h2>
                </div>
                <div className={styles.rightCol}>
                    <p ref={paragraphRef} className={styles.bodyText}>
                        {text}
                    </p>
                </div>
            </div>
        </section>
    );
}