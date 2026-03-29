import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/**
 * remark-gfm / rehype-slug and @mdx-js/mdx can resolve different unified/vfile versions;
 * runtime is fine but TypeScript reports incompatible Pluggable / VFileMessage types.
 */
export const parseMDX = async (content: any) => {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  } as Parameters<typeof serialize>[1]);
};
