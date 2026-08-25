import { LabExitBar } from "@/components/labs/lab-exit-bar";

export default function Placeholder() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink text-paper">
      <LabExitBar labIndex="006" labName="Nova" />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
        Em construção
      </p>
    </div>
  );
}
