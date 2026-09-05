"use client";

import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Link from "./Link";
import PerspectiveText from "@/ui/PerspectiveText";

gsap.registerPlugin(CustomEase);

if (typeof window !== "undefined") {
    try {
        CustomEase.create("snellenberg", "0.76, 0, 0.24, 1");
    } catch {
        // Fallback handled by GSAP
    }
}

interface NavItem {
    title: string;
    href: string;
}

interface NavProps {
    isActive?: boolean;
    onClose?: () => void;
}

const navItems: NavItem[] = [
    { title: "Objects", href: "/" },
    { title: "Kiln & Craft", href: "/" },
    { title: "Lookbook", href: "/" },
    { title: "Studio", href: "/" },
    { title: "Contact", href: "/" }
];

export default function Nav({ isActive = true, onClose }: NavProps) {
    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLDivElement | null>(null);
    const headerTagRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!menuRef.current) return;

            if (isActive) {
                // Fade in backdrop
                if (backdropRef.current) {
                    gsap.fromTo(
                        backdropRef.current,
                        { opacity: 0 },
                        { opacity: 1, duration: 0.6, ease: "power2.out" }
                    );
                }

                // Slide in drawer with snellenberg custom ease
                gsap.fromTo(
                    menuRef.current,
                    { x: "-100%" },
                    {
                        x: "0%",
                        duration: 0.75,
                        ease: "snellenberg",
                    }
                );

                // Header tag reveal
                if (headerTagRef.current) {
                    gsap.fromTo(
                        headerTagRef.current,
                        { opacity: 0, y: -12 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            delay: 0.18,
                            ease: "power3.out",
                        }
                    );
                }

                // Footer metadata reveal
                if (footerRef.current) {
                    gsap.fromTo(
                        footerRef.current,
                        { opacity: 0, y: 24 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            delay: 0.32,
                            ease: "snellenberg",
                        }
                    );
                }
            } else {
                // Fade out backdrop
                if (backdropRef.current) {
                    gsap.to(backdropRef.current, {
                        opacity: 0,
                        duration: 0.45,
                        ease: "power2.in",
                    });
                }

                // Fade out footer
                if (footerRef.current) {
                    gsap.to(footerRef.current, {
                        opacity: 0,
                        y: 15,
                        duration: 0.3,
                        ease: "power2.in",
                    });
                }

                // Slide out drawer
                gsap.to(menuRef.current, {
                    x: "-100%",
                    duration: 0.65,
                    ease: "snellenberg",
                    onComplete: () => {
                        if (onClose) onClose();
                    },
                });
            }
        },
        { dependencies: [isActive] }
    );

    return (
        <>
            <div
                ref={backdropRef}
                className={styles.backdrop}
                onClick={onClose}
                aria-label="Close navigation overlay"
            />

            <div ref={menuRef} className={styles.menu}>
                <div className={styles.body}>
                    <div ref={headerTagRef} className={styles.headerTag}>
                        <span className={styles.tagDot} />
                        <span className={styles.tagText}>INDEX // NAVIGATION</span>
                    </div>

                    <div
                        onMouseLeave={() => setSelectedIndicator(pathname)}
                        className={styles.nav}
                    >
                        {navItems.map((data, index) => (
                            <Link
                                key={index}
                                data={{ ...data, index }}
                                isActive={selectedIndicator === data.href}
                                setSelectedIndicator={setSelectedIndicator}
                                isExiting={!isActive}
                            />
                        ))}
                    </div>

                    <div ref={footerRef} className={styles.footer}>
                        <div className={styles.footerCol}>
                            <span className={styles.footerLabel}>STUDIO</span>
                            <p className={styles.footerText}>Kyoto · Tokyo · Paris</p>
                            <p className={styles.footerSub}>Artisanal stoneware & spatial anchors</p>
                        </div>
                        <div className={styles.footerCol}>
                            <span className={styles.footerLabel}>CONNECT</span>
                            <div className={styles.footerLinks}>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <PerspectiveText label="Instagram ↗" />
                                </a>
                                <a href="/">
                                    <PerspectiveText label="Journal ↗" />
                                </a>
                                <a href="/">
                                    <PerspectiveText label="Inquiries ↗" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}