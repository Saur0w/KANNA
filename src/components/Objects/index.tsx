"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Objects() {
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(() => {

    }, {
        scope: containerRef
    });

    return (
        <section className={styles.objects} ref={containerRef}>
            <div className={styles.upperSection}>

            </div>
            <div className={styles.imageContainers}>
                <div className={styles.one}>

                </div>
                <div className={styles.two}>

                </div>
                <div className={styles.three}>

                </div>
            </div>
        </section>
    )
}