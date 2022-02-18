import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Planning partagé</title>
      </Head>

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
