import { useState } from "react";

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const email = "alexvinh2911@gmail.com";
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

  async function handleSubmit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setIsSubmitting(true);
    setStatus("");
    setError("");

    try {
      if (!WEB3FORMS_KEY) {
        setError(
          "Thiếu cấu hình API key. Vui lòng đặt VITE_WEB3FORMS_KEY trong .env.local"
        );
        setIsSubmitting(false);
        return;
      }
      const formData = new FormData(formEl);
      const payload = {
        access_key: WEB3FORMS_KEY,
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        subject: String(formData.get("subject") || ""),
        message: String(formData.get("message") || ""),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
        formEl.reset();
      } else {
        setError("Gửi thất bại. Vui lòng thử lại sau.");
      }
    } catch (err) {
      console.error(err);
      setError("Có lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-black text-white min-h-screen font-jakarta">
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-6 text-center">
        <p className="text-transparent bg-clip-text bg-gradient-to-t from-[#FF8660] via-[#D5491D] to-[#8E1F00] to-90% uppercase tracking-wide font-bold text-4xl">
          Contact
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold">
          Let’s work together
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Have an opportunity or a question? Send me a message — I’ll get back
          to you soon.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm text-gray-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg bg-[#2A2A2A] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg bg-[#2A2A2A] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm text-gray-300"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="w-full rounded-lg bg-[#2A2A2A] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Project inquiry, collaboration, ..."
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full rounded-lg bg-[#2A2A2A] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 resize-y"
              placeholder="Tell me a bit about your project or question..."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            <a
              href={`mailto:${email}`}
              className="text-sm text-gray-300 hover:underline"
            >
              Or email me directly
            </a>
          </div>

          {status && <p className="text-sm text-green-400">{status}</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>

        <div className="mt-10 text-sm text-gray-400">
          <p>
            Prefer socials? Connect via LinkedIn or GitHub in the footer below.
          </p>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
