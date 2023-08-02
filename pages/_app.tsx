import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode, ReactElement, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

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
    const guestRoutes = [/^\/$/, /^\/paiements$/, /^\/liste-evenements$/, /^\/liste-participants\/\[id_event]$/, /^\/inscriptions\/add\/\[id_event]$/, /^\/inscriptions\/edit\/\[id_event]\/\[username]$/, /^\/inscriptions\/modifier/, /^\/connexion$/];
    const result = guestRoutes.filter(reg=> reg.test(path));
    if(result.length === 0){
      const token = getCookie('token');
        (!token || token == "") && router.push("/")
    }

  }, [router])
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <div id="__next">
      <Component {...pageProps} />
    </div>
  );
  // return <Layout>
  // <Component {...pageProps} />
  // </Layout>
}
