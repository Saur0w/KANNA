"use client";

import React, { forwardRef } from "react";
import styles from "./style.module.scss";

// High-precision smooth cubic bezier curves (zero jagginess)
export const DESKTOP_INITIAL_PATH = "M0 0 L0 1000 C 130 700, 130 300, 0 0";
export const DESKTOP_TARGET_PATH = "M0 0 L0 1000 C 0 700, 0 300, 0 0";
export const DESKTOP_EXIT_PATH = "M0 0 L0 1000 C 80 700, 80 300, 0 0";

export const MOBILE_INITIAL_PATH = "M0 0 L1000 0 C 700 110, 300 110, 0 0";
export const MOBILE_TARGET_PATH = "M0 0 L1000 0 C 700 0, 300 0, 0 0";
export const MOBILE_EXIT_PATH = "M0 0 L1000 0 C 700 80, 300 80, 0 0";

interface CurveProps {
    isMobile?: boolean;
    isActive?: boolean;
}

const Curve = forwardRef<SVGPathElement, CurveProps>(function Curve(
    { isMobile = false, isActive = true },
    ref
) {
    const defaultD = isMobile
        ? (isActive ? MOBILE_TARGET_PATH : MOBILE_INITIAL_PATH)
        : (isActive ? DESKTOP_TARGET_PATH : DESKTOP_INITIAL_PATH);

    return (
        <svg
            className={isMobile ? styles.svgCurveMobile : styles.svgCurveDesktop}
            viewBox={isMobile ? "0 0 1000 120" : "0 0 140 1000"}
            preserveAspectRatio="none"
        >
            <path ref={ref} d={defaultD} />
        </svg>
    );
});

export default Curve;