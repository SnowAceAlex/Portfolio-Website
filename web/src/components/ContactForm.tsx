"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CarGlyph } from "@/components/CarGlyph";
import { site } from "@/content/site";
import { formatDay, formatTimeShort, useNow } from "@/lib/clock";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Fields = { name: string; email: string; subject: string; message: string };
const empty: Fields = { name: "", email: "", subject: "", message: "" };

const label = "text-[10.5px] tracking-[.16em]";
const underline =
  "border-0 border-b-[1.5px] border-ink bg-transparent px-0 pb-2 pt-1.5 text-[15px] outline-none focus:border-b-[2.5px] focus:pb-[7px]";

// A postcard from the road: message on the left, stamp and address on the right.
// Sends through Web3Forms, then shows a POSTED stamp in place of the card.
export function ContactForm() {
  const now = useNow();
  const [form, setForm] = useState<Fields>(empty);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [postedAt, setPostedAt] = useState<Date | null>(null);

  const field = (key: keyof Fields) => ({
    id: `f-${key}`,
    name: key,
    value: form[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setError("");
    },
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("need a name, an email and a message");
      return;
    }
    if (!WEB3FORMS_KEY) {
      setError("the postbox isn't set up yet. email me directly instead");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
      });
      const json = await res.json();
      if (json.success) setPostedAt(new Date());
      else setError("it didn't go through. try again in a moment");
    } catch {
      setError("couldn't reach the postbox. check your connection");
    } finally {
      setSending(false);
    }
  }

  if (postedAt) {
    return (
      <div className="flex min-h-[380px] flex-col items-start justify-center gap-4 p-[clamp(28px,5vw,64px)]" role="status">
        <div className="relative flex size-[118px] -rotate-10 flex-col items-center justify-center rounded-full border-[2.5px] border-ink">
          <span className="absolute inset-[5px] rounded-full border border-ink" aria-hidden="true" />
          <span className="text-[9px] tracking-[.18em]">POSTED</span>
          <span className="text-[15px] font-medium">{formatDay(postedAt)}</span>
          <span className="text-[9px] tracking-[.12em]">{formatTimeShort(postedAt)}</span>
        </div>
        <h2 className="mt-2 font-serif text-[clamp(36px,4.4vw,56px)] leading-none">Thanks, {form.name.trim()}.</h2>
        <p className="max-w-[44ch] text-[14px] leading-[1.7]">
          It&apos;s on its way down the road. I&apos;ll write back to {form.email.trim()}.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setPostedAt(null);
          }}
          className="font-hand text-[26px] underline"
        >
          write another one
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-wrap">
      <div className="flex min-w-0 flex-[1_1_300px] flex-col p-[clamp(18px,2.6vw,30px)]">
        <p className="font-hand text-[28px] leading-none">a postcard from the road</p>
        <label htmlFor="f-message" className={`${label} mt-5`}>
          MESSAGE
        </label>
        <textarea
          {...field("message")}
          placeholder="Hi Vinh,"
          className="mt-1.5 min-h-[224px] flex-1 resize-y border-0 bg-[repeating-linear-gradient(transparent_0_31px,var(--line)_31px_32px)] p-0 text-[14px] leading-8 outline-none placeholder:text-ink placeholder:opacity-50 focus-visible:outline-dashed focus-visible:outline-[1.5px] focus-visible:outline-offset-4 focus-visible:outline-ink"
        />
      </div>
      <div className="my-6 hidden w-[1.5px] bg-ink wide:block" aria-hidden="true" />
      <div className="relative flex min-w-0 flex-[1_1_280px] flex-col gap-[18px] p-[clamp(18px,2.6vw,30px)]">
        <div className="flex items-start justify-between gap-3" aria-hidden="true">
          <div className="flex size-[92px] flex-none -rotate-12 flex-col items-center justify-center rounded-full border-[1.5px] border-ink text-[9px] leading-[1.5] tracking-[.14em]">
            <span>HCMC</span>
            <span className="text-[13px] font-medium">{now ? formatDay(now) : "-- ---"}</span>
            <span>2026</span>
          </div>
          <div className="h-[94px] w-[78px] flex-none border-[1.5px] border-dashed border-ink bg-panel p-[5px]">
            <div className="flex size-full flex-col items-center justify-center gap-1.5 border-[1.5px] border-ink bg-hatch">
              <CarGlyph />
              <span className="text-[8px] tracking-[.14em]">SNOW ACE</span>
            </div>
          </div>
        </div>
        <p className="text-[12px] leading-[1.6]">
          TO: {site.name}
          <br />
          somewhere on the road, HCMC
        </p>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-name" className={label}>
            NAME
          </label>
          <input {...field("name")} autoComplete="name" className={underline} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-email" className={label}>
            EMAIL
          </label>
          <input {...field("email")} type="email" autoComplete="email" className={underline} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-subject" className={label}>
            SUBJECT
          </label>
          <input {...field("subject")} className={underline} />
        </div>
        <p className="min-h-[23px] font-hand text-[23px] leading-none" role="alert">
          {error}
        </p>
        <button
          type="submit"
          disabled={sending}
          className="pill pill-ink mt-auto min-h-[46px]! justify-between! disabled:cursor-wait disabled:opacity-60"
        >
          <span>{sending ? "On its way…" : "Send it down the road"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
