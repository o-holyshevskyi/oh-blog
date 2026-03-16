'use client';

import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Icon } from '@iconify/react';
import DateComponent from '@/components/date/date';

interface PostPreview {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  timeToRead: number;
}

interface BlogPreviewClientProps {
  posts: PostPreview[];
  heading: string;
  viewAll: string;
  minRead: string;
  locale: string;
}

export default function BlogPreviewClient({ posts, heading, viewAll, minRead, locale }: BlogPreviewClientProps) {
  return (
    <section id="blog" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle({ color: 'blue' })}>{heading}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {posts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.1}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1" isPressable>
                  <CardBody className="p-5">
                    <div className="flex items-center gap-2 text-xs text-default-400 mb-3">
                      <DateComponent dateString={post.date} locale={locale} />
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <Icon icon="mdi:clock-outline" width={14} />
                        {post.timeToRead} {minRead}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-default-500 text-sm mt-2 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </CardBody>
                  <CardFooter className="px-5 pb-4 pt-0">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Chip key={tag} size="sm" variant="flat" className="text-xs">
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <ScrollReveal>
            <Button
              as={Link}
              href="/blog"
              variant="bordered"
              color="primary"
              radius="full"
              size="lg"
              endContent={<Icon icon="mdi:arrow-right" width={20} />}
            >
              {viewAll}
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
