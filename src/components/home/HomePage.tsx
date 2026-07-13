import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Categories from "@/components/home/Categories";
import SundusSection from "@/components/home/SundusSection";
import BlogSection from "@/components/home/BlogSection";
import type { HomeData } from "@/types/homeTypes";
import { stripHtml } from "@/lib/utils";

type HomePageProps = {
  data?: HomeData | null;
};

export default function HomePage({ data }: HomePageProps) {
  const heroSlides = data?.hero?.map((slide) => ({
    image: slide.image || "/hero1.jpg",
    title: slide.title,
    desc: stripHtml(slide.text) || slide.sub_title,
    buttonText: slide.button_text,
    buttonLink: slide.button_link_url || "/contact",
  }));


  return (
    <>
      <Hero slides={heroSlides} />
      <AboutSection about={data?.about_us} />
      <Categories categories={data?.categories_section} />
      <SundusSection sundus={data?.video_section} />
      <WhyChooseUs whyChooseUs={data?.why_choose_us_section} />
      <BlogSection blogSection={data?.blogs_section} />
    </>
  );
}
