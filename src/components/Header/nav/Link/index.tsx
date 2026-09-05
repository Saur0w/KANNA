"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import PerspectiveText from "@/ui/PerspectiveText";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase);

if (typeof window !== "undefined") {
    try {
        CustomEase.create("snellenberg", "0.76, 0, 0.24, 1");
    } catch {
        // Handled
    }
}

interface LinkData {
    title: string;
    href: string;
    index: number;
}

interface IndexProps {
    data: LinkData;
    isActive: boolean;
    setSelectedIndicator: (href: string) => void;
    isExiting?: boolean;
}

export default function Index({
    data,
    isActive,
    setSelectedIndicator,
    isExiting = false,
}: IndexProps) {
    const { title, href, index } = data;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                containerRef.current,
                { y: 35, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    delay: 0.18 + 0.05 * index,
                    ease: "snellenberg",
                }
            );
        },
        { scope: containerRef }
    );

    useGSAP(
        () => {
            if (!indicatorRef.current) return;

            gsap.to(indicatorRef.current, {
                scale: isActive ? 1 : 0,
                duration: isActive ? 0.35 : 0.25,
                ease: isActive ? "back.out(2)" : "power2.in",
            });
        },
        { dependencies: [isActive], scope: containerRef }
    );

    useGSAP(
        () => {
            if (!isExiting || !containerRef.current) return;

            gsap.to(containerRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.4,
                delay: 0.02 * index,
                ease: "power2.in",
            });
        },
        { dependencies: [isExiting], scope: containerRef }
    );

    const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

    return (
        <div ref={containerRef} className={styles.linkMask}>
            <div
                className={styles.link}
                data-hover-parent="true"
                onMouseEnter={() => setSelectedIndicator(href)}
            >
                <div
                    ref={indicatorRef}
                    className={styles.indicator}
                    style={{ transform: "scale(0)" }}
                />
                <span className={styles.indexNum}>{formattedIndex}</span>
                <Link href={href} className={styles.linkText}>
                    <PerspectiveText label={title} />
                </Link>
            </div>
        </div>
    );
}