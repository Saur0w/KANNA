"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
                { x: -80, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: 0.25 + 0.05 * index,
                    ease: "power3.out",
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
                duration: isActive ? 0.3 : 0.35,
                ease: isActive ? "back.out(2)" : "power2.in",
            });
        },
        { dependencies: [isActive], scope: containerRef }
    );

    useGSAP(
        () => {
            if (!isExiting || !containerRef.current) return;

            gsap.to(containerRef.current, {
                x: -80,
                opacity: 0,
                duration: 0.6,
                delay: 0.04 * index,
                ease: "power3.in",
            });
        },
        { dependencies: [isExiting], scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className={styles.link}
            onMouseEnter={() => setSelectedIndicator(href)}
        >
            <div
                ref={indicatorRef}
                className={styles.indicator}
                style={{ transform: "scale(0)" }}
            />
            <Link href={href}>{title}</Link>
        </div>
    );
}