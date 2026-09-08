"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function Workshop() {
  const containerRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const innerImageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current || !textRef.current) return;

      const headingSplit = new SplitText(headingRef.current, {
        type: "lines,words",
        linesClass: styles.lineMask,
      });

      const textSplit = new SplitText(textRef.current, {
        type: "lines",
        linesClass: styles.lineMask,
      });

      // Wrap lines with inner container for clean masking
      headingSplit.lines.forEach((line) => {
        if (line instanceof HTMLElement) {
          line.style.overflow = "hidden";
        }
      });
      textSplit.lines.forEach((line) => {
        if (line instanceof HTMLElement) {
          line.style.overflow = "hidden";
        }
      });

      gsap.set(headingSplit.words, { yPercent: 115, opacity: 0 });
      gsap.set(textSplit.lines, { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      if (kickerRef.current) {
        tl.fromTo(
          kickerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "mill3" },
          0
        );
      }

      // 1. Mill3-style line & word reveal with signature cubic curve
      tl.to(
        headingSplit.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          ease: "mill3",
          stagger: 0.035,
        },
        0.05
      ).to(
        textSplit.lines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "mill3",
          stagger: 0.045,
        },
        0.2
      );

      // 2. Mill3-signature image unveil: clip-path inset expansion + inner zoom settling
      if (imageWrapperRef.current && innerImageRef.current) {
        tl.fromTo(
          imageWrapperRef.current,
          {
            clipPath: "inset(14% 0% 14% 0%)",
            opacity: 0.6,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.35,
            ease: "mill3",
          },
          0.1
        ).fromTo(
          innerImageRef.current,
          {
            scale: 1.16,
          },
          {
            scale: 1.0,
            duration: 1.45,
            ease: "mill3",
          },
          0.1
        );

        // 3. Subtle continuous scrub parallax on the craftsman image
        gsap.fromTo(
          innerImageRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
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
    <section className={styles.workshop} ref={containerRef}>
      {/* Left Sage Green Editorial Column */}
      <div className={styles.left}>
        <div className={styles.content}>
          <div className={styles.headerBlock}>
            <span className={styles.kicker} ref={kickerRef}>
              03 // THE ATELIER
            </span>
            <h2 className={styles.heading} ref={headingRef}>
              FORMED IN
              <br />
              DELIBERATE SILENCE.
            </h2>
          </div>

          <p className={styles.paragraph} ref={textRef}>
            Centering raw earth against the wheel is an exercise in disciplined
            patience. Before the fire and mineral glazes, there is only water,
            coarse stoneware, and the measured pressure of hands—stripping
            away excess until nothing remains but essential contour and honest
            weight.
          </p>

          <div className={styles.atelierBadge}>
            <div className={styles.badgeDot} />
            <span className={styles.badgeText}>HAND-THROWN IN COPENHAGEN</span>
          </div>
        </div>
      </div>

      {/* Right Off-White Image Column */}
      <div className={styles.right}>
        <div className={styles.imageWrapper} ref={imageWrapperRef}>
          <div className={styles.innerImage} ref={innerImageRef}>
            <Image
              src="/images/workshop.png"
              alt="Potter shaping stoneware on a wheel in Copenhagen atelier"
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 48vw, 560px"
              priority
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}