"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Nav from "./nav";

gsap.registerPlugin(ScrollTrigger, CustomEase);

if (typeof window !== "undefined") {
    try {
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

    useGSAP(() => {
        gsap.set(buttonRef.current, { scale: 0 });

        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 0,
            end: window.innerHeight * 0.45,
            onLeave: () => {
                // Reveal floating hamburger button with snappy pop
                gsap.to(buttonRef.current, {
                    scale: 1,
                    duration: 0.4,
                    ease: "pop",
                });
                // Hide main desktop navigation with luxury ease
                gsap.to(headerRef.current, {
                    y: -60,
                    opacity: 0,
                    duration: 0.4,
                    ease: "snellenberg",
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
                // Reveal main desktop navigation back
                gsap.to(headerRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "snellenberg",
                    pointerEvents: "auto",
                });
            },
        });
    });

    return (
        <>
            <header ref={headerRef} className={styles.header}>
                <div className={styles.body}>
                    <nav>
                        <ul>
                            {NAV_ITEMS.map((item, index) => (
                                <li key={index} className={styles.navItemMask}>
                  <span className={styles.navItem}>
                    <Link href={item.href}>{item.label}</Link>
                  </span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            <div ref={buttonRef} className={styles.headerButtonContainer}>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={toggleMenu}
                    onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
                    className={styles.button}
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