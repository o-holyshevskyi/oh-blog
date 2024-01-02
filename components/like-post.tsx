'use client';

import { Button } from "@nextui-org/button";
import { Icon } from '@iconify/react';
import { redis } from "@/pages/api/incr";
import { useState } from "react";

export default function LikePost({ slug, likes } : { slug: string; likes: number }) {
    const [likesCount, setLikesCount] = useState(likes);
    
    const handleLike = async () => {
        try {
            // Make the POST request to update the likes on the server
            const response = await fetch("/api/likepost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug }),
            });

            if (response.ok) {
                setLikesCount(likesCount + 1);
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    return (
        <div className="flex justify-center m-5 items-center">
            <Button
                onClick={handleLike}
                color="danger" 
                aria-label="Like"
                isIconOnly
            >
                <Icon icon="icon-park-outline:like" fontSize={25} className="text-white" />
            </Button>
            {<div className="ml-2 mr-2">{likesCount}</div>}
        </div>
    )
}