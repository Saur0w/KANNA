"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const text = "Conceived as quiet counterpoints to rigid contemporary architecture, Kanna vessels celebrate the tactile honesty of high-fire stoneware and raw mineral glazes. Form follows feeling—creating monolithic focal points that interact with shifting natural light and shadow throughout the day."

export default function Des() {
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(() => {

    }, {
        scope: containerRef
    });

    return (
        <section className={styles.des} ref={containerRef}>
            <div className={styles.headingWrapper}>
                <p>
                    {text}
                </p>
            </div>
        </section>
    );
}