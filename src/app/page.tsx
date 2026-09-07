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

export default function Home() {


    return (
        <main className={styles.page}>
            <Header />
            <Landing />
            <Parallax />
            <Des />
            <Gallery />
            <Workshop />
            <Objects />
            <Projects />
        </main>
    );
}