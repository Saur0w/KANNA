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
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // 1. Stagger horizontal reveal of page navigation links (sweeping in from left)
            tl.fromTo(
                `.${styles.navLink}`,
                {
                    x: -35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.07,
                    ease: "power3.out",
                }
            )
                // 2. SplitText letter mask reveal: letters slide up from behind overflow:hidden mask
                .fromTo(
                    `.${styles.char}`,
                    {
                        yPercent: 120,
                        rotateZ: 2.5,
                    },
                    {
                        yPercent: 0,
                        rotateZ: 0,
                        duration: 1.05,
                        stagger: 0.07,
                        ease: "power4.out",
                    },
                    "-=0.45"
                )
                // 3. Socials and credit reveal sliding up
                .fromTo(
                    [`.${styles.socialItem}`, `.${styles.credit}`],
                    {
                        y: 20,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.04,
                        ease: "power3.out",
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
                {/* Top Navigation: Horizontal Underlined Links */}
                <nav className={styles.topNav} aria-label="Footer Navigation">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.label} href={link.href} className={styles.navLink}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Main Big Display Text with Split Letter Mask */}
                <div className={styles.headingWrapper}>
                    <h1 className={styles.mainHeading} aria-label={BRAND_NAME}>
                        {BRAND_NAME.split("").map((char, index) => (
                            <span key={index} className={styles.charMask}>
                                <span className={styles.char}>{char}</span>
                            </span>
                        ))}
                    </h1>
                </div>

                {/* Bottom Bar: Vertical Social Links on Left, Credit on Right */}
                <div className={styles.bottomBar}>
                    <ul className={styles.socialList}>
                        {SOCIAL_LINKS.map((item) => (
                            <li key={item.label} className={styles.socialItem}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                >
                                    <span className={styles.bullet}>•</span> {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.credit}>
                        <p>Made by Saurow</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}