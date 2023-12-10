'use client';

import { LikeButton } from "@lyket/react";
import { Button } from "@nextui-org/button";
import { Icon } from '@iconify/react';

export default function LikePost({ postId } : { postId: string; }) {
    return (
        <div className="flex justify-center m-5">
            <LikeButton 
                id={`like-${postId}`}
                namespace="post"
            >
                {({
                    handlePress,
                    totalLikes,
                    isLoading,
                    isCounterVisible
                }) => (
                    <div className="flex items-center">
                        <Button
                            onClick={handlePress}
                            disabled={isLoading}
                            color="danger" 
                            aria-label="Like"
                            isIconOnly
                        >
                            <Icon icon="icon-park-outline:like" fontSize={25} className="text-white" />
                        </Button>
                        {isCounterVisible && <div className="ml-2 mr-2">{totalLikes}</div>}
                    </div>
                )}
            </ LikeButton>
            <LikeButton  
                id={`clap-${postId}`}
                namespace="post"
            >
                {({
                    handlePress,
                    totalLikes,
                    isLoading,
                    isCounterVisible
                }) => (
                    <div className="flex items-center">
                        <Button
                            onClick={handlePress}
                            disabled={isLoading}
                            color="success" 
                            aria-label="Clap"
                            isIconOnly
                        >
                            <Icon icon="ph:hands-clapping" fontSize={25} className="text-white" />
                        </Button>
                        {isCounterVisible && <div className="ml-2 mr-2">{totalLikes}</div>}
                    </div>
                )}
            </ LikeButton>
            <LikeButton 
                id={`fire-${postId}`}
                namespace="post"
            >
                {({
                    handlePress,
                    totalLikes,
                    isLoading,
                    isCounterVisible
                }) => (
                    <div className="flex items-center">
                        <Button
                            onClick={handlePress}
                            disabled={isLoading}
                            color="warning" 
                            aria-label="Fire"
                            isIconOnly
                        >
                            <Icon icon="ph:fire" fontSize={25} className="text-white"/>
                        </Button>
                        {isCounterVisible && <div className="ml-2 mr-2">{totalLikes}</div>}
                    </div>
                )}
            </ LikeButton>
            <LikeButton 
                id={`sad-${postId}`}
                namespace="post"
            >
                {({
                    handlePress,
                    totalLikes,
                    isLoading,
                    isCounterVisible
                }) => (
                    <div className="flex items-center">
                        <Button
                            onClick={handlePress}
                            disabled={isLoading}
                            color="secondary" 
                            aria-label="Sad"
                            isIconOnly
                        >
                            <Icon icon="mdi:emoticon-neutral-outline" fontSize={25} className="text-white" />
                        </Button>
                        {isCounterVisible && <div className="ml-2 mr-2">{totalLikes}</div>}
                    </div>
                )}
            </ LikeButton>
        </div>
    )
}