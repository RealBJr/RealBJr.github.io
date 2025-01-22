"use client";
import links from "./Links";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { useActiveSection } from "./ActiveSectionContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect } from "react";

export default function MobileNav() {
    const { activeSection, setActiveSection } = useActiveSection();

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("Intersecting:", entry.target.id);
                    setActiveSection(entry.target.id); // Update active section
                }
            });
        };

        const observerOptions = {
            root: null,
            threshold: window.innerWidth <= 768 ? 0.1 : 0.5, // Dynamic threshold for mobile
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // Observe all target sections
        links.forEach((link) => {
            const section = document.querySelector(link.href); // Match `id`
            if (section) {
                observer.observe(section);
                console.log("Observing:", section.id);
            } else {
                console.warn("Section not found:", link.href);
            }
        });

        return () => {
            observer.disconnect();
            console.log("Observer disconnected");
        };
    }, [setActiveSection]);

    return (
        <Sheet>
            <SheetTrigger>
                <div>
                    <FiMenu className="text-[32px] text-accent" />
                </div>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <VisuallyHidden>
                    <Dialog.Title className="sr-only">Mobile Navigator</Dialog.Title>
                </VisuallyHidden>
                <div className="mt-32 mb-40 text-center text-2xl">
                    <Link href="#about">
                        <h1 className="text-4xl font-semibold hover:text-accent-hover">
                            Junior <span className="text-accent">Boni</span>
                        </h1>
                    </Link>
                </div>
                <nav className="flex flex-col justify-center items-center gap-4">
                    {links.map((link, index) => (
                        <Link
                            href={link.href}
                            key={index}
                            className={`hover:text-accent relative group transition-all ${activeSection === link.href.substring(1) ? "text-accent" : ""
                                }`}
                        >
                            {link.name}
                            <span
                                className={`absolute left-0 bottom-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full ${activeSection === link.href.substring(1) ? "w-full" : "w-0"
                                    }`}
                            ></span>
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
