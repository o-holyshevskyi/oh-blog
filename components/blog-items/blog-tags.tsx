'use client';

import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import { title } from "../primitives";
import { Image } from '@nextui-org/image';
import { Pagination } from '@nextui-org/pagination';
import { siteConfig } from "@/config/site";
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Post } from "@/app/lib/posts";
import { useTranslations } from "next-intl";
import PostCards from "../cards";

export default function BlogTags({ allPosts, page, locale } : { allPosts: Post[]; page: number; locale: string; }) {  
    const t = useTranslations("blogPage");
    
    const [filteredTag, setFilteredTag] = useState('');  
    const [posts, setPosts] = useState(allPosts);
    const [currentPage, setCurrentPage] = useState(page);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    let allTags = new Set();
	allPosts.forEach((postsData) => {
        postsData.meta.tags.forEach((tag) => {
            allTags.add(tag);
        })
    });

    const uniqueTags = [...allTags] as string[];
    uniqueTags.push(t("all"));

    const handleFilterTags = (tag: string) =>  {
        if (tag !== t("all")) {
            const filteredTags = allPosts.filter((post) => post.meta.tags.includes(tag));
            if (filteredTags.length > 0) {
                setPosts(filteredTags);
            }
        } else {
            setPosts(allPosts);
        }
    }

    const handlePagination = useDebouncedCallback((page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        replace(`${pathname}?${params.toString()}`);
    }, 1000);

    const itemsPerPage = 4;

    const totalPages = Math.ceil(posts.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = posts.slice(startIndex, endIndex);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    return (
        <section className="lg:w-full">
            <div className="hidden lg:flex mt-8">
                <div className="flex-col">
                    {uniqueTags.map((tag, index) => (
                        <Chip 
                            color="primary"
                            variant="shadow"
                            key={index}
                            size='lg'
                            className="cursor-pointer m-2"
                            onClick={() => handleFilterTags(tag)}
                        >
                            {tag}
                        </Chip>
                    ))}
                </div>
            </div>
            <div className="md:hidden basis-1 pl-4 mt-8">
                <div className="flex justify-center gap-4">
                    <Button 
                        onPress={onOpen}
                        startContent={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                            </svg>
                        }
                        variant="ghost"
                    > 
                        {t("filterByTags")}
                    </Button>
                    {posts.length !== allPosts.length && (
                        <Button 
                            onPress={() => {
                                handleFilterTags(t("all"));
                                setFilteredTag('');
                            }}
                            startContent={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            }
                            variant="ghost"
                        >
                            {t("resetFilter")}
                        </Button>)
                    }
                </div>
                <div className="mt-2 flex justify-center">
                    {filteredTag !== '' && (
                        <Chip 
                        color="primary"
                        variant="shadow"
                        size='lg'
                        className="cursor-pointer m-2"
                    >
                        {filteredTag}
                    </Chip>
                    )}
                </div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" backdrop="blur">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalBody>
                                    <div className="flex-col">
                                        {uniqueTags.map((tag, index) => (
                                            <Chip 
                                                color="primary"
                                                variant="shadow"
                                                key={index}
                                                size='lg'
                                                className="cursor-pointer m-2"
                                                onClick={() => {
                                                    handleFilterTags(tag);
                                                    onClose();
                                                    setFilteredTag(tag);
                                                }}
                                            >
                                                {tag}
                                            </Chip>
                                        ))}
                                    </div>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div className="mt-5 mb-5">
                <p className={title({ size: 'sm' })}>{t("allPosts")} ({posts.length})</p>
            </div>
            {allPosts.length > 0 ? (
                <div>
                    <PostCards 
                        displayedItems={displayedItems}
                        locale={locale}
                    />
                    <div className="flex justify-center m-5">
                        <div className="flex flex-col gap-5 bottom-1">
                            <Pagination
                                total={totalPages}
                                page={currentPage}
                                onChange={handlePagination}
                                showControls
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center m-5">
                    <Image 
                        alt={`posts-not-found`}
                        height={400}
                        src={siteConfig.images.noPosts}
                        className="mb-5 rounded-full"
                        width={400}
                    />
                    <p className={title({ size: 'sm' })}>{t("noPosts")}</p>
                </div>
            )}
        </section>
    )
}