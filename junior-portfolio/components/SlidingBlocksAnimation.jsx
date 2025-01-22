'use client'
import { delay, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
export default function SlidingBlocksAnimation() {
    const divBlockContainer = useRef(null);
    const [blocks, setBlocks] = useState([]);

    const createBlocks = (amtBlocks) => {
        let height = divBlockContainer.current.getBoundingClientRect().height;
        const newBlocks = [];
        for (let i = 0; i < amtBlocks; i++) {
            newBlocks.push(height / amtBlocks);
        }
        setBlocks(newBlocks);
    }

    useEffect(() => {
        // Call createBlocks after the component has mounted
        createBlocks(6);
        return function cleanup() { }
    }, []);
    return (
        // Container for the sliding Blocks
        <div ref={divBlockContainer} className="w-full h-full absolute flex flex-col -z-10">
            {blocks.map((blockHeight, index) => {
                return (
                    <motion.div
                        key={index}
                        initial={{ width: 0 }}
                        animate={{ width: `${100}%` }}
                        transition={{
                            duration: 1,
                            delay: 0.3 * index,
                            repeat: Infinity,
                            repeatType: "reverse",
                            repeatDelay: 2.5
                        }}
                        style={
                            {
                                height: blockHeight, // Set the height dynamically
                            }
                        }
                        className="bg-primary bg-opacity-90"
                    ></motion.div >
                );
            })}
        </div >
    );
}