import { Post } from "@/app/lib/posts";
import { title } from "@/components/primitives";
import { Card, CardHeader, CardFooter, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Link } from "@nextui-org/link";
import { timeToRead } from "@/app/lib/time-to-read";
import { button as buttonStyles } from "@nextui-org/theme";
import { BookIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import Date from "./date/date";

export default function FilteredPostsWrapper({ filteredPosts, tag } : { filteredPosts: Post[]; tag: string }) {
    const t = useTranslations("filteredPosts");
    const tr = useTranslations("postCards");
    
    return (
        <section className="flex justify-center">
            <div className="flex-col text-center justify-center">
                <div className="mt-8">
                    <p className={title({ color: "blue", size: 'sm' })}>{t("later_1")}</p>
                    <p className={title({ size: 'sm' })}>{t("title")}</p>
                    <p className={title({ size: 'sm', color: 'cyan' })}>{tag}</p>
                </div>
                <ul className="mt-10">
                    {filteredPosts.map((post, index) => (
                        <Card className="py-4 md:w-[50%] md:ml-[25%] mb-10" key={index}>
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <div className="flex items-start items-center text-left">
                                    <BookIcon/>
                                    <p className="text-tiny uppercase font-bold ml-1">{timeToRead(post.fileContent)} {tr("minRead")}</p>
                                </div>
                                <Date 
                                    dateString={post.meta.date} 
                                    className="text-default-500"   
                                    formatDate="LLLL d, yyyy"
                                />
                                <h4 className="font-bold text-large">{post.meta.title}</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl w-full"
                                    src={post.meta.img}
                                />
                                <div className="mt-2 flex-col items-start">
                                    <small className="text-default-500">{tr("inThePost")}</small>
                                    <p>{post.description}</p>
                                </div>
                            </CardBody>
                            <CardFooter className="bottom-0 z-10 justify-end">
                                <Link 
                                    href={`/blog/${post.meta.slug}`}
                                    className={buttonStyles({ radius: "full", color: "primary", size: 'sm' })}
                                >
                                    {tr("readMore")}
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </ul>
            </div>
        </section>
    );
}