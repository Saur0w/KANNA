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
        CustomEase.create("kanna", "0.76, 0, 0.24, 1");
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

    const maskRef = useRef<HTMLDivElement | null>(null);
    const linkRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);

    // Initial mask reveal: .link slides up out of .linkMask
    useGSAP(
        () => {
            if (!linkRef.current) return;

            gsap.fromTo(
                linkRef.current,
                { yPercent: 125, rotateZ: 2, opacity: 0 },
                {
                    yPercent: 0,
                    rotateZ: 0,
                    opacity: 1,
                    duration: 0.85,
                    delay: 0.22 + 0.05 * index,
                    ease: "kanna",
                }
            );
        },
        { scope: maskRef }
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
        { dependencies: [isActive], scope: maskRef }
    );

    useGSAP(
        () => {
            if (!isExiting || !linkRef.current) return;

            // Exit mask animation: slides down cleanly out of the mask
            gsap.to(linkRef.current, {
                yPercent: 120,
                opacity: 0,
                duration: 0.4,
                delay: 0.02 * index,
                ease: "power2.in",
            });
        },
        { dependencies: [isExiting], scope: maskRef }
    );

    const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

    return (
        <div ref={maskRef} className={styles.linkMask}>
            <div
                ref={linkRef}
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