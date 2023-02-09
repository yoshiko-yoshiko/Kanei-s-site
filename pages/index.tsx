import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { frontMatter } from "@/types/types";

export const getStaticProps = () => {
  const files = fs.readdirSync("posts/blog");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`posts/blog/${fileName}`, "utf-8");
    const { data } = matter(fileContent);

    return {
      frontMatter: data,
      slug,
    };
  });
  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }) {
  return (
    <div className="my-8">
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/post/${post.slug}`}>
            <>{post.frontMatter.title}</>
          </Link>
        </div>
      ))}
    </div>
  );
}
