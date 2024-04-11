import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Posts.module.css";

export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState({});

  const fetchPost = useCallback(
    () => axios({ url: `/api/posts/${slug}`, method: "get" }),
    [slug]
  );

  useEffect(() => {
    fetchPost().then(({ data }) => setPost(data));
  }, [fetchPost]);

  if (!post) return null;

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>{post.title}</h2>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        ></div>
      </div>
    </>
  );
}
