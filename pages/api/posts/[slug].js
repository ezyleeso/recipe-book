import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

async function getPost(slug) {
  const file = path.join(process.cwd(), "posts", `${slug}.md`);

  try {
    // 마크다운 파일이 있는지 확인
    fs.accessSync(file, fs.constants.F_OK);

    // 파일이 존재하면 읽어들이고 처리
    const fileContent = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(fileContent);

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      date: data.date.toISOString().slice(0, 10),
      title: data.title,
      contentHtml,
    };
  } catch (err) {
    // 파일이 없을 경우, 404 페이지를 반환
    return null;
  }
}

export default async function handler(req, res) {
  const { slug } = req.query;

  const post = await getPost(slug);

  if (!post) {
    return res.status(404).json(null);
  }

  return res.status(200).json(post);
}
