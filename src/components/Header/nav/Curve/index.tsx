"use client";

import React from "react";
import gsap from "gsap";
import styles from "./style.module.scss";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface CurveProps {
    isActive?: boolean;
}

export default function Curve({ isActive = true }: CurveProps) {
    const pathRef = useRef<SVGPathElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useGSAP(() => {
        if (!pathRef.current) return;

        const h = window.innerHeight;
        const initialPath = `M100 0 L100 ${h} Q-100 ${h / 2} 100 0`;
        const targetPath = `M100 0 L100 ${h} Q100 ${h / 2} 100 0`;

        if (isActive) {
            gsap.fromTo(pathRef.current, {
                attr: { d: initialPath }
            }, {
                attr: { d: targetPath },
                duration: 1,
                ease: "power4.inOut"
            })
        } else {
            gsap.to(pathRef.current, {
                attr: { d: initialPath },
                duration: 0.8,
                ease: "power4.inOut"
            });
        }
    }, { scope: pathRef, dependencies: [isActive] });
    return (
        <svg ref={svgRef} className={styles.svgCurve}>
            <path ref={pathRef} fill="#1c1d20" />
        </svg>
    )
}