import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode, ReactElement, useEffect, Suspense } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  if (router.pathname === '/connexion' && getCookie('token')) {
    router.push("/dashboard")
  }
  useEffect(() => {
    const path = router.pathname;
    const guestRoutes = [
      /**
       * for test
       */
      /^\/campagne-2024$/,
      /** */
      /^\/$/, /^\/paiements$/, /^\/inscription$/, /^\/faq$/, /^\/ambassadeurs$/, /^\/success\/\[id]$/, /^\/paypal$/, /^\/liste-evenements$/, /^\/faire-un-don$/, /^\/faire-un-don\/autres-projets$/, /^\/faire-un-don\/projets-en-education$/, /^\/faire-un-don\/projets-en-sante$/, /^\/liste-participants\/\[id_event]$/, /^\/inscriptions\/add\/\[id_event]$/, /^\/inscriptions\/add\/\[id_event]\/admin$/, /^\/inscriptions\/edit\/\[id_event]\/\[username]$/, /^\/inscriptions\/modifier/, /^\/connexion$/];
    const result = guestRoutes.filter(reg => reg.test(path));
    if (result.length === 0) {
      const token = getCookie('token');
      (!token || token == "") && router.push("/")
    }

  }, [router])
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <div id="__next">
      <Component {...pageProps} />
      <ProgressBar
        height="4px"
        color="#3b82f6"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  );
  // return <Layout>
  // <Component {...pageProps} />
  // </Layout>
}
