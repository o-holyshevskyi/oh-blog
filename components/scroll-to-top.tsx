'use client';

import { Button } from "@nextui-org/button";

export default function ScrollToTopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    return (
        <Button 
            variant="ghost" 
            radius="full"
            className="w-40"
            onClick={scrollToTop}
        >
            To Top
        </Button>
    );
}