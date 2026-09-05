"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PerspectiveText() {
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(() => {

    }, { scope: containerRef })

    return (
        <section className={styles.text} ref={containerRef}>

        </section>
    )
}