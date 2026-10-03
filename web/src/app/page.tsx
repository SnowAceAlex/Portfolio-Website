import { ClosingCta } from "@/components/home/ClosingCta";
import { Hero } from "@/components/home/Hero";
import { Logbook } from "@/components/home/Logbook";
import { OffTheClock } from "@/components/home/OffTheClock";
import { RoadSoFar } from "@/components/home/RoadSoFar";
import { Trunk } from "@/components/home/Trunk";
import { Windshield } from "@/components/home/Windshield";
import { WorkCards } from "@/components/home/WorkCards";
import { MobileProfile } from "@/components/MobileProfile";

export default function HomePage() {
  return (
    <>
      <section id="home" aria-label="Intro" className="flex scroll-mt-24 flex-col gap-3.5">
        <MobileProfile />
        <Hero />
        <Windshield />
      </section>
      <WorkCards />
      <Logbook />
      <RoadSoFar />
      <OffTheClock />
      <Trunk />
      <ClosingCta />
    </>
  );
}
