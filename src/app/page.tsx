"use client";

import { useEffect } from "react";
import type LocomotiveScroll from "locomotive-scroll";
import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Header from "@/components/Header";
import Des from "@/components/Des";

export default function Home() {
    useEffect(() => {
        let locomotiveScroll: LocomotiveScroll | null = null;

        (async () => {
            const LocomotiveScrollClass = (await import("locomotive-scroll")).default;
            locomotiveScroll = new LocomotiveScrollClass({
                lenisOptions: {
                    lerp: 0.08,
                    duration: 1.2,
                    smoothWheel: true,
                },
            });
        })();

        return () => {
            if (locomotiveScroll) {
                locomotiveScroll.destroy();
            }
        };
    }, []);

    return (
        <main className={styles.page}>
            <Header />
            <Landing />
            <Des />
        </main>
    );
}