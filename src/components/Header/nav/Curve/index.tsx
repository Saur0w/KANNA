"use client";

import { useRef } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase);

interface CurveProps {
    isActive?: boolean;
}

export default function Curve({ isActive = true }: CurveProps) {
    const pathRef = useRef<SVGPathElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useGSAP(
        () => {
            if (!pathRef.current) return;

            const h = window.innerHeight;
            
            const initialPath = `M0 0 L0 ${h} Q100 ${h / 2} 0 0`;
            const targetPath = `M0 0 L0 ${h} Q0 ${h / 2} 0 0`;

            if (isActive) {
                gsap.fromTo(
                    pathRef.current,
                    { attr: { d: initialPath } },
                    {
                        attr: { d: targetPath },
                        duration: 0.75,
                        ease: "snellenberg",
                    }
                );
            } else {
                gsap.to(pathRef.current, {
                    attr: { d: initialPath },
                    duration: 0.65,
                    ease: "snellenberg",
                });
            }
        },
        { dependencies: [isActive], scope: svgRef }
    );

    return (
        <svg ref={svgRef} className={styles.svgCurve}>
            <path ref={pathRef} />
        </svg>
    );
}