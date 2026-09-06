"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

export default function Workshop() {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section className={styles.workshop} ref={containerRef}>
            <div className={styles.left}>

            </div>
            <div className={styles.right}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="/images/workshop.png" alt="workshop" fill
                    />
                </div>
            </div>
        </section>
    );
    
}