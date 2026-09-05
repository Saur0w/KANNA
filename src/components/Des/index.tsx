"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const text = "Conceived as quiet counterpoints to rigid contemporary architecture, Kanna vessels celebrate the tactile honesty of high-fire stoneware and raw mineral glazes. Form follows feeling—creating monolithic focal points that interact with shifting natural light and shadow throughout the day.";

export default function Des() {
    const containerRef = useRef<HTMLElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);

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
                    yPercent: 120,
                    opacity: 0,
                });

                tweenInstance = gsap.to(splitInstance.lines, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.05,
                    stagger: 0.075,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 78%",
                        toggleActions: "play none none reverse",
                    },
                });
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
                }, 200);
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
            <div className={styles.headingWrapper}>
                <p ref={paragraphRef}>
                    {text}
                </p>
            </div>
        </section>
    );
}