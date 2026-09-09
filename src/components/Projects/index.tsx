"use client";

import styles from "./style.module.scss";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PerspectiveText from "@/ui/PerspectiveText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
    const containerRef = useRef<HTMLElement | null>(null);
    const headingRef = useRef<HTMLAnchorElement | null>(null);
    const imageCardRef = useRef<HTMLAnchorElement | null>(null);
    const textRef = useRef<HTMLAnchorElement | null>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });

        if (headingRef.current) {
            tl.fromTo(
                headingRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.75, ease: "mill3" },
                0
            );
        }

        if (imageCardRef.current) {
            tl.fromTo(
                imageCardRef.current,
                { opacity: 0, y: 30, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "mill3" },
                0.1
            );
        }

        if (textRef.current) {
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.85, ease: "mill3" },
                0.15
            );
        }
    }, {
        scope: containerRef
    });

    return (
        <section className={styles.projects} ref={containerRef}>
            <div className={styles.body}>
                <Link
                    href="/objects"
                    className={styles.heading}
                    ref={headingRef}
                    data-hover-parent="true"
                    aria-label="View Next Collection"
                >
                    <span className={styles.headingLabel}>
                        <PerspectiveText label="View Next Collection" />
                    </span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.arrowIcon}
                        aria-hidden="true"
                    >
                        <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="currentColor"/>
                    </svg>
                </Link>

                <div className={styles.bottomRow}>
                    <Link
                        href="/objects"
                        className={styles.imageCard}
                        ref={imageCardRef}
                        aria-label="Terra Collection preview Lookbook 2026"
                    >
                        <div className={styles.imageInner}>
                            <Image
                                src="/images/lux.jpg"
                                alt="Terra collection ceramic anchor"
                                fill
                                sizes="(max-width: 640px) 240px, (max-width: 1024px) 240px, 280px"
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.imageMeta}>
                            <span className={styles.metaYear}>2026</span>
                            <span className={styles.metaTag}>LOOKBOOK</span>
                        </div>
                    </Link>

                    <Link
                        href="/objects"
                        className={styles.text}
                        ref={textRef}
                        data-hover-parent="true"
                        aria-label="TERRA Collection"
                    >
                        <h2 className={styles.title}>
                            <PerspectiveText label="TERRA" secondaryLabel="SOMA" />
                        </h2>
                    </Link>
                </div>
            </div>
        </section>
    );
}