'use client';

import { title } from "../primitives";
import { Card, CardHeader, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { button as buttonStyles } from "@nextui-org/theme";
import { timeToRead } from "@/app/lib/time-to-read";
import { Link } from "@nextui-org/link";
import { useTranslations } from "next-intl";
import { Post } from "@/app/lib/posts";
import Date from '../date/date';
import { useRouter } from "next-intl/client";

export default function RecentPostsWrapper({ posts, locale }: { posts: Post[]; locale: string }) {
    const t = useTranslations("homePage");
    const router = useRouter();

    return (
        <>
            <div className="inline-block max-w-2xl text-center justify-center">
                <div className="mt-5">
                    <p className={title({ color: "blue", size: 'sm' })}>{t('recentPosts.later_1')}</p>
                    <p className={title({ size: 'sm' })}>{t('recentPosts.title')}</p>
                </div>
            </div>
            <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 mt-8">
                <Card isFooterBlurred className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 flex-col !items-start backdrop-blur-sm">
                        <h4 className="font-medium text-large">{posts[0].meta.title}</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        isZoomed
                        alt="Card background 1"
                        className="z-0 w-full h-full object-cover"
                        src={posts[0].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <Date 
                                dateString={posts[0].meta.date} 
                                className="text-black text-tiny" 
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                            <p className="text-black text-tiny">{timeToRead(posts[0].fileContent)} {t('recentPosts.minRead')}</p>
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[0].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t('recentPosts.readMore')}
                        </Link>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 flex-col !items-start backdrop-blur-sm">
                        <h4 className="font-medium text-large">{posts[1].meta.title}</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        isZoomed
                        alt="Card background 2"
                        className="z-0 w-full h-full object-cover"
                        src={posts[1].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <Date 
                                dateString={posts[1].meta.date} 
                                className="text-black text-tiny"  
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                            <p className="text-black text-tiny">{timeToRead(posts[1].fileContent)} {t('recentPosts.minRead')}</p>
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[1].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t('recentPosts.readMore')}
                        </Link>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 flex-col !items-start backdrop-blur-sm">
                        <h4 className="font-medium text-large">{posts[2].meta.title}</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        isZoomed
                        alt="Card background 3"
                        className="z-0 w-full h-full object-cover"
                        src={posts[2].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <Date 
                                dateString={posts[2].meta.date} 
                                className="text-black text-tiny"  
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                            <p className="text-black text-tiny">{timeToRead(posts[2].fileContent)} {t('recentPosts.minRead')}</p>
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[2].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t('recentPosts.readMore')}
                        </Link>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                    <CardHeader className="absolute z-10 flex-col items-start backdrop-blur-sm">
                        <h4 className="font-medium text-2xl">{posts[3].meta.title}</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        isZoomed
                        alt="Card example background"
                        className="z-0 w-full h-full object-cover"
                        src={posts[3].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <Date 
                                dateString={posts[3].meta.date} 
                                className="text-black text-tiny"  
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                            <p className="text-black text-tiny">{timeToRead(posts[3].fileContent)} {t('recentPosts.minRead')}</p>
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[3].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t('recentPosts.readMore')}
                        </Link>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                    <CardHeader className="absolute z-10 flex-col items-start backdrop-blur-sm">
                        <h4 className="font-medium text-xl">{posts[4].meta.title}</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        isZoomed
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src={posts[4].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <Date 
                                dateString={posts[4].meta.date} 
                                className="text-black text-tiny"  
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                            <p className="text-black text-tiny">{timeToRead(posts[4].fileContent)} {t('recentPosts.minRead')}</p>
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[4].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t('recentPosts.readMore')}
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
