"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Objects", href: "/objects" },
    { label: "Kiln & Craft", href: "/craft" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Studio", href: "/studio" },
    { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Instagram", href: "https://instagram.com" },
];

const BRAND_NAME = "KANNA";

export default function Footer() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            if (!wrapperRef.current) return;

            const refreshTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 120);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top 95%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.fromTo(
                `.${styles.navLink}`,
                {
                    yPercent: 125,
                    xPercent: -12,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    xPercent: 0,
                    opacity: 1,
                    duration: 0.85,
                    stagger: 0.06,
                    ease: "mill3",
                }
            )
                .fromTo(
                    `.${styles.char}`,
                    {
                        yPercent: 125,
                        rotateZ: 2.5,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        rotateZ: 0,
                        opacity: 1,
                        duration: 1.05,
                        stagger: 0.055,
                        ease: "mill3",
                    },
                    "-=0.55"
                )
                .fromTo(
                    [`.${styles.socialLink}`, `.${styles.credit} p`],
                    {
                        yPercent: 115,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.04,
                        ease: "mill3",
                    },
                    "-=0.6"
                );

            return () => {
                clearTimeout(refreshTimeout);
            };
        },
        { scope: wrapperRef }
    );

    return (
        <div ref={wrapperRef} className={styles.footerWrapper}>
            <footer ref={containerRef} className={styles.footer}>
                <nav className={styles.topNav} aria-label="Footer Navigation">
                    {NAV_LINKS.map((link) => (
                        <span key={link.label} className={styles.linkMask}>
                            <Link href={link.href} className={styles.navLink}>
                                {link.label}
                            </Link>
                        </span>
                    ))}
                </nav>
                <div className={styles.headingWrapper}>
                    <h1 className={styles.mainHeading} aria-label={BRAND_NAME}>
                        {BRAND_NAME.split("").map((char, index) => (
                            <span key={index} className={styles.charMask}>
                                <span className={styles.char}>{char}</span>
                            </span>
                        ))}
                    </h1>
                </div>

                <div className={styles.bottomBar}>
                    <ul className={styles.socialList}>
                        {SOCIAL_LINKS.map((item) => (
                            <li key={item.label} className={styles.socialItem}>
                                <span className={styles.socialMask}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
                                        <span className={styles.bullet}>•</span> {item.label}
                                    </a>
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.credit}>
                        <span className={styles.creditMask}>
                            <p>Made by Saurow</p>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}