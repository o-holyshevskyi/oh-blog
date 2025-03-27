"use client";  // Add this to prevent Server Component issues
import { motion } from "framer-motion";

export default function Motion({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 1.5,
                scale: { type: "spring", duration: 0.4, bounce: 0.5 },
            }}
        >
            {children}
        </motion.div>
    );
}

export function MotionWhileHover({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
