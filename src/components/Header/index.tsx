"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
    { label: "Objects", href: "#objects" },
    { label: "Kiln & Craft", href: "#atelier" },
    { label: "Lookbook", href: "#spaces" },
    { label: "Studio", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            const navItems = gsap.utils.toArray<HTMLElement>(`.${styles.navItem}`);

            gsap.set(navItems, {
                yPercent: 120,
                opacity: 0,
            });

            gsap.to(navItems, {
                yPercent: 0,
                opacity: 1,
                duration: 1.1,
                stagger: 0.07,
                ease: "power4.out",
                delay: 0.3,
                clearProps: "transform,opacity",
            });

            ScrollTrigger.create({
                start: "top -60px", // Trigger when scrolled 60px down
                toggleClass: {
                    targets: headerRef.current,
                    className: styles.scrolled,
                },
            });
        },
        { scope: headerRef }
    );

    return (
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
    );
}