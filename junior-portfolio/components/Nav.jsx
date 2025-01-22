"use client";
import Link from "next/link";
import links from "./Links";
import { useActiveSection } from "./ActiveSectionContext";

export default function Nav() {
    const { activeSection, setActiveSection } = useActiveSection();

    return (
        <nav className="flex gap-8">
            {links.map((link, index) => (
                <Link
                    href={link.href}
                    key={index}
                    className={`hover:text-accent relative group transition-all ${activeSection === link.href.substring(1) ? "text-accent" : ""}`}
                >
                    {link.name}
                    <span
                        className={`absolute left-0 bottom-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full ${activeSection === link.href.substring(1) ? "w-full" : "w-0"}`}
                    ></span>
                </Link>
            ))}
        </nav>
    );
}
