"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Nav from "./Nav";

export default function Header() {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id); // Set active section based on ID
                } else {
                    setActiveSection(""); // Reset if section is not visible
                }
            });
        };

        // Observe each section (use the 'about' section in this case)
        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // Use the viewport as the root
            threshold: 0.5, // Trigger when 50% of the section is visible
        });

        const section = document.querySelector("#about");
        if (section) observer.observe(section);

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <header className="py-8 xl:py-12 text-white sticky top-0 bg-primary">
            <div
                className={`container mx-auto flex items-center transition-all duration-300 ${activeSection ? "justify-center" : "justify-between"}`}
            >
                {/* Logo with Intersection Observer */}
                <Link href="#about">
                    <h1
                        className={`text-4xl font-semibold transition-all duration-300 hover:text-accent-hover ${activeSection
                            ? "opacity-0 translate-x-[-100%] pointer-events-none "
                            : "opacity-100 translate-x-0"
                            }`}
                    >
                        Junior <span className="text-accent">Boni</span>
                    </h1>
                </Link>

                {/* Desktop nav */}
                <div
                    className={`hidden xl:flex items-center transition-all duration-300 opacity-100 ${activeSection ? "-ml-52 gap-4" : "gap-8 "}`}>
                    <Nav />
                    <Link href="#contact">
                        <Button className="hover:bg-accent hover:text-primary">
                            Download My Resume!
                        </Button>
                    </Link>
                </div>

                {/* Mobile nav */}
                <div className="xl:hidden">mobile nav</div>
            </div>
        </header>
    );
}
