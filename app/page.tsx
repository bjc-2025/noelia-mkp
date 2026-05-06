import Header from "@/components/header";
import HeroSection from "@/components/heroSection";
import AboutSection from "@/components/aboutSection";
import VideoSection from "@/components/videoSection";
import ClientFavourites from "@/components/clientFavourites";
import { InstagramSection } from "@/components/instagramSection";
import ContactSection from "@/components/contactSection";
import Footer from "@/components/footer";
import { getHeroCarouselImages } from "@/sanity/loader";

export const revalidate = 60

export default async function Home() {
  const heroImages = await getHeroCarouselImages()

  return (
    <>
      <Header />
      <main>
        <HeroSection images={heroImages} />
        <AboutSection />
        <VideoSection />
        <ClientFavourites />

        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
