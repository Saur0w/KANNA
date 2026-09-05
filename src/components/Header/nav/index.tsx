"use client";

import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "./Link";

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
    { title: "Contact", href: "/" }
];

export default function Nav({ isActive = true, onClose }: NavProps) {
    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!menuRef.current) return;

            if (isActive) {
                gsap.fromTo(
                    menuRef.current,
                    { x: "calc(-100% - 100px)" },
                    {
                        x: "0%",
                        duration: 0.8,
                        ease: "power4.inOut",
                    }
                );
            } else {
                gsap.to(menuRef.current, {
                    x: "calc(-100% - 100px)",
                    duration: 0.8,
                    ease: "power4.inOut",
                    onComplete: () => {
                        if (onClose) onClose();
                    },
                });
            }
        },
        { dependencies: [isActive], scope: menuRef }
    );

    return (
        <div ref={menuRef} className={styles.menu}>
            <div className={styles.body}>
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
            </div>
        </div>
    );
}