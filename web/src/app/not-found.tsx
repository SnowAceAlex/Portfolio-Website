import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-center px-4 pt-32 md:px-6">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tighter md:text-7xl">Wrong turn.</h1>
      <p className="mt-6 max-w-[40ch] text-lg text-muted">This road does not go anywhere. Let&apos;s head back.</p>
      <Link
        href="/"
        className="mt-10 inline-flex h-12 w-fit items-center gap-2 rounded-full border border-line px-6 text-[15px] font-medium transition-colors hover:bg-surface"
      >
        <ArrowLeftIcon size={16} />
        Back home
      </Link>
    </div>
  );
}
