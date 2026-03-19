import PostBody from "@/components/posts/post-body";
import { getPostBySlug, getRelatedPosts as getRelatedPostsById } from "../../../lib/posts";
import Tags from "@/components/posts/tags";
import RelatedPosts from "@/components/posts/related-posts";
import NavigationButtons from "@/components/scroll-to-top";
import { getHeadings } from "@/app/lib/mdx-headings";
import ScrollBar from "@/components/blog-items/scroll";
import { unstable_setRequestLocale } from "next-intl/server";
import { ReportView } from "./view";
import { redis } from "@/pages/api/incr";

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

export default async function BlogPost({ params } : { params: { id: string; locale: string; } }) {
  unstable_setRequestLocale(params.locale);
  const { meta, content, fileContent, description } = await getPageContent(params.id, params.locale);
  const relatedPosts = await getRelatedPosts(params.id, params.locale);
  const headings = await getHeadings(params.id, params.locale);

  let views = 0;
  try {
    if (redis) {
      const viewsPromise = redis.get<number>(["pageviews", "projects", params.id].join(":"));
      const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
      const v = await Promise.race([viewsPromise, timeout]);
      views = (v as number) ?? 0;
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
