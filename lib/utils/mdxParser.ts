import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** remark-gfm@4 + rehype-slug@6 match next-mdx-remote@6 / @mdx-js/mdx@3 (unified v11). */
export const parseMDX = async (content: any) => {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });
};
