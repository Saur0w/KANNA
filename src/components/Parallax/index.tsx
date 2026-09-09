"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { gsap } from "@/lib/gsap";
import { useScrollSkew } from "@/hooks/useScrollSkew";
import { useLenis } from "lenis/react";

const DESKTOP_COLUMNS = [
    ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    ["7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg"],
    ["2.jpg", "4.jpg", "6.jpg", "8.jpg", "1.jpg", "3.jpg"],
    ["5.jpg", "7.jpg", "9.jpg", "11.jpg", "10.jpg", "12.jpg"],
];

const TABLET_COLUMNS = [
    ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    ["7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg"],
    ["2.jpg", "4.jpg", "6.jpg", "8.jpg", "10.jpg", "1.jpg"],
];

const MOBILE_COLUMNS = [
    ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
    ["8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "1.jpg", "2.jpg"],
];

const DESKTOP_SPEEDS = [0.65, -0.50, 0.80, -0.45];
const TABLET_SPEEDS = [0.60, -0.50, 0.65];
const MOBILE_SPEEDS = [0.55, -0.45];

const DESKTOP_OFFSETS = [0, 0.35, 0.70, 0.20];
const TABLET_OFFSETS = [0, 0.40, 0.75];
const MOBILE_OFFSETS = [0, 0.50];

interface ColumnProps {
    images: string[];
    trackRef?: React.Ref<HTMLDivElement>;
}

function Column({ images, trackRef }: ColumnProps) {
    return (
        <div className={styles.column}>
            {/* Primary Track */}
            <div className={styles.columnTrack} ref={trackRef}>
                {images.map((src, index) => (
                    <div key={`a-${index}`} className={styles.imageContainer}>
                        <Image
                            src={`/images/parallax/${src}`}
                            alt={`Kanna stoneware piece ${src}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority={index < 2}
                        />
                        <div className={styles.cardOverlay} />
                    </div>
                ))}
            </div>

            {/* Duplicate Track for Seamless Infinite Wrapping */}
            <div className={styles.columnTrack} aria-hidden="true">
                {images.map((src, index) => (
                    <div key={`b-${index}`} className={styles.imageContainer}>
                        <Image
                            src={`/images/parallax/${src}`}
                            alt={`Kanna stoneware piece ${src}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className={styles.cardOverlay} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Parallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useScrollSkew<HTMLDivElement>({ maxSkew: 3, factor: 0.05 });
    const firstTrackRef = useRef<HTMLDivElement>(null);

    const [columnsData, setColumnsData] = useState<string[][]>(DESKTOP_COLUMNS);
    const [screenMode, setScreenMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    const loopHeightRef = useRef<number>(2400);
    const settersRef = useRef<Array<(val: number) => void>>([]);

    const speeds = screenMode === 'mobile'
        ? MOBILE_SPEEDS
        : screenMode === 'tablet'
        ? TABLET_SPEEDS
        : DESKTOP_SPEEDS;

    const offsets = screenMode === 'mobile'
        ? MOBILE_OFFSETS
        : screenMode === 'tablet'
        ? TABLET_OFFSETS
        : DESKTOP_OFFSETS;

    // Handle screen mode changes
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

            if (firstTrackRef.current) {
                loopHeightRef.current = firstTrackRef.current.offsetHeight || 2400;
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Set up quickSetters for all columns within this container
    useEffect(() => {
        if (!containerRef.current) return;

        const cols = containerRef.current.querySelectorAll<HTMLElement>(`.${styles.column}`);
        settersRef.current = Array.from(cols).map((col) =>
            gsap.quickSetter(col, "y", "px") as (val: number) => void
        );

        if (firstTrackRef.current) {
            loopHeightRef.current = firstTrackRef.current.offsetHeight || 2400;
        }

        // Initial positioning based on current scroll position
        const currentScroll = window.scrollY || 0;
        updatePositions(currentScroll);
    }, [columnsData, screenMode]);

    const updatePositions = useCallback((scrollY: number) => {
        const h = loopHeightRef.current;
        if (!h || !settersRef.current.length) return;

        const currentSpeeds = speeds;
        const currentOffsets = offsets;

        settersRef.current.forEach((setter, i) => {
            const speed = currentSpeeds[i % currentSpeeds.length];
            const offsetFraction = currentOffsets[i % currentOffsets.length];
            const rawY = offsetFraction * h + scrollY * speed;
            const wrappedY = gsap.utils.wrap(-h, 0, rawY);
            setter(wrappedY);
        });
    }, [speeds, offsets]);

    // Continuously update with Lenis smooth scroll on every frame
    useLenis((lenis) => {
        updatePositions(lenis.scroll);
    });

    // Native scroll fallback ensures motion even if Lenis is temporarily bypassed
    useEffect(() => {
        const onNativeScroll = () => {
            updatePositions(window.scrollY);
        };
        window.addEventListener("scroll", onNativeScroll, { passive: true });
        return () => window.removeEventListener("scroll", onNativeScroll);
    }, [updatePositions]);

    return (
        <section className={styles.parallax} ref={containerRef}>
            <div className={styles.fixedTrack}>
                <div className={styles.gallery} ref={galleryRef}>
                    {columnsData.map((colImages, index) => (
                        <Column
                            key={`${screenMode}-${index}`}
                            images={colImages}
                            trackRef={index === 0 ? firstTrackRef : undefined}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}