import { title } from "../primitives";
import { Card, CardHeader, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { button as buttonStyles } from "@nextui-org/theme";
import { Post, getAllPostsMeta } from "@/app/lib/posts";
import { timeToRead } from "@/app/lib/time-to-read";
import { Link } from "@nextui-org/link";
import Bell from "../bell";

const getDaysDifference = (posts: Post[]): number => {
    const latestPost = posts.reduce((prev, current) =>
        new Date(current.meta.date) > new Date(prev.meta.date) ? current : prev
    );
    const currentDate = new Date();
    const latestPostDate = new Date(latestPost.meta.date);
    const daysDifference = Math.floor(
        (currentDate.getTime() - latestPostDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return daysDifference;
}

export default async function RecentPosts() {
    const posts = await getAllPostsMeta();
    const daysDifference = getDaysDifference(posts);

    return (
        <>
            <div className="inline-block max-w-2xl text-center justify-center">
                <div className="mt-5">
                    <p className={title({ color: "blue", size: 'sm' })}>R</p>
                    <p className={title({ size: 'sm' })}>ecent posts</p>
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
                            <p className="text-black text-tiny">{posts[0].meta.date}</p>
                            <p className="text-black text-tiny">{timeToRead(posts[0].fileContent)} min read</p>
                        </div>
                        <Link 
                            href={`/blog/${posts[0].meta.slug}`}
                            className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}
                        >
                            Read More
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
                            <p className="text-black text-tiny">{posts[1].meta.date}</p>
                            <p className="text-black text-tiny">{timeToRead(posts[1].fileContent)} min read</p>
                        </div>
                        <Link 
                            href={`/blog/${posts[1].meta.slug}`}
                            className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}
                        >
                            Read More
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
                            <p className="text-black text-tiny">{posts[2].meta.date}</p>
                            <p className="text-black text-tiny">{timeToRead(posts[2].fileContent)} min read</p>
                        </div>
                        <Link 
                            href={`/blog/${posts[2].meta.slug}`}
                            className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}
                        >
                            Read More
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
                            <p className="text-black text-tiny">{posts[3].meta.date}</p>
                            <p className="text-black text-tiny">{timeToRead(posts[3].fileContent)} min read</p>
                        </div>
                        <Link 
                            href={`/blog/${posts[3].meta.slug}`}
                            className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}
                        >
                            Read More
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
                            <p className="text-black text-tiny">{posts[4].meta.date}</p>
                            <p className="text-black text-tiny">{timeToRead(posts[4].fileContent)} min read</p>
                        </div>
                        <Link 
                            href={`/blog/${posts[4].meta.slug}`}
                            className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}
                        >
                            Read More
                        </Link>
                    </CardFooter>
                </Card>
            </div>
            {daysDifference < 7 && (
                <Bell latestPostId={posts[0].meta.slug}/>
            )}
        </>
    )
}
