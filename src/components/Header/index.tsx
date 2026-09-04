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
                            <li key={index}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}