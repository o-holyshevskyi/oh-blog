'use client';

import { motion } from 'framer-motion';

/**
 * Animated sleeping cat illustration — used for empty states.
 * Pure SVG with framer-motion breathing and tail animations.
 */
export default function SleepingCat({ className }: { className?: string }) {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 200 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Body */}
                <motion.ellipse
                    cx="100"
                    cy="100"
                    rx="55"
                    ry="28"
                    className="fill-warmgray/20 dark:fill-warmgray/10"
                    animate={{ ry: [28, 30, 28] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Head */}
                <motion.circle
                    cx="62"
                    cy="82"
                    r="22"
                    className="fill-warmgray/25 dark:fill-warmgray/15"
                    animate={{ cy: [82, 84, 82] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Left ear */}
                <motion.path
                    d="M 48 65 L 42 45 L 56 60 Z"
                    className="fill-warmgray/25 dark:fill-warmgray/15"
                    animate={{ d: ["M 48 65 L 42 45 L 56 60 Z", "M 48 67 L 42 47 L 56 62 Z", "M 48 65 L 42 45 L 56 60 Z"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Right ear */}
                <motion.path
                    d="M 70 62 L 78 44 L 80 62 Z"
                    className="fill-warmgray/25 dark:fill-warmgray/15"
                    animate={{ d: ["M 70 62 L 78 44 L 80 62 Z", "M 70 64 L 78 46 L 80 64 Z", "M 70 62 L 78 44 L 80 62 Z"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Inner left ear */}
                <motion.path
                    d="M 50 64 L 46 52 L 56 61 Z"
                    className="fill-terracotta/20"
                    animate={{ d: ["M 50 64 L 46 52 L 56 61 Z", "M 50 66 L 46 54 L 56 63 Z", "M 50 64 L 46 52 L 56 61 Z"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Inner right ear */}
                <motion.path
                    d="M 72 62 L 77 50 L 78 62 Z"
                    className="fill-terracotta/20"
                    animate={{ d: ["M 72 62 L 77 50 L 78 62 Z", "M 72 64 L 77 52 L 78 64 Z", "M 72 62 L 77 50 L 78 62 Z"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Closed eyes - left */}
                <motion.path
                    d="M 53 82 Q 56 79 59 82"
                    className="stroke-midgray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Closed eyes - right */}
                <motion.path
                    d="M 65 81 Q 68 78 71 81"
                    className="stroke-midgray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Nose */}
                <motion.ellipse
                    cx="62"
                    cy="87"
                    rx="2"
                    ry="1.5"
                    className="fill-terracotta/40"
                    animate={{ cy: [87, 89, 87] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Mouth */}
                <motion.path
                    d="M 60 89 Q 62 91 64 89"
                    className="stroke-midgray/50"
                    strokeWidth="1"
                    strokeLinecap="round"
                    fill="none"
                    animate={{ d: ["M 60 89 Q 62 91 64 89", "M 60 91 Q 62 93 64 91", "M 60 89 Q 62 91 64 89"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Front paw */}
                <motion.ellipse
                    cx="52"
                    cy="108"
                    rx="8"
                    ry="5"
                    className="fill-warmgray/30 dark:fill-warmgray/15"
                    animate={{ cy: [108, 109, 108] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Tail */}
                <motion.path
                    d="M 150 95 Q 165 80 160 100 Q 155 115 148 105"
                    className="stroke-warmgray/30 dark:stroke-warmgray/15"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                    animate={{
                        d: [
                            "M 150 95 Q 165 80 160 100 Q 155 115 148 105",
                            "M 150 95 Q 170 75 162 98 Q 155 118 148 105",
                            "M 150 95 Q 165 80 160 100 Q 155 115 148 105",
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Zzz */}
                <motion.text
                    x="85"
                    y="58"
                    className="fill-midgray/60 font-serif"
                    fontSize="14"
                    animate={{ opacity: [0, 1, 0], y: [58, 50, 42] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    z
                </motion.text>
                <motion.text
                    x="95"
                    y="48"
                    className="fill-midgray/40 font-serif"
                    fontSize="11"
                    animate={{ opacity: [0, 1, 0], y: [48, 40, 32] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    z
                </motion.text>
                <motion.text
                    x="103"
                    y="40"
                    className="fill-midgray/25 font-serif"
                    fontSize="9"
                    animate={{ opacity: [0, 1, 0], y: [40, 32, 24] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    z
                </motion.text>
            </svg>
        </div>
    );
}
