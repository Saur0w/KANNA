"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { gsap, useGSAP } from "@/lib/gsap";

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
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // 1. Stagger top nav links sliding up into view
            tl.from(`.${styles.navLink}`, {
                y: 20,
                opacity: 0,
                duration: 0.7,
                stagger: 0.05,
                ease: "power3.out",
            })
                // 2. Split letter mask reveal: letters slide up from behind overflow:hidden
                .from(
                    `.${styles.char}`,
                    {
                        yPercent: 115,
                        rotateZ: 3,
                        duration: 1.1,
                        stagger: 0.08,
                        ease: "power4.out",
                    },
                    "-=0.4"
                )
                // 3. Socials and credit reveal
                .from(
                    [`.${styles.socialItem}`, `.${styles.credit}`],
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.04,
                        ease: "power3.out",
                    },
                    "-=0.7"
                );
        },
        { scope: containerRef }
    );

    return (
        <footer className={styles.footer} ref={containerRef}>
            {/* Top Navigation */}
            <nav className={styles.topNav} aria-label="Footer Navigation">
                {NAV_LINKS.map((link) => (
                    <Link key={link.label} href={link.href} className={styles.navLink}>
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Main Big Display Text with Split Mask */}
            <div className={styles.headingWrapper}>
                <h1 className={styles.mainHeading} aria-label={BRAND_NAME}>
                    {BRAND_NAME.split("").map((char, index) => (
                        <span key={index} className={styles.charMask}>
              <span className={styles.char}>{char}</span>
            </span>
                    ))}
                </h1>
            </div>

            {/* Bottom Bar: Social Links & Signature */}
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
    );
}