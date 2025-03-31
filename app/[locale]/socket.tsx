'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Typeriter from './typewriter';
import { Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import Motion, { MotionWhileHover } from './motion';
import { useTranslations } from "next-intl";
import getDomain from './domain';

let socket: any;

export default function ChatBot() {
    const t = useTranslations("chatBot");
    const [message, setMessage] = useState("");
    const [promptMessage, setPromptMessage] = useState("");
    const [messages, setMessages] = useState([{ sender: "bot", text: t("aiFirstMessage") }]);
    const [isThinking, setIsThinking] = useState(false);
    const [predefinedPrompts, setPredefinedPrompts] = useState([
        {
            label: t("prompts.prompt_1"),
            icon: <ToolIcon />
        },
        {
            label: t("prompts.prompt_2"),
            icon: <ContactIcon />
        },
        {
            label: t("prompts.prompt_3"),
            icon: <SkillsIcon />
        },
        {
            label: t("prompts.prompt_4"),
            icon: <WorkIcon />
        }
    ]);

    useEffect(() => {
        const setupSocket = async () => {
            const domain = await getDomain();
            if (!socket) { // Ensure only one socket connection
                socket = io(domain, {
                    path: "/socket.io",
                });

                socket.on("response", (content: any) => {
                    console.log("Response received:", content);
                    setMessages((prev) => [...prev, { sender: "bot", text: content }]);
                    setIsThinking(false);
                });
            }
        };

        setupSocket();

        return () => {
            if (socket) {
                socket.disconnect();
                socket = null; // Reset socket on unmount
            }
        };
    }, []);

    const chatboxRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        const chatbox: any = chatboxRef.current;

        // Check if the user is at the bottom
        const handleScroll = () => {
            if (chatbox) {
                const isBottom = chatbox.scrollHeight - chatbox.scrollTop === chatbox.clientHeight;
                setIsAtBottom(isBottom);
            }
        };

        // Add scroll event listener
        chatbox.addEventListener('scroll', handleScroll);

        const interval = setInterval(() => {
            if (isAtBottom && chatbox) {
                chatbox.scrollTo({
                    top: chatbox.scrollHeight,
                    behavior: "smooth",
                });
            }
        }, 100); // Adjust the interval time if needed

        return () => {
            clearInterval(interval);
            chatbox.removeEventListener('scroll', handleScroll); // Cleanup
        };
    }, [messages, isAtBottom]);

    const sendMessage = () => {
        const userMessage = message || promptMessage;

        console.log("Sending message:", userMessage);
        setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
        socket.emit("message", userMessage);
        setIsThinking(true);
        setMessage("");
    };

    const handlePromptClick = (prompt: string) => {
        setPromptMessage(prompt);
        setIsThinking(true);
    };

    useEffect(() => {
        if (promptMessage) {
            sendMessage();
            const filteredPrompts = predefinedPrompts.filter(
                (prompt) => prompt.label !== promptMessage
            );

            setPredefinedPrompts(filteredPrompts);
        }
    }, [promptMessage]);

    const renderPrompts = () => {
        return (
            <div className='mt-5 px-2'>
                <div className='flex flex-row gap-3'>
                    {predefinedPrompts.map((prompt, index) => (
                        <div key={index}>
                            <MotionWhileHover scale={1.04}>
                                <div
                                    key={index}
                                    role='button'
                                    onClick={() => handlePromptClick(prompt.label)}
                                    className='w-auto text-left p-2 text-default-500 border-2 rounded-lg'
                                >
                                    <div className='flex items-center flex-row gap-3'>
                                        {prompt.icon}
                                        {prompt.label}
                                    </div>
                                </div>
                            </MotionWhileHover>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-start justify-between'>
            <h1 className="text-xl text-default-500 font-bold mb-2">{t("askAiTitle")}</h1>
            <div ref={chatboxRef} className="chatbox h-[550px] max-h-[750px] border-default-500 border-2 w-full px-3 py-3 rounded-lg overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className="w-full flex flex-col mb-8">
                        {/* Sender Label */}
                        {msg.sender !== "user" && <div className="text-sm text-gray-500">{t("aiAssistant")}</div>}

                        {/* Message Bubble */}
                        <div className={`border-2 p-3 flex items-center max-w-xs 
                            ${msg.sender === "user" 
                                ? "bg-blue-500 text-white border-blue-500 self-end rounded-tl-2xl rounded-br-2xl rounded-bl-2xl"  
                                : "bg-gray-200 text-gray-800 border-gray-300 self-start rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"  
                            }`}
                        >
                            <Typeriter text={msg.text} />
                        </div>
                    </div>
                ))}

                {/* Show Typing Indicator if AI is Thinking */}
                {isThinking && (
                    <div className="w-full flex flex-col mb-8">
                        <div className="text-sm text-gray-500">{t("aiAssistant")}</div>
                        <div className="border-2 p-3 flex items-center max-w-xs bg-gray-200 text-gray-800 border-gray-300 self-start rounded-tr-2xl rounded-br-2xl rounded-bl-2xl">
                            <TypingIndicator />
                        </div>
                    </div>
                )}
            </div>
            <div>{renderPrompts()}</div>
            <div className='absolute bottom-20 w-[95%] items-center gap-3'>
                <Textarea
                    classNames={{
                        base: "max-w",
                        input: "max-h-[25px]",
                    }}
                    placeholder={t("askMeAnythingPlaceholder")}
                    value={message}
                    variant="underlined"
                    isDisabled={isThinking}
                    onValueChange={setMessage}
                    onChange={(e) => setMessage(e.target.value)}
                    className='w-full'
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault(); // Prevents new line
                            sendMessage(); // Calls the send function
                        }
                    }}
                    endContent={
                        <Button
                            size='sm' 
                            isIconOnly
                            onClick={sendMessage}
                            variant='light'
                            className='mb-2'
                        >
                            <Motion>
                                {isThinking ? <Think /> : message.length > 0 && <Send />}
                            </Motion>
                            
                        </Button>
                    }
                />
            </div>
        </div>
    );
}

const Send = () => {
    return (
        <svg width={24} className='text-default-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M12.0004 18.5816V12.5M12.7976 18.754L15.8103 19.7625C17.4511 20.3118 18.2714 20.5864 18.7773 20.3893C19.2166 20.2182 19.5499 19.8505 19.6771 19.3965C19.8236 18.8737 19.4699 18.0843 18.7624 16.5053L14.2198 6.36709C13.5279 4.82299 13.182 4.05094 12.7001 3.81172C12.2814 3.60388 11.7898 3.60309 11.3705 3.80958C10.8878 4.04726 10.5394 4.8182 9.84259 6.36006L5.25633 16.5082C4.54325 18.086 4.18671 18.875 4.33169 19.3983C4.4576 19.8528 4.78992 20.2216 5.22888 20.394C5.73435 20.5926 6.55603 20.3198 8.19939 19.7744L11.2797 18.752C11.5614 18.6585 11.7023 18.6117 11.8464 18.5933C11.9742 18.5769 12.1036 18.5771 12.2314 18.5938C12.3754 18.6126 12.5162 18.6597 12.7976 18.754Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
            </g>
        </svg>
    );
}


const Think = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            color="currentColor" 
            className='text-default-500' 
            fill="none"
        >
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "red", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "blue", stopOpacity: 1 }} />
                    <animate
                        attributeName="x1"
                        from="0%"
                        to="100%"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="y1"
                        from="0%"
                        to="100%"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </linearGradient>
            </defs>
            <path stroke="url(#grad1)" d="M15.1449 5.20762C14.5031 4.46785 13.5562 4 12.5 4C11.0033 4 9.72595 4.93951 9.22564 6.26097C8.85144 6.09327 8.43661 6 8 6C6.34315 6 5 7.34315 5 9C5 9.01673 5.00014 9.03343 5.00041 9.05009M15.1449 5.20762C15.5725 5.07274 16.0278 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.1296 20.8707 10.729 20.6372 11.273M15.1449 5.20762C13.7981 5.63239 12.7249 6.67345 12.2561 8C12.1435 8.31841 12.0658 8.65327 12.0275 9M9.05001 14C9.28164 15.1411 10.2905 16 11.5 16C11.7548 16 11.8823 16 11.9998 16.014C12.5855 16.0835 13.1107 16.4081 13.4348 16.9009C13.4999 16.9997 13.5569 17.1137 13.6708 17.3416L15 20M9.05001 14C9.01722 13.8384 9 13.6712 9 13.5C9 12.6822 9.39267 11.9561 9.99976 11.5M9.05001 14H4.5C3.11929 14 2 12.8807 2 11.5C2 10.1193 3.11929 9 4.5 9C4.67138 9 4.83873 9.01724 5.00041 9.05009M20.6372 11.273C20.2961 11.0985 19.9095 11 19.5 11C18.2905 11 17.2816 11.8589 17.05 13M20.6372 11.273C21.4462 11.687 22 12.5288 22 13.5C22 14.8807 20.8807 16 19.5 16C18.2904 16 17.4531 17.2082 17.8778 18.3408L18.5 20M5.00041 9.05009C5.01267 9.7988 5.2992 10.4808 5.76389 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const TypingIndicator = () => {
    return (
        <div className="flex space-x-1">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-typingDots" style={{ animationDelay: "0s" }}></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-typingDots" style={{ animationDelay: "0.2s" }}></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-typingDots" style={{ animationDelay: "0.4s" }}></span>
        </div>
    );
};

const ToolIcon = () => {
    return (
        <svg 
            viewBox="0 -8 72 72" 
            id="Layer_1" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="#3ee66b"
            width={40}
        >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path className="cls-1" d="M13.32,44.31a4.5,4.5,0,0,0,6.36,6.36L34.44,35.91l-6.36-6.36Z"></path>
                    <polygon className="cls-1" points="50.2 16.96 56.63 13.63 60 7.13 56.86 3.99 50.36 7.36 47.03 13.78 39.21 21.61 42.38 24.79 50.2 16.96"></polygon>
                    <path className="cls-1" d="M51.61,34,51,34a8.9,8.9,0,0,0-3.11.58L29.45,16.09A8.9,8.9,0,0,0,30,13l-.06-.6A8.9,8.9,0,0,0,17.19,4.89l6,6a3,3,0,0,1,.68,1.08A3,3,0,0,1,21,16a2.92,2.92,0,0,1-1-.21,3.15,3.15,0,0,1-1.08-.67l-6-6a8.9,8.9,0,0,0,7.49,12.78L21,22a8.9,8.9,0,0,0,3.11-.58L42.6,39.84A8.9,8.9,0,0,0,42,43l.06.6A9,9,0,0,0,51,51.94a8.72,8.72,0,0,0,3.85-.9l-6-6A3.08,3.08,0,0,1,48.21,44,3,3,0,0,1,51,40a2.92,2.92,0,0,1,1,.21,2.72,2.72,0,0,1,1.08.67l6,6A8.9,8.9,0,0,0,51.61,34Z"></path>
                </g>
            </svg>
    )
}

const ContactIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" color="#bd10e0" fill="none">
            <path d="M12 22C7.99306 22 5.98959 22 4.7448 20.682C3.5 19.364 3.5 17.2426 3.5 13C3.5 8.75736 3.5 6.63604 4.7448 5.31802C5.98959 4 7.99306 4 12 4C16.0069 4 18.0104 4 19.2552 5.31802C20.5 6.63604 20.5 8.75736 20.5 13C20.5 17.2426 20.5 19.364 19.2552 20.682C18.0104 22 16.0069 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14.018 9.49261C14.018 10.5972 13.1226 11.4926 12.0181 11.4926C10.9135 11.4926 10.0181 10.5972 10.0181 9.49261C10.0181 8.38808 10.9135 7.49268 12.0181 7.49268C13.1226 7.49268 14.018 8.38808 14.018 9.49261Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.06298 16.7161C9.12133 15.0868 10.802 14.4762 12.0181 14.4774C13.2341 14.4787 14.8656 15.0868 15.9239 16.7161C15.9923 16.8215 16.0112 16.9512 15.9494 17.0607C15.7019 17.4996 14.9334 18.3705 14.3784 18.4296C13.7406 18.4974 12.0723 18.5069 12.0194 18.5072C11.9664 18.5069 10.2466 18.4974 9.60851 18.4296C9.05345 18.3705 8.28496 17.4996 8.03745 17.0607C7.9757 16.9512 7.99456 16.8215 8.06298 16.7161Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const SkillsIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" color="#e04d10" fill="none">
            <path d="M2.45898 9C3.7364 4.94289 7.53608 2 12.0248 2C17.223 2 21.4971 5.94668 22 11L20 10.5929" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.541 15C20.2636 19.0571 16.4639 22 11.9752 22C6.77707 22 2.50297 18.0533 2 13L4.00005 13.4071" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.00198 13.5279V15.5197C9.00198 15.8464 9.15779 16.1573 9.43401 16.3301C10.2776 16.8578 10.9193 17.0125 12.0054 17.046C13.0061 17.0729 13.6336 16.9156 14.5679 16.3316C14.8481 16.1564 15.0089 15.8427 15.0089 15.5113V13.5279M17.0112 11.0149V14.0304M7.04924 10.8436C7.41086 10.0796 9.65363 8.74957 11.7009 8.09253C11.8984 8.02914 12.1106 8.03542 12.3053 8.10674C14.1154 8.76943 16.1288 9.77168 16.8597 10.5853C17.2414 11.01 16.8682 11.552 16.4068 11.8874C15.4704 12.5682 14.4364 13.0978 12.3491 13.8996C12.1282 13.9844 11.8828 13.9873 11.6608 13.9049C9.52012 13.1101 7.51902 12.0842 7.06587 11.1817C7.01245 11.0752 6.9983 10.9512 7.04924 10.8436Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const WorkIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" color="#1c10e0" fill="none">
            <path d="M2 14C2 11.1911 2 9.78661 2.67412 8.77772C2.96596 8.34096 3.34096 7.96596 3.77772 7.67412C4.78661 7 6.19108 7 9 7H15C17.8089 7 19.2134 7 20.2223 7.67412C20.659 7.96596 21.034 8.34096 21.3259 8.77772C22 9.78661 22 11.1911 22 14C22 16.8089 22 18.2134 21.3259 19.2223C21.034 19.659 20.659 20.034 20.2223 20.3259C19.2134 21 17.8089 21 15 21H9C6.19108 21 4.78661 21 3.77772 20.3259C3.34096 20.034 2.96596 19.659 2.67412 19.2223C2 18.2134 2 16.8089 2 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 7C16 5.11438 16 4.17157 15.4142 3.58579C14.8284 3 13.8856 3 12 3C10.1144 3 9.17157 3 8.58579 3.58579C8 4.17157 8 5.11438 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 11L6.65197 11.202C10.0851 12.266 13.9149 12.266 17.348 11.202L18 11M12 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
