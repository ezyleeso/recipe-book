import Link from "next/link";
import axios from "@/lib/axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

export default function Menus() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = useCallback(
    () => axios({ url: "/api/posts", method: "get" }),
    []
  );
  useEffect(() => {
    fetchPosts().then(({ data }) => setPosts(data.posts));
  }, [fetchPosts]);

  const router = useRouter();
  const getMenuActiveClass = useCallback(
    (slug) => {
      return router.query.slug === slug ? "is-active" : "";
    },
    [router]
  );

  return (
    <ul className="menus">
      {posts.map(({ slug, title }) => (
        <li key={slug}>
          <Link href={`/posts/${slug}`} className={getMenuActiveClass(slug)}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
