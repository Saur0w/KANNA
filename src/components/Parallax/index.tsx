"use client";

import React, { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMAGES: string[] = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg"
];

interface ColumnProps {
    images: string[];
}

function Column({ images }: ColumnProps) {
    return (
        <div className={styles.column}>
            {images.map((src, index) => (
                <div key={index} className={styles.imageContainer}>
                    <Image
                        src={`/images/parallax/${src}`}
                        fill
                        alt={`Kanna stoneware archive ${src}`}
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className={styles.cardOverlay} />
                </div>
            ))}
        </div>
    );
}

export default function Parallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    // Responsive column grouping: 4 columns on desktop, 3 on tablet, 2 on mobile
    const [columnsData, setColumnsData] = useState<string[][]>([
        [IMAGES[0], IMAGES[1], IMAGES[2]],
        [IMAGES[3], IMAGES[4], IMAGES[5]],
        [IMAGES[6], IMAGES[7], IMAGES[8]],
        [IMAGES[9], IMAGES[10], IMAGES[11]],
    ]);

    useEffect(() => {
        const updateColumns = () => {
            const w = window.innerWidth;
            if (w <= 640) {
                // 2 columns of 6 images each on phone
                setColumnsData([
                    [IMAGES[0], IMAGES[1], IMAGES[2], IMAGES[3], IMAGES[4], IMAGES[5]],
                    [IMAGES[6], IMAGES[7], IMAGES[8], IMAGES[9], IMAGES[10], IMAGES[11]],
                ]);
            } else if (w <= 1024) {
                // 3 columns of 4 images each on tablet
                setColumnsData([
                    [IMAGES[0], IMAGES[1], IMAGES[2], IMAGES[3]],
                    [IMAGES[4], IMAGES[5], IMAGES[6], IMAGES[7]],
                    [IMAGES[8], IMAGES[9], IMAGES[10], IMAGES[11]],
                ]);
            } else {
                // 4 columns of 3 images each on desktop
                setColumnsData([
                    [IMAGES[0], IMAGES[1], IMAGES[2]],
                    [IMAGES[3], IMAGES[4], IMAGES[5]],
                    [IMAGES[6], IMAGES[7], IMAGES[8]],
                    [IMAGES[9], IMAGES[10], IMAGES[11]],
                ]);
            }
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    useGSAP(
        () => {
            if (!galleryRef.current) return;

            const columnElements = gsap.utils.toArray<HTMLElement>(`.${styles.column}`);
            if (!columnElements.length) return;

            const height = window.innerHeight;

            // Counter-balancing offsets for rich dynamic multi-directional parallax
            const configs = [
                { yStart: -height * 0.16, yEnd: height * 0.18 },
                { yStart: height * 0.22, yEnd: -height * 0.20 },
                { yStart: -height * 0.18, yEnd: height * 0.22 },
                { yStart: height * 0.24, yEnd: -height * 0.22 },
            ];

            columnElements.forEach((col, i) => {
                const config = configs[i % configs.length];

                gsap.fromTo(
                    col,
                    { y: config.yStart },
                    {
                        y: config.yEnd,
                        ease: "none",
                        scrollTrigger: {
                            trigger: galleryRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.2,
                        },
                    }
                );
            });
        },
        { dependencies: [columnsData], scope: containerRef }
    );

    return (
        <section className={styles.parallax} ref={containerRef}>
            {/* Editorial Section Header */}
            <div className={styles.parallaxHeader}>
                <div className={styles.headerLeft}>
                    <span className={styles.sectionIndex}>03 // VISUAL DIARY</span>
                    <h2 className={styles.sectionTitle}>THE ATELIER ARCHIVE</h2>
                </div>
                <div className={styles.headerRight}>
                    <span className={styles.sectionDesc}>12 ARTIFACTS IN HIGH-FIRE STONEWARE</span>
                </div>
            </div>

            {/* Parallax Gallery Columns */}
            <div className={styles.gallery} ref={galleryRef}>
                {columnsData.map((colImages, index) => (
                    <Column key={`${columnsData.length}-${index}`} images={colImages} />
                ))}
            </div>
        </section>
    );
}