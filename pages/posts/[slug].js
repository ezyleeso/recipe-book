import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);

  try {
    // 마크다운 파일이 있는지 확인
    fs.accessSync(filePath, fs.constants.F_OK);

    // 파일이 존재하면 읽어들이고 처리
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      props: {
        post: {
          frontmatter: data,
          contentHtml,
        },
      },
    };
  } catch (err) {
    // 파일이 없을 경우, 404 페이지를 반환
    return {
      notFound: true,
    };
  }
}
