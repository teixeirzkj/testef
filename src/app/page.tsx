import { Hero } from "@/components/hero/Hero";
import { PageBody } from "@/components/sections/PageBody";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <PageBody />
      </main>
      <Footer />
    </>
  );
}
