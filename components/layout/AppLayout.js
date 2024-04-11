import Head from "next/head";
import Link from "next/link";
import AxiosInterceptor from "./AxiosInterceptor";
import Menus from "./Menus";
import Cursor from "../Cursor";

export default function AppLayout({ children }) {
  return (
    <AxiosInterceptor>
      <Head>
        <title>(o´ω`o)ﾉ Recipe Book</title>
        <meta
          name="description"
          content="레시피 북에 방문해 주신 여러분, 환영합니다!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <nav className="nav">
          <h1 className="title">
            {/* <Link href="/">소다미의 레시피 북 ~ ♥</Link> */}
            <Link href="/">Home</Link>
          </h1>
          <Menus />
        </nav>
        <article className="article">
          <div className="container">{children}</div>
        </article>
      </main>
      <Cursor />
    </AxiosInterceptor>
  );
}
