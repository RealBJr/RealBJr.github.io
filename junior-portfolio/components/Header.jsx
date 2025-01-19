"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";

export default function Header() {
    const [activeSection, setActiveSection] = useState("");
    const [headerAnimation, setHeaderAnimation] = useState(false); // State to control the header animation
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
        <AnimatePresence>
            <motion.header
                className="py-8 xl:py-12 text-white sticky top-0 bg-primary"
                initial={{ opacity: 1, y: 0 }}
                animate={{
                    opacity: headerAnimation ? 0 : 1, // Trigger disappearance
                    y: headerAnimation ? -50 : 0,     // Move the header up during disappearance
                }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <motion.div
                    className="container mx-auto flex items-center"
                    initial={{ justifyContent: "space-between" }}
                    animate={{
                        justifyContent: activeSection ? "center" : "space-between",
                        transition: { duration: 0.3, ease: "easeInOut" },
                    }}
                >
                    {/* Logo with Intersection Observer */}
                    {!activeSection && (
                        <motion.div
                            ref={logoRef}
                            key="logo"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
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

                    {/* Desktop Nav */}
                    <motion.div
                        ref={navRef}
                        initial={{ x: 100 }}
                        animate={{
                            x: activeSection ? 0 : 100,
                        }}
                        transition={{ x: { duration: 0.3 } }}
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
            </motion.header>
        </AnimatePresence>
    );
}
