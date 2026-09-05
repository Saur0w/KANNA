"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import PerspectiveText from "@/ui/PerspectiveText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(() => {

    }, {
        scope: containerRef
    });

    return (
        <section className={styles.projects} ref={containerRef}>
            <div className={styles.body}>
                <div className={styles.heading} data-hover-parent="true">
                    <h1>
                        <PerspectiveText label="View Next Collection" />
                    </h1>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="#2A2A2A"/>
                    </svg>
                </div>
                <div className={styles.imageWrapper}>
                    <Image src="/images/lux.jpg" alt="Projects" fill />
                </div>

                <div className={styles.text} data-hover-parent="true">
                    <h1>
                        <PerspectiveText label="TERRA" secondaryLabel="EXPLORE" />
                    </h1>
                </div>
            </div>
        </section>
    );
}