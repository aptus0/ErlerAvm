"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";

type VitalMetricPayload = {
  id: string;
  name: string;
  value: number;
  rating?: string;
};

declare global {
  interface Window {
    __ERLER_PERF__?: {
      domReadyAt?: number;
      metrics?: Record<string, number>;
    };
  }
}

function storeMetric(metric: VitalMetricPayload) {
  const current = window.__ERLER_PERF__ ?? {};
  const metrics = current.metrics ?? {};

  window.__ERLER_PERF__ = {
    ...current,
    metrics: {
      ...metrics,
      [metric.name]: Math.round(metric.value * 100) / 100,
    },
  };
}

export function WebVitalsReporter() {
  useEffect(() => {
    const setDomReady = () => {
      window.__ERLER_PERF__ = {
        ...(window.__ERLER_PERF__ ?? {}),
        domReadyAt: Math.round(performance.now() * 100) / 100,
      };
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setDomReady, { once: true });
      return () => {
        document.removeEventListener("DOMContentLoaded", setDomReady);
      };
    }

    setDomReady();
    return undefined;
  }, []);

  useReportWebVitals((metric) => {
    storeMetric(metric as VitalMetricPayload);

    if (process.env.NODE_ENV !== "production") {
      console.info(`[WebVital] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating ?? "n/a"})`);
    }
  });

  return null;
}
