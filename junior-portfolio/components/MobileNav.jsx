"use client";
import links from "./Links";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { FiMenu } from "react-icons/fi";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import * as Dialog from "@radix-ui/react-dialog";

export default function MobileNav({ activeSection }) {
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
                            className={`hover:text-accent relative group transition-all 
                                ${activeSection === link.href.substring(1) ? "text-accent" : ""}`}
                        >
                            {link.name}
                            <span
                                className={`absolute left-0 bottom-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full 
                                    ${activeSection === link.href.substring(1) ? "w-full" : "w-0"}`}
                            ></span>
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
