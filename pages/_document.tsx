import { Html, Head, Main, NextScript } from "next/document";
import { manrope } from "./_app";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png?v=2" />
      </Head>
      <body className={`${manrope.variable} font-sans`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
