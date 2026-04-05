import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Statement from "@/components/sections/Statement";
import Inquiry from "@/components/sections/Inquiry";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Statement />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
