'use client';

import { title } from "../primitives";
import { Card, CardHeader, CardFooter, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { button as buttonStyles } from "@nextui-org/theme";
import { timeToRead } from "@/app/lib/time-to-read";
import { Link } from "@nextui-org/link";
import { useTranslations } from "next-intl";
import { Post } from "@/app/lib/posts";
import Date from '../date/date';
import { useRouter } from "next-intl/client";
import { BookIcon } from "../icons";

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
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-sm mb-2">{posts[0].meta.title}</h4>
                    </CardHeader>
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl w-full p-1"
                        src={posts[0].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div className="flex-col text-tiny">
                            <div className="flex items-start items-center">
                                <BookIcon/>
                                <p className="text-tiny uppercase font-bold ml-1">{timeToRead(posts[0].fileContent)} {t("recentPosts.minRead")}</p>
                            </div>
                            <Date 
                                dateString={posts[0].meta.date}
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[0].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t("recentPosts.readMore")}
                        </Link>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-sm mb-2">{posts[1].meta.title}</h4>
                    </CardHeader>
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl w-full p-1"
                        src={posts[1].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div className="flex-col text-tiny">
                            <div className="flex items-start items-center">
                                <BookIcon/>
                                <p className="text-tiny uppercase font-bold ml-1">{timeToRead(posts[1].fileContent)} {t("recentPosts.minRead")}</p>
                            </div>
                            <Date 
                                dateString={posts[1].meta.date}
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[1].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t("recentPosts.readMore")}
                        </Link>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-sm mb-2">{posts[2].meta.title}</h4>
                    </CardHeader>
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl w-full p-1"
                        src={posts[2].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div className="flex-col text-tiny">
                            <div className="flex items-start items-center">
                                <BookIcon/>
                                <p className="text-tiny uppercase font-bold ml-1">{timeToRead(posts[2].fileContent)} {t("recentPosts.minRead")}</p>
                            </div>
                            <Date 
                                dateString={posts[2].meta.date}
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[2].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t("recentPosts.readMore")}
                        </Link>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-sm mb-2">{posts[3].meta.title}</h4>
                    </CardHeader>
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl w-full p-1"
                        src={posts[3].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div className="flex-col text-tiny">
                            <div className="flex items-start items-center">
                                <BookIcon/>
                                <p className="text-tiny uppercase font-bold ml-1">{timeToRead(posts[3].fileContent)} {t("recentPosts.minRead")}</p>
                            </div>
                            <Date 
                                dateString={posts[3].meta.date}
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[3].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t("recentPosts.readMore")}
                        </Link>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-sm mb-2">{posts[4].meta.title}</h4>
                    </CardHeader>
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl w-full p-1"
                        src={posts[4].meta.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div className="flex-col text-tiny">
                            <div className="flex items-start items-center">
                                <BookIcon/>
                                <p className="text-tiny uppercase font-bold ml-1">{timeToRead(posts[4].fileContent)} {t("recentPosts.minRead")}</p>
                            </div>
                            <Date 
                                dateString={posts[4].meta.date}
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                        </div>
                        <Link 
                            onClick={() => router.push(`/blog/${posts[4].meta.slug}`)}
                            className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                        >
                            {t("recentPosts.readMore")}
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
