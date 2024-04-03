import Head from "next/head";
import Cursor from "../Cursor";
import Link from "next/link";

export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <title>(o´ω`o)ﾉ Recipe Book</title>
        <meta
          name="description"
          content="레시피 북에 방문해 주신 여러분, 환영합니다!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <nav className="nav">
          <h1>
            <Link href="/">Home으로</Link> | <Link href="/posts">Posts</Link>
          </h1>
        </nav>
        <article>{children}</article>
      </main>
      <Cursor />
    </>
  );
}
