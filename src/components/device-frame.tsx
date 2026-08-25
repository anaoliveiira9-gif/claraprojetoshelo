import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DeviceType = "desktop" | "laptop" | "tablet" | "phone";

export function DeviceFrame({
  type,
  children,
  className,
}: {
  type: DeviceType;
  children: ReactNode;
  className?: string;
}) {
  if (type === "phone") {
    return (
      <div className={cn("w-full max-w-[220px]", className)}>
        <div className="relative rounded-[2rem] border-[6px] border-ink-soft bg-ink-soft p-1.5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.5rem] bg-ink">
            <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink-soft" />
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (type === "tablet") {
    return (
      <div className={cn("w-full max-w-[340px]", className)}>
        <div className="relative rounded-[1.4rem] border-[8px] border-ink-soft bg-ink-soft p-1 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[0.8rem] bg-ink">
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (type === "laptop") {
    return (
      <div className={cn("w-full max-w-[560px]", className)}>
        <div className="rounded-t-[0.9rem] border-[6px] border-b-0 border-ink-soft bg-ink-soft p-1 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-[16/10.2] w-full overflow-hidden rounded-[0.35rem] bg-ink">
            {children}
          </div>
        </div>
        <div className="h-2.5 rounded-b-[0.6rem] bg-gradient-to-b from-ink-soft to-[#1c1c19]" />
        <div className="mx-auto h-1 w-1/4 rounded-b-full bg-[#232320]" />
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-[620px]", className)}>
      <div className="rounded-[0.7rem] border-[6px] border-ink-soft bg-ink-soft p-1 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.3rem] bg-ink">
          {children}
        </div>
      </div>
      <div className="mx-auto h-4 w-2 bg-ink-soft" />
      <div className="mx-auto h-1.5 w-24 rounded-full bg-ink-soft" />
    </div>
  );
}
