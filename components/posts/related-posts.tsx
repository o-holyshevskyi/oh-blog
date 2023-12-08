import { PostMeta } from "@/app/lib/posts";
import { timeToRead } from "@/app/lib/time-to-read";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { title } from "../primitives";
import { Image } from '@nextui-org/image';

export default function RelatedPosts({ relatedPosts } : { 
    relatedPosts: {
        meta: PostMeta;
        fileContent: string;
    }[];
}) {
    return (
        <section>
            <div className="inline-block md:max-w-2xl text-center justify-center">
                <div className="mt-8">
                    <p className={title({ color: "blue", size: 'sm' })}>R</p>
                    <p className={title({ size: 'sm' })}>elated topics</p>
                </div>
                <ul className="mt-10">
                    {relatedPosts.map((post, index) => (
                        <Card 
                            isFooterBlurred 
                            radius="lg"
                            className="border-none mb-10"
                            key={index}
                        >
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large text-left">{post.meta.title}</h4>
                            </CardHeader>
                            <CardBody>
                                <Image
                                    alt={`post-image-${index}`}
                                    className="object-cover mb-20"
                                    height={400}
                                    src={post.meta.img}
                                    width={400}
                                />
                            </CardBody>
                            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                <div>
                                    <p className="text-black text-tiny">{post.meta.date}</p>
                                    <p className="text-black text-tiny">{timeToRead(post.fileContent)} min read</p>
                                </div>
                                <Link 
                                    href={`/blog/${post.meta.slug}`}
                                    className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}
                                >
                                    Read More
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </ul>
            </div>
        </section>
    )
}