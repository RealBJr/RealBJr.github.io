import { motion, AnimatePresence } from "framer-motion";

export default function About() {
    return (
        <div id="about" className="h-screen w-full">
            <div className="h-full w-1/2 bg-primary">
                {/* Text */}
                <h1 className="text-white text-4xl font-bold left-10 top-10">
                    Hi, I am <br />
                    <span className="text-primary">Junior Boni</span> <br />
                    <span>a Software Engineering Student</span> <br />
                    <span>an aspiring ML developer</span> <br />
                    <span>life time learner</span>
                </h1>
            </div>
        </div>
    );
}