"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NAV_ITEMS = [
    { label: "Objects", href: "#objects" },
    { label: "Kiln & Craft", href: "#atelier" },
    { label: "Lookbook", href: "#spaces" },
    { label: "Studio", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {

        },
        { scope: headerRef }
    );

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
                <div className={styles.button}>
                    <div className={styles.burger} />
                </div>
            </div>
        </>
    );
}