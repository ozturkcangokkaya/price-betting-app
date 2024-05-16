import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <main className="flex flex-col mx-auto max-w-screen-lg mt-10 mb-10">
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default MyApp;
