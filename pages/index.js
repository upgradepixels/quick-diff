import Head from "next/head";
import dynamic from "next/dynamic";
import NavigationMenu from "../components/navigation menu/NavigationMenu";
import Footer from "../components/footer/Footer";

const MonacoEditorWithNoSSR = dynamic(
  () => import("../components/editor/MonacoEditor"),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <Head>
        <title>Quick Diff</title>
        <link rel="apple-touch-icon" sizes="180x180" href="favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="favicon_io/site.webmanifest" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <meta
          name="description"
          content="Proxyman • Modern & Native Web Debugging Proxy. Proxyman is a native, high-performance macOS app, which enables developers to capture, inspect, intercept and manipulate HTTP/HTTPS requests and responses with ease. Proxyman supports Big Sur, Monterey macOS, Apple M1, iOS (iPhone, iPad, tvOS, watchOS) and Android devices."
        />
        <meta name="author" content="admin@proxyman.io" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="robots" content="index,follow"></meta>
        <meta name="googlebot" content="index,follow"></meta>
        <meta property="og:site_name" content="Proxyman"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:url" content="https://proxyman.io/" />
        <meta
          property="og:title"
          content="Proxyman • Modern Web Debugging Proxy on macOS, iOS, Android devices and iOS Simulator."
        />
        <meta
          property="og:description"
          content="Proxyman is a native, high-performance macOS app, which enables developers to capture, inspect, and manipulate HTTP(s) requests/responses with ease."
        />
        <meta
          property="og:image"
          content="https://proxyman.io/assets/images/twitter_banner_v2.png"
        />
        <meta name="twitter:creator" content="@proxyman_app"></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@proxyman_app" />
        <meta
          name="twitter:title"
          content="Proxyman • Modern Web Debugging Proxy on macOS, iOS, Android devices and iOS Simulator"
        />
        <meta
          name="twitter:description"
          content="Proxyman is a native, high-performance macOS app, which enables developers to capture, inspect, and manipulate HTTP(s) requests/responses with ease."
        />
        <meta
          name="twitter:image"
          content="https://proxyman.io/assets/images/twitter_banner_v2.png"
        />
        <meta
          name="twitter:image:alt"
          content="Proxyman app Dashboard on macOS"
        />
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=UTF-8"
        ></meta>
        <meta httpEquiv="Content-Language" content="en"></meta>
        <meta name="apple-mobile-web-app-title" content="Proxyman"></meta>
        <meta name="application-name" content="Proxyman"></meta>
        <meta name="theme-color" content="#000000"></meta>
      </Head>

      <div
        className="h-screen w-screen overflow-hidden px-10 pt-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, hsl(210, 16.7%, 97.6%), hsl(206, 20.0%, 98.8%))",
        }}
      >
        <NavigationMenu />
        <MonacoEditorWithNoSSR />
        <Footer />
      </div>
    </div>
  );
}
