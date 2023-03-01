import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import { frontMatter } from "@/types/types";

interface Props {
  frontMatter: frontMatter;
  content: string;
}

interface Params {
  params: {
    slug: string;
  };
}

// 記事内容の取得
export const getStaticProps = async ({ params }: Params) => {
  const files = await fs.readFileSync(`posts/blog/${params.slug}.md`, "utf-8");
  const { data, content } = matter(files);
  return { props: { frontMatter: data, content } };
};

// Path取得
export const getStaticPaths = async () => {
  const files = await fs.readdirSync("posts/blog");
  const paths = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

const Post = ({ frontMatter, content }: Props) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="mt-5">
        <Image
          src={`/${frontMatter.image}`}
          width={1200}
          height={700}
          alt={frontMatter.title}
        />
      </div>
      <h1 className="mt-5">{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      <div
        dangerouslySetInnerHTML={{ __html: MarkdownIt().render(content) }}
      ></div>
    </div>
  );
};
export default Post;
