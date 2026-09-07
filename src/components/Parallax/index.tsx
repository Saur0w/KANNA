"use client";

import React, { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrollSkew } from "@/hooks/useScrollSkew";
import ParallaxImage from "@/components/ParallaxImage";

const DESKTOP_COLUMNS = [
    ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "1.jpg"],
    ["5.jpg", "6.jpg", "7.jpg", "8.jpg", "5.jpg"],
    ["9.jpg", "10.jpg", "11.jpg", "12.jpg", "9.jpg"],
    ["2.jpg", "4.jpg", "6.jpg", "8.jpg", "10.jpg"],
];

const TABLET_COLUMNS = [
    ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    ["6.jpg", "7.jpg", "8.jpg", "9.jpg", "6.jpg"],
    ["10.jpg", "11.jpg", "12.jpg", "1.jpg", "2.jpg"],
];

const MOBILE_COLUMNS = [
    ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    ["7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg"],
];

interface ColumnProps {
    images: string[];
}

function Column({ images }: ColumnProps) {
    return (
        <div className={styles.column}>
            {images.map((src, index) => (
                <ParallaxImage
                    key={index}
                    className={styles.imageContainer}
                    src={`/images/parallax/${src}`}
                    alt={`Kanna stoneware piece ${src}`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    strength={6}
                />
            ))}
        </div>
    );
}

export default function Parallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useScrollSkew<HTMLDivElement>({ maxSkew: 3, factor: 0.05 });
    const [columnsData, setColumnsData] = useState<string[][]>(DESKTOP_COLUMNS);
    const [screenMode, setScreenMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            if (w <= 640) {
                setColumnsData(MOBILE_COLUMNS);
                setScreenMode('mobile');
            } else if (w <= 1024) {
                setColumnsData(TABLET_COLUMNS);
                setScreenMode('tablet');
            } else {
                setColumnsData(DESKTOP_COLUMNS);
                setScreenMode('desktop');
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useGSAP(
        () => {
            if (!galleryRef.current) return;

            const columnElements = gsap.utils.toArray<HTMLElement>(`.${styles.column}`);
            if (!columnElements.length) return;

            const height = window.innerHeight;

            const speeds = screenMode === 'mobile'
                ? [height * 0.45, height * 0.85]
                : screenMode === 'tablet'
                ? [height * 0.45, height * 0.85, height * 0.50]
                : [height * 0.45, height * 0.90, height * 0.55, height * 0.95];

            columnElements.forEach((col, i) => {
                const travel = speeds[i % speeds.length];

                gsap.fromTo(
                    col,
                    { y: 0 },
                    {
                        y: travel,
                        ease: "none",
                        scrollTrigger: {
                            trigger: galleryRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });
        },
        { dependencies: [columnsData, screenMode], scope: containerRef }
    );

    return (
        <section className={styles.parallax} ref={containerRef}>
            <div className={styles.gallery} ref={galleryRef}>
                {columnsData.map((colImages, index) => (
                    <Column key={`${screenMode}-${index}`} images={colImages} />
                ))}
            </div>
        </section>
    );
}