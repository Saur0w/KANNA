"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import styles from "./style.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TextItem {
    type: "text";
    text: string;
}

interface ImageCardItem {
    type: "image";
    src: string;
    alt: string;
    caption?: string;
    description?: string;
}

interface BrandCardItem {
    type: "brand";
    brand: string;
    tagline: string;
    sub: string;
}

interface DividerItem {
    type: "divider";
}

type MarqueeItem = TextItem | ImageCardItem | BrandCardItem | DividerItem;

const MARQUEE_ITEMS: MarqueeItem[] = [
    { type: "text", text: "OBJECTS" },
    {
        type: "image",
        src: "/images/gallery/1.jpg",
        alt: "Ceramic vessel in architectural room",
        caption: "OBJECTS // ARCHITECTURAL",
        description: "Stoneware vessels shaped by water and coarse mineral glazes.",
    },
    { type: "text", text: "WEBSITE" },
    {
        type: "brand",
        brand: "KANNA",
        tagline: "HAND-THROWN ATELIER",
        sub: "Lookbook '26",
    },
    { type: "text", text: "DISCOVER" },
    { type: "divider" },
    {
        type: "image",
        src: "/images/workshop.png",
        alt: "Artisan hands shaping clay",
        caption: "KILN & CRAFT",
        description: "Formed in deliberate silence against the wheel.",
    },
    { type: "text", text: "ATELIER" },
    {
        type: "image",
        src: "/images/lux.jpg",
        alt: "Permanent spatial anchor vessel",
        caption: "SPATIAL ANCHORS",
        description: "Stripped of excess to reveal essential form and weight.",
    },
];

function RenderItem({ item, index }: { item: MarqueeItem; index: number }) {
    if (item.type === "text") {
        return (
            <span key={index} className={styles.wordMask}>
                <span className={styles.word}>
                    {item.text}
                </span>
            </span>
        );
    }

    if (item.type === "divider") {
        return <span key={index} className={styles.dividerBar} aria-hidden="true" />;
    }

    if (item.type === "brand") {
        return (
            <div key={index} className={styles.brandCard}>
                <span className={styles.brandTagline}>{item.tagline}</span>
                <span className={styles.brandLogo}>{item.brand}</span>
                <span className={styles.brandSub}>{item.sub}</span>
            </div>
        );
    }

    if (item.type === "image") {
        return (
            <div key={index} className={styles.imageCard}>
                <div className={styles.imageCardHeader}>
                    <span className={styles.cardCaption}>{item.caption}</span>
                    <span className={styles.cardDesc}>{item.description}</span>
                </div>
                <div className={styles.imageWrapper}>
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 240px, 320px"
                        className={styles.cardImg}
                    />
                </div>
            </div>
        );
    }

    return null;
}

export default function Marquee() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const skewTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !trackRef.current) return;
            gsap.set(trackRef.current, { transformOrigin: "50% 50%", force3D: true });
            skewTo.current = gsap.quickTo(trackRef.current, "skewX", {
                duration: 0.55,
                ease: "power3.out",
            });

            // Scroll reveal animation for Marquee titles, cards, and dividers
            const words = sectionRef.current.querySelectorAll(`.${styles.word}`);
            const cards = sectionRef.current.querySelectorAll(`.${styles.imageCard}, .${styles.brandCard}`);
            const dividers = sectionRef.current.querySelectorAll(`.${styles.dividerBar}`);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            if (words.length) {
                tl.fromTo(
                    words,
                    {
                        yPercent: 120,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.95,
                        stagger: 0.06,
                        ease: "mill3",
                    },
                    0
                );
            }

            if (cards.length) {
                tl.fromTo(
                    cards,
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                        stagger: 0.08,
                        ease: "mill3",
                    },
                    0.1
                );
            }

            if (dividers.length) {
                tl.fromTo(
                    dividers,
                    {
                        scaleY: 0,
                        opacity: 0,
                    },
                    {
                        scaleY: 1,
                        opacity: 0.85,
                        duration: 0.7,
                        stagger: 0.04,
                        ease: "mill3",
                    },
                    0.15
                );
            }

            return () => {
                skewTo.current = null;
            };
        },
        { scope: sectionRef }
    );

    // Subtle dynamic skew on scroll without altering scrolling speed or direction
    useLenis(
        (lenis) => {
            if (!skewTo.current) return;
            const raw = lenis.isScrolling === "smooth" ? lenis.velocity * 0.14 : 0;
            const skew = gsap.utils.clamp(-3, 3, raw);
            skewTo.current(Math.abs(skew) < 0.02 ? 0 : skew);
        },
        []
    );

    return (
        <section ref={sectionRef} className={styles.marqueeSection} aria-label="Infinite Marquee">
            <div className={styles.marqueeWrapper}>
                <div ref={trackRef} className={styles.marqueeTrack}>
                    {/* Primary Track Sequence */}
                    <div className={styles.marqueeSequence}>
                        {MARQUEE_ITEMS.map((item, idx) => (
                            <RenderItem key={`p-${idx}`} item={item} index={idx} />
                        ))}
                    </div>

                    {/* Secondary Duplicate Sequence for Seamless Infinite Looping */}
                    <div className={styles.marqueeSequence} aria-hidden="true">
                        {MARQUEE_ITEMS.map((item, idx) => (
                            <RenderItem key={`s-${idx}`} item={item} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}