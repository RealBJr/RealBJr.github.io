'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import SlidingBlocksAnimation from './SlidingBlocksAnimation';

let descriptions = [
    {
        description: 'A Software Engineering Student',
        param: 'text-5xl',
    },
    {
        description: 'A Full-Stack Developer',
        param: 'text-5xl',
    },
    {
        description: 'A Backend Developer',
        param: 'text-5xl',
    },
];

const initialNameSize = 'text-8xl';

export default function About() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [aboutHeight, setAboutHeight] = useState('100vh'); // Default to full viewport height
    const [nameSize, setNameSize] = useState(initialNameSize); // Font size for "Junior Boni"
    const [hiSize, setHiSize] = useState('text-6xl'); // Font size for "Hi, I am" (default two sizes smaller)

    useEffect(() => {
        const calculateHeight = () => {
            const header = document.getElementsByTagName('header')[0];
            if (header) {
                const headerHeight = header.getBoundingClientRect().height;
                setAboutHeight(`calc(100vh - ${headerHeight}px)`);
            }
        };

        const calculateSizes = () => {
            const width = window.innerWidth;

            let newNameSize;
            if (width >= 1080) {
                newNameSize = initialNameSize;
                descriptions = descriptions.map((item) => ({
                    ...item,
                    param: item.param === 'text-5xl' ? 'text-5xl' : 'text-2xl',
                }));
            } else if (width >= 820) {
                newNameSize = 'text-7xl';
                descriptions = descriptions.map((item) => ({
                    ...item,
                    param: item.param === 'text-5xl' ? 'text-2xl' : 'text-xl',
                }));
            } else if (width >= 575) {
                newNameSize = 'text-5xl';
                descriptions = descriptions.map((item) => ({
                    ...item,
                    param: item.param === 'text-2xl' ? 'text-lg' : 'text-base',
                }));
            } else {
                newNameSize = 'text-4xl';
                descriptions = descriptions.map((item) => ({
                    ...item,
                    param: 'text-base',
                }));
            }

            setNameSize(newNameSize);

            // Dynamically set "Hi, I am" size to be two font sizes smaller
            const sizeMap = {
                'text-8xl': 'text-6xl',
                'text-7xl': 'text-5xl',
                'text-6xl': 'text-4xl',
                'text-5xl': 'text-3xl',
                'text-4xl': 'text-xl',
            };
            setHiSize(sizeMap[newNameSize] || 'text-2xl');
        };

        // Initial calculations
        calculateHeight();
        calculateSizes();

        // Recalculate on window resize
        window.addEventListener('resize', calculateHeight);
        window.addEventListener('resize', calculateSizes);

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('resize', calculateHeight);
            window.removeEventListener('resize', calculateSizes);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentIndex, descriptions.length]);

    return (
        <div
            id="about"
            className="w-1/2 flex items-center justify-center relative z-10 transition-all"
            style={{
                height: aboutHeight,
            }}
        >
            <SlidingBlocksAnimation />
            {/* Text Section */}
            <div className="text-center">
                <span
                    className={`block text-white font-bold ${hiSize}`}
                    style={{
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Custom text shadow
                    }}
                >
                    Hi, I am
                </span>

                <span
                    className={`block ${nameSize} font-bold`}
                    style={{
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Custom text shadow
                    }}
                >
                    Junior Boni
                </span>

                {/* Dynamic Description */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={descriptions[currentIndex].description}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                            opacity: { duration: 0.5 },
                            y: { duration: 0.5 },
                        }}
                        className="mt-4 h-4"
                    >
                        <span
                            className={`${descriptions[currentIndex].param} font-bold text-accent-hover`}
                            style={{
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Custom text shadow
                            }}
                        >
                            {descriptions[currentIndex].description}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
