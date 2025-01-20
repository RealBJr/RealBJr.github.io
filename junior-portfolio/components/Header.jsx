"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";

export default function Header() {
    const [activeSection, setActiveSection] = useState("");
    const logoRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                } else {
                    setActiveSection("");
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            threshold: 0.5,
        });

        const section = document.querySelector("#about");
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    // Trigger header animation whenever activeSection changes
    useEffect(() => {
        setHeaderAnimation(true); // Start disappearing animation when activeSection changes
        const timer = setTimeout(() => {
            setHeaderAnimation(false); // Reappear after the animation duration
        }, 300); // Matches the animation duration (0.3s)

        return () => clearTimeout(timer);
    }, [activeSection]);

    return (
        <header className="py-8 xl:py-12 text-white sticky top-0 bg-primary">
            <motion.div
                className="container mx-auto flex items-center"
                initial={{ justifyContent: "space-between" }}
                animate={{
                    justifyContent: activeSection ? "center" : "space-between",
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                    },
                }}
            >
                <AnimatePresence>
                    {/* Logo with Intersection Observer */}
                    {!activeSection && (
                        <motion.div
                            ref={logoRef}
                            key="logo"
                            initial={{ opacity: 0, x: -150 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -150 }}
                            transition={{
                                opacity: { duration: 0.3 },
                                x: { duration: 0.3 },
                            }}
                            className="flex-shrink-0"
                        >
                            <Link href="#about">
                                <h1 className="text-4xl font-semibold hover:text-accent-hover">
                                    Junior <span className="text-accent">Boni</span>
                                </h1>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Nav (Ensure full transition of the nav) */}
                <motion.div
                    ref={navRef}
                    initial={{ x: 100 }}  // Start off-screen
                    animate={{
                        x: activeSection ? 0 : 100, // Slide back to original position when activeSection is set
                    }}
                    exit={{ x: 100 }}  // Ensure nav slides off-screen when not active
                    transition={{
                        x: { duration: 0.3 },
                    }}
                    className="hidden xl:flex items-center gap-4"
                >
                    <Nav />
                    <Link href="#contact">
                        <Button className="hover:bg-accent hover:text-primary">
                            Download My Resume!
                        </Button>
                    </Link>
                </motion.div>

                {/* Mobile Nav */}
                <div className="xl:hidden absolute right-4 top-8">
                    mobile nav
                </div>
            </motion.div>
        </header>
    );
}
