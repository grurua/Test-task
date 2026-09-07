import { useEffect, useState } from "react";

// Discover's data is local mock data, but a banking app's personalized
// feed is normally assembled server-side. A brief simulated load lets the
// skeleton state be evaluated like any other real screen.
export function useSimulatedLoading(durationMs = 500): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), durationMs);
    return () => window.clearTimeout(timer);
  }, [durationMs]);

  return loading;
}
