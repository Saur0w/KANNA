"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Link from "./Link";
import Curve, {
    DESKTOP_INITIAL_PATH,
    DESKTOP_TARGET_PATH,
    DESKTOP_EXIT_PATH,
    MOBILE_INITIAL_PATH,
    MOBILE_TARGET_PATH,
    MOBILE_EXIT_PATH,
} from "./Curve";

gsap.registerPlugin(CustomEase, useGSAP);

if (typeof window !== "undefined") {
    try {
        CustomEase.create("kanna", "0.76, 0, 0.24, 1");
        CustomEase.create("snellenberg", "0.76, 0, 0.24, 1");
    } catch {
        // Fallback handled by GSAP
    }
}

interface NavItem {
    title: string;
    href: string;
}

interface NavProps {
    isActive?: boolean;
    onClose?: () => void;
}

const navItems: NavItem[] = [
    { title: "Objects", href: "/" },
    { title: "Kiln & Craft", href: "/" },
    { title: "Lookbook", href: "/" },
    { title: "Studio", href: "/" },
    { title: "Contact", href: "/" },
];

export default function Nav({ isActive = true, onClose }: NavProps) {
    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);
    const [isMobile, setIsMobile] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLDivElement | null>(null);
    const headerTagRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useGSAP(
        () => {
            if (!menuRef.current) return;

            const mobile = window.innerWidth <= 768;

            if (isActive) {
                const tl = gsap.timeline({ defaults: { ease: "kanna" } });

                if (backdropRef.current) {
                    tl.fromTo(
                        backdropRef.current,
                        { opacity: 0 },
                        { opacity: 1, duration: 0.6, ease: "power2.out" },
                        0
                    );
                }

                if (mobile) {
                    if (pathRef.current) {
                        tl.set(pathRef.current, { attr: { d: MOBILE_INITIAL_PATH } }, 0);
                        tl.to(
                            pathRef.current,
                            { attr: { d: MOBILE_TARGET_PATH }, duration: 0.8 },
                            0
                        );
                    }
                    tl.fromTo(
                        menuRef.current,
                        { y: "-100%", x: "0%" },
                        { y: "0%", x: "0%", duration: 0.8 },
                        0
                    );
                } else {
                    if (pathRef.current) {
                        tl.set(pathRef.current, { attr: { d: DESKTOP_INITIAL_PATH } }, 0);
                        tl.to(
                            pathRef.current,
                            { attr: { d: DESKTOP_TARGET_PATH }, duration: 0.8 },
                            0
                        );
                    }
                    tl.fromTo(
                        menuRef.current,
                        { x: "-100%", y: "0%" },
                        { x: "0%", y: "0%", duration: 0.8 },
                        0
                    );
                }

                if (headerTagRef.current) {
                    tl.fromTo(
                        headerTagRef.current,
                        { opacity: 0, y: -12 },
                        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                        0.2
                    );
                }

                if (footerRef.current) {
                    tl.fromTo(
                        footerRef.current,
                        { opacity: 0, y: 24 },
                        { opacity: 1, y: 0, duration: 0.7 },
                        0.3
                    );
                }
            } else {
                const tl = gsap.timeline({
                    onComplete: () => {
                        if (onClose) onClose();
                    },
                });

                if (backdropRef.current) {
                    tl.to(
                        backdropRef.current,
                        { opacity: 0, duration: 0.65, ease: "power2.inOut" },
                        0
                    );
                }

                if (headerTagRef.current) {
                    tl.to(
                        headerTagRef.current,
                        { opacity: 0, y: -10, duration: 0.25, ease: "power2.in" },
                        0
                    );
                }

                if (footerRef.current) {
                    tl.to(
                        footerRef.current,
                        { opacity: 0, y: 15, duration: 0.25, ease: "power2.in" },
                        0
                    );
                }

                if (mobile) {
                    tl.to(
                        menuRef.current,
                        { y: "-100%", x: "0%", duration: 0.62, ease: "kanna" },
                        0.08
                    );

                    if (pathRef.current) {
                        tl.set(pathRef.current, { attr: { d: MOBILE_TARGET_PATH } }, 0);
                        tl.to(
                            pathRef.current,
                            { attr: { d: MOBILE_EXIT_PATH }, duration: 0.22, ease: "power2.out" },
                            0.24
                        );
                        tl.to(
                            pathRef.current,
                            { attr: { d: MOBILE_TARGET_PATH }, duration: 0.22, ease: "power2.in" },
                            0.46
                        );
                    }
                } else {
                    tl.to(
                        menuRef.current,
                        { x: "-100%", y: "0%", duration: 0.8, ease: "kanna" },
                        0
                    );

                    if (pathRef.current) {
                        tl.set(pathRef.current, { attr: { d: DESKTOP_TARGET_PATH } }, 0);
                        tl.to(
                            pathRef.current,
                            { attr: { d: DESKTOP_EXIT_PATH }, duration: 0.28, ease: "sine.out" },
                            0.24
                        );
                        tl.to(
                            pathRef.current,
                            { attr: { d: DESKTOP_TARGET_PATH }, duration: 0.28, ease: "sine.in" },
                            0.52
                        );
                    }
                }
            }
        },
        { dependencies: [isActive] }
    );

    return (
        <>
            <div
                ref={backdropRef}
                className={styles.backdrop}
                onClick={onClose}
                aria-label="Close navigation overlay"
            />

            <div ref={menuRef} className={styles.menu}>
                <div className={styles.body}>
                    <div ref={headerTagRef} className={styles.headerTag}>
                        <span className={styles.tagDot} />
                        <span className={styles.tagText}>INDEX // NAVIGATION</span>
                    </div>

                    <div
                        onMouseLeave={() => setSelectedIndicator(pathname)}
                        className={styles.nav}
                    >
                        {navItems.map((data, index) => (
                            <Link
                                key={index}
                                data={{ ...data, index }}
                                isActive={selectedIndicator === data.href}
                                setSelectedIndicator={setSelectedIndicator}
                                isExiting={!isActive}
                            />
                        ))}
                    </div>

                    <div ref={footerRef} className={styles.footer}>
                        <div className={styles.footerCol}>
                            <span className={styles.footerLabel}>STUDIO</span>
                            <p className={styles.footerText}>Kyoto · Tokyo · Paris</p>
                            <p className={styles.footerSub}>
                                Artisanal stoneware & spatial anchors
                            </p>
                        </div>
                    </div>
                </div>

                <Curve
                    ref={pathRef}
                    isMobile={isMobile}
                />
            </div>
        </>
    );
}