'use client';

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useTranslations } from "next-intl";
import { button as buttonStyles } from "@nextui-org/theme";

export default function NavigationButtons() {
    const t = useTranslations("postPage");
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    return (
        <div className="items-center flex justify-center gap-5">
            <Link 
                className={buttonStyles({ variant: "ghost", radius: "full", className: "w-40" })}
                href="/"
            >
                {t("backToHome")}
            </Link>
            <Button 
                variant="ghost" 
                radius="full"
                className="w-40"
                onClick={scrollToTop}
            >
                {t("toTop")}
            </Button>
        </div>
    );
}