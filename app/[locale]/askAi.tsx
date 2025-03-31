'use client';

import { Link } from "@nextui-org/link";
import { MotionWhileHover } from "./motion";
import { AIICon } from "@/components/icons";
import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import ChatBot from "./socket";
import getDomain from "./domain";

export default function AskAI() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const t = useTranslations("chatBot");
    
	const handleClick = async () => {
        const domain = await getDomain();
		await fetch(`${domain}/api/socket`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
	}

	return (
        <div>
            <MotionWhileHover>
                <Link
                    size="sm"
                    isBlock
                    isExternal={false}
                    color="foreground"
                    onClick={handleClick}
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
                className="fixed bottom-[-20] w-full h-[845px] overflow-y-auto"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {() => (
                        <div>
                            <ModalBody>
                                <ChatBot />
                            </ModalBody>
                            <ModalFooter className="absolute bottom-0">
                                <p className="text-tiny text-default-400">{t("askAiFooter")}</p>
                            </ModalFooter>
                        </div>  
                    )}
                </ModalContent>
                
            </Modal>
        </div>
	)
}