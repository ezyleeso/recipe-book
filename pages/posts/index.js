import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Posts({ posts }) {
  return (
    <div>
      <h1>포스트 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(
      path.join(postsDirectory, filename),
      "utf-8"
    );
    const { data } = matter(fileContent);
    return {
      slug,
      title: data.title,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
