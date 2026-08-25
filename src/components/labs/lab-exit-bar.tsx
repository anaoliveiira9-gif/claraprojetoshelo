import Link from "next/link";
import { Logo } from "@/components/logo";

/**
 * Fixed pill shown inside every lab's fullscreen experience so it never
 * feels like a dead end — always a way back to the ALUMNA portfolio.
 * Uses ALUMNA's own tokens deliberately: this is the one element that
 * should NOT inherit the lab's own brand identity.
 */
export function LabExitBar({
  labIndex,
  labName,
}: {
  labIndex: string;
  labName: string;
}) {
  return (
    <Link
      href={`/labs/${labIndex}`}
      data-cursor-hover
      className="fixed left-3 top-3 z-[80] flex items-center gap-2 rounded-full border border-line bg-ink/90 py-2 pl-2.5 pr-3.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper backdrop-blur-md transition-colors hover:border-accent hover:text-accent sm:left-5 sm:top-5"
    >
      <Logo className="h-3.5 w-3.5 text-accent" />
      <span>Alumna</span>
      <span className="text-paper-faint">/ Lab {labIndex}</span>
      <span className="hidden text-paper-faint sm:inline">— {labName}</span>
    </Link>
  );
}
