'use client';

import { Link } from "@nextui-org/link";
import { MotionWhileHover } from "./motion";
import { AIICon } from "@/components/icons";
import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import ChatBot from "./socket";
import getDomain from "./domain";
import { useEffect, useState } from "react";

export default function AskAI() {
    const [isMobile, setIsMobile] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const t = useTranslations("chatBot");
    
    useEffect(() => {
            const checkScreenSize = () => {
                const mobile = window.innerWidth < 768; // Mobile width threshold
                setIsMobile(mobile);
            };
    
            checkScreenSize(); // Check on mount
            window.addEventListener("resize", checkScreenSize);
            return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

	return (
        <div>
            <MotionWhileHover>
                <Link
                    size="sm"
                    isBlock
                    isExternal={false}
                    color="foreground"
                    onPress={onOpen}
                >
                    <AIICon size={20}/> {t("askAi")}
                </Link>
            </MotionWhileHover>
            <Modal 
                isOpen={isOpen} 
                size="5xl"
                placement="bottom" 
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
                className="fixed bottom-[-20] w-full md:h-[845px] overflow-y-auto"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {() => (
                        <div>
                            <ModalBody>
                                <ChatBot />
                            </ModalBody>
                            {!isMobile && <ModalFooter className="md:absolute relative bottom-14 md:bottom-0">
                                <p className="text-tiny text-default-400">{t("askAiFooter")}</p>
                            </ModalFooter>}
                        </div>  
                    )}
                </ModalContent>
            </Modal>
        </div>
	)
}