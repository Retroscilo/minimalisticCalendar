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
          <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
