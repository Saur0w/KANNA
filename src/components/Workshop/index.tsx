"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

export default function Workshop() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split heading and text into lines for an editorial slide-up reveal
      const headingSplit = new SplitText(headingRef.current, {
        type: "lines,words",
        linesClass: styles.lineWrap,
      });

      const textSplit = new SplitText(textRef.current, {
        type: "lines",
        linesClass: styles.lineWrap,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headingSplit.words, {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.04,
      })
        .from(
          textSplit.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.06,
          },
          "-=0.5"
        )
        .from(
          imageWrapperRef.current,
          {
            clipPath: "inset(10% 10% 10% 10%)",
            opacity: 0,
            scale: 1.05,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.8"
        );
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.workshop} ref={containerRef}>
      {/* Left Sage Green Column */}
      <div className={styles.left}>
        <div className={styles.content}>
          <h2 className={styles.heading} ref={headingRef}>
            Formed in silence.
          </h2>
          <p className={styles.paragraph} ref={textRef}>
            Centering raw earth against the wheel is an exercise in deliberate
            patience. Before the fire and mineral glazes, there is only water,
            coarse stoneware, and the measured pressure of hands—stripping
            away excess until nothing remains but essential contour and honest
            weight.
          </p>
        </div>
      </div>

      {/* Right Off-White Image Column */}
      <div className={styles.right}>
        <div className={styles.imageWrapper} ref={imageWrapperRef}>
          <Image
            src="/images/workshop.png"
            alt="Potter shaping stoneware on a wheel"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 480px"
            priority
          />
        </div>
      </div>
    </section>
  );
}