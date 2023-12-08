'use client';

import { timeToRead } from '@/app/lib/time-to-read';
import Date from '../date/date';
import { title } from '../primitives';
import { Chip } from "@nextui-org/chip";
import { ReactElement, JSXElementConstructor } from 'react';
import { PostMeta } from '@/app/lib/posts';
import { Image } from '@nextui-org/image';
import TOCComponent from './table-of-contents';

export default function PostBody({ 
    content, 
    meta,
    fileContent,
    nodes
} : { 
    content: ReactElement<any, string | JSXElementConstructor<any>>; 
    meta: PostMeta;
    fileContent: string;
    nodes: any;
}) {
    const timeToReadValue = timeToRead(fileContent);

    return (
        <div className='w-full'>
            <div>
                <h1 className={title({ size: "lg" })}>{meta.title}</h1>
                <div className='mt-5 mb-5 flex gap-3'>
                    <Chip color="primary" variant="flat"><Date dateString={meta.date} /></Chip>
                    <Chip color="primary" variant="flat">{timeToReadValue} min read</Chip>
                </div>
            </div>
            <div className='flex justify-center w-full mt-10 mb-10'>
                <Image
                    src={meta.img}
                    alt='Post Image'
                />
            </div>
            <div className='flex justify-start w-full'>
                <div className='prose dark:prose-invert md:text-2xl'>
                    {content}
                </div>
                {
                    nodes.length > 0 && (
                    <div className='md:w-1/3 ml-40 hidden md:block'>
                        <div className="sticky top-10 w-[500px]">
                            <TOCComponent headings={nodes}></TOCComponent>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
}