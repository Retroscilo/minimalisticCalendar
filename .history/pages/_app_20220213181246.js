import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header"
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Planning partagé</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href={``}>
            <a>Add Pet</a>
          </Link>
        </div>

        <img
          id="title"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
          alt="pet care logo"
        ></img>
      </div>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Header />
      <div className="grid wrapper">
          <Component {...pageProps} />
      </div>
        </SessionProvider>
    </>
  );
}

export default MyApp;
