import { GymBar } from "@/components/home/GymBar";
import { ScenicRoute } from "@/components/home/ScenicRoute";
import { Section } from "@/components/home/Section";
import { StartLights } from "@/components/home/StartLights";

// Rest stop: the hobbies, each as a small toy.
export function OffTheClock() {
  return (
    <Section
      id="off-the-clock"
      kicker="REST STOP"
      title="Off the clock."
      note={
        <>
          where the engine
          <br />
          gets tuned
        </>
      }
      bodyClassName="flex flex-wrap gap-3.5"
    >
      <GymBar />
      <div className="flex min-w-0 flex-[4_1_260px] flex-col gap-3.5">
        <StartLights />
        <ScenicRoute />
      </div>
    </Section>
  );
}
