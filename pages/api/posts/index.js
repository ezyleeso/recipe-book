import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");
const files = fs.readdirSync(postsDirectory);

function getPosts(slug) {
  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(postsDirectory, filename),
      "utf-8"
    );

    const { data } = matter(fileContent);

    return {
      slug: filename.replace(".md", ""),
      date: data.date.toISOString().slice(0, 10),
      title: data.title,
    };
  });

  if (slug) {
    return posts.filter((post) => post.slug.replace(/-/g, "").includes(slug));
  }

  return posts;
}

export default function handler(req, res) {
  const posts = getPosts(req.query.slug);

  return res.status(200).json({ posts });
}
