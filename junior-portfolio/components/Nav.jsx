"use client"

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
const links = [
    {
        name: "About",
        href: "#about"
    },
    {
        name: "Skills",
        href: "#skills"
    },
    {
        name: "Experience",
        href: "#experience"
    },
    {
        name: "Projects",
        href: "#projects"
    },
    {
        name: "Education",
        href: "#education"
    },
];
export default function Nav() {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry.target.id);
                    setActiveSection(entry.target.id); // Set the active section based on the ID
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // Use the viewport as the root
            threshold: 0.5, // Trigger when 50% of the section is visible
        });

        // Observe each section
        links.forEach((link) => {
            const section = document.querySelector(link.href);
            if (section) observer.observe(section);
        });

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <nav className="flex gap-8">
            {links.map(
                (link, index) => {
                    return (
                        <Link
                            href={link.href}
                            key={index}
                            className={`hover:text-accent relative group transition-all ${activeSection === link.href.substring(1) ? "text-accent" : ""}`}
                        >
                            {link.name}
                            {/* Underscore */}
                            <span
                                className={`absolute left-0 bottom-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full ${activeSection === link.href.substring(1) ? "w-full" : "w-0"}`}
                            ></span>
                        </Link>
                    );
                }
            )}
        </nav>
    );
}
