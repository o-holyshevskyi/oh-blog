import PostBody from "@/components/posts/post-body";
import { getPostBySlug, getRelatedPosts as getRelatedPostsById } from "../../../lib/posts";
import Tags from "@/components/posts/tags";
import RelatedPosts from "@/components/posts/related-posts";
import NavigationButtons from "@/components/scroll-to-top";
import { getHeadings } from "@/app/lib/mdx-headings";
import ScrollBar from "@/components/blog-items/scroll";
import Comments from "@/components/comments";
import LikePost from "@/components/like-post";
import dynamic from "next/dynamic";
import { unstable_setRequestLocale } from "next-intl/server";
import { ReportView } from "./view";
import { redis } from "@/pages/api/incr";

const domain = process.env.DOMAIN as string;

const getPageContent = async (slug: string, locale: string) => {
  const { meta, content, fileContent, description } = await getPostBySlug(slug, locale);
  return { meta, content, fileContent, description };
}

const getRelatedPosts = async (slug: string, locale: string) => {
  return getRelatedPostsById(slug, locale);
}

export async function generateMetadata({ params } : { params: { id: string; locale: string; } }) {
  const { meta } = await getPageContent(params.id, params.locale);
  return { title: meta.title };
}

const NoSSR = dynamic(() => import('../../../../components/share-social-links'), { ssr: false })

export default async function BlogPost({ params } : { params: { id: string; locale: string; } }) {
  unstable_setRequestLocale(params.locale);
  const { meta, content, fileContent, description } = await getPageContent(params.id, params.locale);
  const relatedPosts = await getRelatedPosts(params.id, params.locale);
  const headings = await getHeadings(params.id, params.locale);

  let views = 0;
  let likes = 0;
  try {
    if (redis) {
      const viewsPromise = redis.get<number>(["pageviews", "projects", params.id].join(":"));
      const likesPromise = redis.get<number>(["postLikes", "projects", params.id].join(":"));
      const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
      const [v, l] = await Promise.all([
        Promise.race([viewsPromise, timeout]),
        Promise.race([likesPromise, timeout]),
      ]);
      views = (v as number) ?? 0;
      likes = (l as number) ?? 0;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <article>
      <ScrollBar />
      <PostBody
        meta={meta}
        content={content}
        fileContent={fileContent}
        nodes={headings}
        locale={params.locale}
        views={views}
      />
      <Tags tags={meta.tags} />

      <div className="border-t border-warmgray/30 dark:border-warmgray/10 mt-10 pt-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <LikePost
            slug={meta.slug}
            likes={likes}
          />
          <NoSSR
            slug={meta.slug}
            title={meta.title}
            domain={domain}
            description={description}
            locale={params.locale}
          />
        </div>
      </div>

      <Comments />

      <div className="mt-12">
        <RelatedPosts
          relatedPosts={relatedPosts}
          locale={params.locale}
        />
      </div>

      <div className="mt-10">
        <NavigationButtons />
      </div>

      <ReportView slug={params.id} />
    </article>
  );
}
