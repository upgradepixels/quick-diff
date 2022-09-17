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
