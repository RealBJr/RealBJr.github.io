"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { useActiveSection } from "./ActiveSectionContext";

export default function Header() {
    const { activeSection, setActiveSection } = useActiveSection();
    const logoRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id); // Update active section
                }
            });
        };

        const observerOptions = {
            root: null,
            threshold: window.innerWidth <= 768 ? 0.3 : 0.5, // Dynamic threshold
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        const sections = document.querySelectorAll("#about");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [setActiveSection]);

    return (
        <header className="py-8 xl:py-12 text-white sticky top-0 bg-primary">
            <motion.div
                className="container mx-auto flex items-center"
                initial={{ justifyContent: "space-between" }}
                animate={{
                    justifyContent: activeSection === 'about' ? "center" : "space-between",
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                    },
                }}
            >
                <AnimatePresence mode="popLayout">
                    {activeSection !== 'about' && (
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

                <motion.div
                    ref={navRef}
                    initial={{ x: 100 }}
                    animate={{
                        x: activeSection === 'about' ? 0 : 100,
                    }}
                    transition={{
                        x: { duration: 0.3 },
                    }}
                    className="hidden xl:flex items-center gap-4"
                >
                    <Nav />
                    <Link href="#contact">
                        <Button className="hover:bg-accent-hover hover:text-primary">
                            Download My Resume!
                        </Button>
                    </Link>
                </motion.div>

                <div className="xl:hidden">
                    <MobileNav />
                </div>
            </motion.div>
        </header>
    );
}
