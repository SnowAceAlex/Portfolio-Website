"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-base text-fg placeholder:text-muted outline-none transition-[border-color,box-shadow] focus:border-accent focus:ring-4 focus:ring-accent/15";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setError("The contact form is not configured yet. Please email me directly instead.");
      return;
    }
    setStatus("sending");
    setError("");
    const data = new FormData(form);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          subject: String(data.get("subject") ?? ""),
          message: String(data.get("message") ?? ""),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError("The message did not go through. Please try again in a moment.");
      }
    } catch {
      setStatus("error");
      setError("Could not reach the server. Check your connection and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Internship, project, or just saying hi"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={`${fieldClass} resize-y`} />
      </div>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 w-fit items-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 text-[15px] font-medium text-accent-fg transition-transform hover:-translate-y-px active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          {status !== "sending" && <ArrowUpRightIcon size={16} weight="bold" />}
        </button>
        <div role="status" aria-live="polite" className="text-sm">
          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.p
                key="sent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2 text-fg"
              >
                <CheckIcon size={16} weight="bold" className="text-accent" />
                Thanks! Your message is on its way. I will reply soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#b42318] dark:text-[#ff8a7a]"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
