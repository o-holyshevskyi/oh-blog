import { PostMeta } from "@/app/lib/posts";
import { timeToRead } from "@/app/lib/time-to-read";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { title } from "../primitives";
import { Image } from '@nextui-org/image';
import { BookIcon } from "../icons";

export default function RelatedPosts({ relatedPosts } : { 
    relatedPosts: {
        meta: PostMeta;
        fileContent: string;
        description: string;
    }[];
}) {
    return (
        <section>
            <div className="inline-block md:max-w-6xl text-center justify-center">
                <div className="mt-8">
                    <p className={title({ color: "blue", size: 'sm' })}>R</p>
                    <p className={title({ size: 'sm' })}>elated topics</p>
                </div>
                <div>
                    <ul className="mt-10 md:flex justify-between gap-6 text-start">
                        {relatedPosts.map((post, index) => (
                            <Card className="py-4 md:w-[50%] mb-10" key={index}>
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <div className="flex items-start items-center">
                                        <BookIcon/>
                                        <p className="text-tiny uppercase font-bold ml-1">{timeToRead(post.fileContent)} min read</p>
                                    </div>
                                    <small className="text-default-500">{post.meta.date}</small>
                                    <h4 className="font-bold text-large">{post.meta.title}</h4>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl w-full"
                                        src={post.meta.img}
                                    />
                                    <div className="mt-2 flex-col items-start">
                                        <small className="text-default-500">In the post</small>
                                        <p>{post.description}</p>
                                    </div>
                                </CardBody>
                                <CardFooter className="bottom-0 z-10 justify-end">
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
            </div>
        </section>
    )
}