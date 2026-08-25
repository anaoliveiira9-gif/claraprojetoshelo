export interface BriefingInput {
  name: string;
  email: string;
  company: string;
  message: string;
}

/**
 * Mocked briefing submission. Simulates latency and always succeeds.
 * Replace the body with a real call (e.g. Resend, a CRM webhook, or a
 * Supabase insert) when the studio is ready to receive real briefings —
 * the calling form in `src/components/budget-flow.tsx` doesn't need to
 * change.
 */
export async function submitBriefing(
  _input: BriefingInput
): Promise<{ ok: true; receivedAt: string }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, receivedAt: new Date().toISOString() };
}
