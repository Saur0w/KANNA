'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: string;
  src: string;
  color: string;
}

const galleryData: GalleryItem[] = [
  {
    id: "08",
    title: "Amber",
    category: "Vessel / Mouth-Blown Glass",
    type: "Mouth-blown amber glass designed to filter late afternoon light and hold delicate dried botanicals in quiet balance.",
    src: "/images/gallery/1.jpg",
    color: "#B83A1B"
  },
  {
    id: "19",
    title: "Cobalt",
    category: "Solitary Column / Raw Indigo",
    type: "A tall, disciplined silhouette dipped in deep mineral indigo, thrown specifically to elevate a single lone branch.",
    src: "/images/gallery/2.jpg",
    color: "#1B3CB8"
  },
  {
    id: "32",
    title: "Tether",
    category: "Sculptural Pair / High-Fire",
    type: "Hand-sculpted stoneware exploring negative space and geometric play, balanced to live as a sculptural pair.",
    src: "/images/gallery/3.png",
    color: "#8C6D4F"
  },
  {
    id: "45",
    title: "Chalk",
    category: "Low Basin / Matte Porcelain",
    type: "A low-profile matte porcelain basin engineered to anchor wide surfaces and frame living, cascading foliage.",
    src: "/images/gallery/4.jpg",
    color: "#D4C5B9"
  },
  {
    id: "64",
    title: "Orbit",
    category: "Hollow Form / Sand Stoneware",
    type: "A circular hollow form in coarse sand stoneware, sculpted to frame negative space and support a solitary curving branch.",
    src: "/images/gallery/5.png",
    color: "#9C7A5B"
  },
  {
    id: "82",
    title: "Pebble",
    category: "Droplet Vessel / Ceramic",
    type: "An organic droplet silhouette cast in matte porcelain, weighted at the base to counterbalance sweeping, asymmetrical stems.",
    src: "/images/gallery/6.jpg",
    color: "#B83A1B"
  }
];

export default function Gallery() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, ease: "mill3" },
          0
        );
      }

      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.row}`);
      if (rows.length) {
        tl.fromTo(
          rows,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "mill3",
            stagger: 0.08,
            clearProps: "all",
          },
          0.1
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.gallery} ref={containerRef}>
      <div className={styles.container}>
        <header className={styles.header} ref={headerRef}>
          <div className={styles.headerMeta}>
            <span className={styles.headerTag}>02 // ARCHIVE</span>
            <span className={styles.headerTitle}>SELECTED OBJECTS & VESSELS</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerCount}>(06 FORMS)</span>
          </div>
        </header>

        <div
          ref={listRef}
          className={styles.list}
          onMouseLeave={() => setIsHovered(false)}
        >
          {galleryData.map((item, index) => {
            const isActive = activeIndex === index;
            const isDimmed = isHovered && !isActive;

            return (
              <div
                key={item.id}
                className={`${styles.row} ${isActive ? styles.active : ''} ${isDimmed ? styles.dimmed : ''}`}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsHovered(true);
                }}
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                <div className={styles.leftCol}>
                  <span className={styles.index}>{item.id}</span>
                </div>

                <div className={styles.midCol}>
                  <div className={styles.metaRow}>
                    <span className={styles.category}>{item.category}</span>
                  </div>

                  <div className={styles.titleRow}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <span className={styles.arrow} aria-hidden="true">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </div>

                  <p className={styles.description}>{item.type}</p>
                </div>
                <div className={styles.rightCol}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 35vw, 440px"
                      className={styles.image}
                      priority={index < 2}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                </div>
                <div className={styles.accentLine} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}