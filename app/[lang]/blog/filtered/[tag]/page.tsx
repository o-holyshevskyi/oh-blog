import { getPostsByTag } from "@/app/lib/posts";
import { title } from "@/components/primitives";
import { Card, CardHeader, CardFooter, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Link } from "@nextui-org/link";
import { timeToRead } from "@/app/lib/time-to-read";
import { button as buttonStyles } from "@nextui-org/theme";
import { BookIcon } from "@/components/icons";

export async function generateMetadata({ params } : { params: { tag: string } }) {
	return { title: `All by - '${params.tag}'` };
}

export default async function FilteredPostsByTag({ params } : { params: { tag: string } }) {
    const filteredPosts = await getPostsByTag(params.tag);
    
    return (
        <section className="flex justify-center">
            <div className="flex-col text-center justify-center">
                <div className="mt-8">
                    <p className={title({ color: "blue", size: 'sm' })}>P</p>
                    <p className={title({ size: 'sm' })}>osts filtered by: </p>
                    <p className={title({ size: 'sm', color: 'cyan' })}>{params.tag}</p>
                </div>
                <ul className="mt-10">
                    {filteredPosts.map((post, index) => (
                        <Card className="py-4 md:w-[50%] md:ml-[25%] mb-10" key={index}>
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
        </section>
    );
}