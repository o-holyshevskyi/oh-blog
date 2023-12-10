import PostBody from "@/components/posts/post-body";
import { getPostBySlug, getRelatedPosts as getRelatedPostsById } from "../../lib/posts";
import Tags from "@/components/posts/tags";
import RelatedPosts from "@/components/posts/related-posts";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import ScrollToTopButton from "@/components/scroll-to-top";
import { getHeadings } from "@/app/lib/mdx-headings";
import ScrollBar from "@/components/blog-items/scroll";
import Comments from "@/components/comments";
import LikePost from "@/components/like-post";

const getPageContent = async (slug: string) => {
  const { meta, content, fileContent } = await getPostBySlug(slug);
  return { meta, content, fileContent };
}

const getRelatedPosts = async (slug: string) => getRelatedPostsById(slug);

export async function generateMetadata({ params } : { params: { id: string } }) {
  const { meta } = await getPageContent(params.id);
  return { title: meta.title };
}

export default async function BlogPost({ params } : { params: { id: string } }) {
  const { meta, content, fileContent } = await getPageContent(params.id);
  const relatedPosts = await getRelatedPosts(params.id);
  const headings = await getHeadings(params.id);
  
  return (
    <article>
      <ScrollBar />
      <PostBody 
        meta={meta}
        content={content}
        fileContent={fileContent}
        nodes={headings}
      />
      <Tags
        tags={meta.tags}
      />
      <div className="items-center flex justify-center">
				<hr className="w-[50%] mt-10" />
			</div>
      <LikePost 
        postId={meta.slug}
      />
      <Comments />
      <div className="items-center flex justify-center">
        <RelatedPosts
          relatedPosts={relatedPosts}
        />
      </div>
      <div className="items-center flex justify-center gap-5">
        <Link 
          className={buttonStyles({ variant: "ghost", radius: "full", className: "w-40" })}
          href="/"
        >
          Back to Home
        </Link>
        <ScrollToTopButton />
      </div>
      <div className="items-center flex justify-center mt-10">
				<hr className="w-[50%]" />
			</div>
    </article>      
  );
}