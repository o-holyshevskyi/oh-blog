"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";

export default function CollapsibleFooter({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(true); // Default open

    // Detect if the user is on mobile
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768; // Mobile width threshold
            setIsMobile(mobile);
            setIsOpen(!mobile); // Show by default on desktop, hidden on mobile
        };

        checkScreenSize(); // Check on mount
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className="relative items-center justify-start">
            {/* Toggle Button - Only Visible on Mobile */}
            {isMobile && (
                <div
                    // animate={{
                    //     top: isOpen ? "-100px" : "auto",       
                    //     bottom: isOpen ? "auto" : 10,        
                    //     right: isOpen ? "3%" : "40%",  
                    //     translateX: isOpen ? "0%" : "-50%",    
                    //     rotate: isOpen ? 360 : 0  
                    // }}
                    // transition={{ type: "spring", duration: 100, stiffness: 30,  }} // Smooth transition
                    className="absolute z-20"
                >
                    <Button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        isIconOnly
                        variant="light"
                        size="sm"
                    >
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </div>
            )}

            {/* Footer Content */}
            <div
                className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[calc(100%-16px)] shadow-small rounded-large`}
                // initial={false} // Avoid hydration mismatch
                // animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
                // transition={{ duration: 0.3 }}
            >
                <CardFooter className="flex flex-col md:flex-row justify-between items-center border-white/20 border-1 py-2 md:py-1">
                    {children}
                </CardFooter>
            </div>
        </div>
    );
}

const ChevronUp = () => {
    return (
        <svg 
            viewBox="0 0 24 24" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            className="text-default-500"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="currentColor"></path>
            </g>
        </svg>
    )
}


const ChevronDown = () => {
    return (
        <svg 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 52 52" 
            enable-background="new 0 0 52 52" 
            className="text-default-500"
            width={20}
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M47.6,17.8L27.1,38.5c-0.6,0.6-1.6,0.6-2.2,0L4.4,17.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2 c0.6-0.6,1.6-0.6,2.2,0l16.1,16.3c0.6,0.6,1.6,0.6,2.2,0l16.1-16.2c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C48.1,16.3,48.1,17.2,47.6,17.8z"></path> 
            </g>
        </svg>
    )
}
