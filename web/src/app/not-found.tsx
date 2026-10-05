import Link from "next/link";
import { CarGlyph } from "@/components/CarGlyph";
import { Chip } from "@/components/Tag";

const post = (h: number) => <span className="w-[1.5px] bg-ink" style={{ height: h }} />;

export default function NotFound() {
  return (
    <section aria-labelledby="lost-title" className="flex flex-wrap items-stretch gap-3.5">
      <div className="flex min-w-0 flex-[5_1_360px] flex-col gap-[18px] rounded-2xl border-[1.5px] border-ink bg-panel p-[clamp(22px,3.4vw,44px)]">
        <p className="text-[11px] tracking-[.18em]">KM 404 · ROAD CLOSED</p>
        <h1 id="lost-title" className="font-serif text-[clamp(60px,8.5vw,120px)] leading-[.92] tracking-[-.025em]">
          Wrong turn.
        </h1>
        <p className="max-w-[44ch] text-[14px] leading-[1.75]">
          This road doesn&apos;t go anywhere. Happens to the best drivers. Let&apos;s turn around.
        </p>
        <p className="font-hand text-[26px] leading-none">recalculating route…</p>
        <div className="mt-auto flex flex-wrap gap-2">
          <Link href="/" className="pill pill-ink px-5!">
            ← Back to KM 0
          </Link>
          <Link href="/projects" className="pill pill-outline px-5!">
            See the work
          </Link>
        </div>
      </div>

      <div
        className="relative min-h-[420px] min-w-0 flex-[6_1_380px] overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel"
        aria-hidden="true"
      >
        {/* the road band */}
        <div className="absolute inset-x-0 bottom-[22%] h-16 border-y-[1.5px] border-ink">
          <div className="absolute inset-x-0 top-[31px] border-t-[1.5px] border-dashed border-ink opacity-50" />
        </div>
        {/* DETOUR sign on two posts, then the striped barrier */}
        <div className="absolute bottom-[calc(22%+64px)] left-1/2 flex w-[min(78%,360px)] -translate-x-1/2 flex-col items-center">
          <div className="w-full rounded-[6px] border-[1.5px] border-ink bg-panel px-3 py-2.5 text-center">
            <p className="text-[10px] tracking-[.2em]">DETOUR</p>
            <p className="font-serif text-[30px] leading-[1.1]">Page not found</p>
          </div>
          <div className="flex w-full justify-between px-[18%]">
            {post(30)}
            {post(30)}
          </div>
          <div className="h-[26px] w-full rounded-[4px] border-[1.5px] border-ink bg-[repeating-linear-gradient(135deg,var(--ink)_0_12px,var(--panel)_12px_24px)]" />
          <div className="flex w-full justify-between px-[10%]">
            {post(40)}
            {post(40)}
          </div>
        </div>
        {/* the car, mid U-turn */}
        <div className="absolute bottom-[calc(22%+36px)] left-[18%] -scale-x-100">
          <CarGlyph width={76} height={38} />
        </div>
        <Chip className="absolute left-3 top-3">U-TURN OK</Chip>
      </div>
    </section>
  );
}
