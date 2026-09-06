"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import PerspectiveText from "@/ui/PerspectiveText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Nav from "./nav";

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

if (typeof window !== "undefined") {
    try {
        CustomEase.create("kanna", "0.76, 0, 0.24, 1");
        CustomEase.create("snellenberg", "0.76, 0, 0.24, 1");
        CustomEase.create("pop", "0.34, 1.56, 0.64, 1");
    } catch {
        // Fallback handled by GSAP
    }
}

const NAV_ITEMS = [
    { label: "Objects", href: "/" },
    { label: "Kiln & Craft", href: "/" },
    { label: "Lookbook", href: "/" },
    { label: "Studio", href: "/" },
    { label: "Contact", href: "/" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    const [isActive, setIsActive] = useState(false);
    const [isNavMounted, setIsNavMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            setIsActive((current) => (current ? false : current));
        });

        return () => cancelAnimationFrame(frameId);
    }, [pathname]);

    const toggleMenu = () => {
        if (!isActive) {
            setIsNavMounted(true);
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };

    const handleNavClose = () => {
        setIsNavMounted(false);
    };

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // Desktop (min-width: 769px)
            mm.add("(min-width: 769px)", () => {
                // Floating scroll button starts scaled to 0
                gsap.set(buttonRef.current, { scale: 0 });

                // Initial mask reveal for desktop header items
                const navItems = gsap.utils.toArray<HTMLElement>(`.${styles.navItem}`);
                gsap.set(navItems, {
                    yPercent: 120,
                    opacity: 0,
                });

                gsap.to(navItems, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.06,
                    delay: 0.35,
                    ease: "kanna",
                });

                ScrollTrigger.create({
                    trigger: document.documentElement,
                    start: 0,
                    end: window.innerHeight * 0.45,
                    onLeave: () => {
                        // Reveal floating hamburger button on scroll
                        gsap.to(buttonRef.current, {
                            scale: 1,
                            duration: 0.4,
                            ease: "pop",
                        });
                        // Hide main header
                        gsap.to(headerRef.current, {
                            y: -60,
                            opacity: 0,
                            duration: 0.4,
                            ease: "kanna",
                            pointerEvents: "none",
                        });
                    },
                    onEnterBack: () => {
                        // Hide floating hamburger button
                        gsap.to(buttonRef.current, {
                            scale: 0,
                            duration: 0.25,
                            ease: "power2.in",
                            onComplete: () => {
                                setIsActive(false);
                            },
                        });
                        // Reveal main header back
                        gsap.to(headerRef.current, {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: "kanna",
                            pointerEvents: "auto",
                        });
                    },
                });
            });

            // Mobile (max-width: 768px)
            mm.add("(max-width: 768px)", () => {
                // Circular button is not used on mobile
                gsap.set(buttonRef.current, { scale: 0 });

                const mobileTrigger = document.querySelector<HTMLElement>(`.${styles.mobileNavTrigger}`);
                if (mobileTrigger) {
                    gsap.set(mobileTrigger, { y: 20, opacity: 0 });
                    gsap.to(mobileTrigger, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.35,
                        ease: "kanna",
                    });
                }
            });
        },
        { scope: headerRef }
    );

    return (
        <>
            <header ref={headerRef} className={styles.header}>
                <div className={styles.body}>
                    <nav>
                        {/* Desktop Navigation Links */}
                        <ul className={styles.desktopNavList}>
                            {NAV_ITEMS.map((item, index) => (
                                <li key={index} className={styles.navItemMask}>
                                    <span className={styles.navItem}>
                                        <Link href={item.href} className={styles.navLink}>
                                            <PerspectiveText label={item.label} />
                                        </Link>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Responsive Menu/Close Trigger */}
                        <div className={styles.mobileNavTrigger}>
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={toggleMenu}
                                onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
                                className={styles.mobileMenuBtn}
                                aria-label={isActive ? "Close menu" : "Open menu"}
                            >
                                <span className={styles.mobileMenuText}>
                                    <PerspectiveText label={isActive ? "Close" : "Menu"} />
                                </span>
                                <span
                                    className={`${styles.mobileMenuDot} ${
                                        isActive ? styles.mobileMenuDotActive : ""
                                    }`}
                                />
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Floating button that appears only on scroll */}
            <div ref={buttonRef} className={styles.headerButtonContainer}>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={toggleMenu}
                    onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
                    className={`${styles.button} ${
                        isActive ? styles.buttonActive : ""
                    }`}
                    aria-label={isActive ? "Close menu" : "Open menu"}
                >
                    <div
                        className={`${styles.burger} ${
                            isActive ? styles.burgerActive : ""
                        }`}
                    />
                </div>
            </div>

            {isNavMounted && (
                <Nav isActive={isActive} onClose={handleNavClose} />
            )}
        </>
    );
}