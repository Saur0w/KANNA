"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const SPECIFICATIONS = [
  { label: "01 // MATERIAL", value: "Washed Iron-Rich Stoneware" },
  { label: "02 // FIRING", value: "1,280°C High-Reduction Kiln" },
  { label: "03 // SURFACE", value: "Unglazed Matte Mineral Slip" },
  { label: "04 // GRAVITAS", value: "8.4 — 14.2 kg Solid Core" },
];

export default function Spaces() {
  const containerRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const specsRef = useRef<HTMLDivElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const innerImageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current || !bodyRef.current) return;

      const headingSplit = new SplitText(headingRef.current, {
        type: "lines",
        linesClass: styles.lineMask,
      });

      const bodySplit = new SplitText(bodyRef.current, {
        type: "lines",
        linesClass: styles.lineMask,
      });

      headingSplit.lines.forEach((line) => {
        if (line instanceof HTMLElement) line.style.overflow = "hidden";
      });
      bodySplit.lines.forEach((line) => {
        if (line instanceof HTMLElement) line.style.overflow = "hidden";
      });

      gsap.set(headingSplit.lines, { yPercent: 110, opacity: 0 });
      gsap.set(bodySplit.lines, { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      if (kickerRef.current) {
        tl.fromTo(
          kickerRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65, ease: "mill3" },
          0
        );
      }

      // Mill3 line reveals
      tl.to(
        headingSplit.lines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "mill3",
          stagger: 0.05,
        },
        0.08
      ).to(
        bodySplit.lines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "mill3",
          stagger: 0.04,
        },
        0.25
      );

      // Specifications row entrance
      if (specsRef.current) {
        const specItems = specsRef.current.querySelectorAll(`.${styles.specRow}`);
        tl.fromTo(
          specItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "mill3",
            stagger: 0.06,
          },
          0.35
        );
      }

      // Clip-path reveal for right architectural photo
      if (imageFrameRef.current && innerImageRef.current) {
        tl.fromTo(
          imageFrameRef.current,
          {
            clipPath: "inset(14% 0% 14% 0%)",
            opacity: 0.5,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.3,
            ease: "mill3",
          },
          0.1
        ).fromTo(
          innerImageRef.current,
          {
            scale: 1.14,
          },
          {
            scale: 1.0,
            duration: 1.4,
            ease: "mill3",
          },
          0.1
        );

        // Continuous scrub parallax inside frame
        gsap.fromTo(
          innerImageRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.spaces} ref={containerRef}>
      <div className={styles.container}>
        {/* Left Column: Architectural Specs & Philosophy */}
        <div className={styles.leftCol}>
          <div className={styles.headerBlock}>
            <span className={styles.kicker} ref={kickerRef}>
              04 // SPATIAL ARCHITECTURE
            </span>
            <h2 className={styles.heading} ref={headingRef}>
              STONES THAT
              <br />
              ANCHOR SPACE.
            </h2>
          </div>

          <p className={styles.bodyText} ref={bodyRef}>
            Every interior requires an anchor—a silent object of sufficient
            gravitas to gather the eye and steady the room. High-fired to 1,280°C,
            each vessel develops a dense, vitrified body with a subtle mineral
            tooth that absorbs rather than reflects the passage of natural light.
          </p>

          <div className={styles.specsGrid} ref={specsRef}>
            {SPECIFICATIONS.map((spec, i) => (
              <div key={i} className={styles.specRow}>
                <span className={styles.specLabel}>{spec.label}</span>
                <span className={styles.specValue}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Architectural Photography Frame */}
        <div className={styles.rightCol}>
          <div className={styles.imageFrame} ref={imageFrameRef}>
            <div className={styles.innerImage} ref={innerImageRef}>
              <Image
                src="/images/lux.jpg"
                alt="Architectural stoneware vessel on textured plinth"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                className={styles.image}
              />
            </div>
            <div className={styles.captionBadge}>
              <span className={styles.captionTag}>FIGURE 04</span>
              <span className={styles.captionName}>MONOLITHIC ANCHOR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}