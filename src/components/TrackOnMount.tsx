"use client";

import { useEffect } from "react";
import { track, type FunnelEvent } from "@/lib/analytics";

export function TrackOnMount({ event }: { event: FunnelEvent }) {
  useEffect(() => {
    track(event);
    // Dispara uma única vez por visita à página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
