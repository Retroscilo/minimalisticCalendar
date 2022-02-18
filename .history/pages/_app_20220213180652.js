import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react"

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
          <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
        </div>

        <img
          id="title"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
          alt="pet care logo"
        ></img>
      </div>
      <div className="grid wrapper">
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </div>
    </>
  );
}

export default MyApp;
