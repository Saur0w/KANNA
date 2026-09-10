"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Header from "@/components/Header";
import Des from "@/components/Des";
import Gallery from "@/components/Gallery";
import Projects from "@/components/Projects";
import Objects from "@/components/Objects";
import Parallax from "@/components/Parallax";
import Workshop from "@/components/Workshop";
import Marquee from "@/components/Marquee";
import Spaces from "@/components/Spaces";
import Preloader from "@/components/Preloader";

export default function Home() {


    return (
        <main className={styles.page}>
            <Preloader />
            <Header />
            <Landing />
            <Parallax />
            <Des />
            <Gallery />
            <Workshop />
            <Spaces />
            <Objects />
            <Parallax />
            <Marquee />
            <Projects />
        </main>
    );
}