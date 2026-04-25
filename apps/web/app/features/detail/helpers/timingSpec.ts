export interface TimingFieldSpec {
  key: string;
  color: string;
  name: string;
  description: string;
}

export const TIMING_SPEC: TimingFieldSpec[] = [
  {
    key: "_blocked_queueing",
    color: "#787878",
    name: "Queueing",
    description: "Time request spent in browser queue before sending",
  },
  {
    key: "_blocked_proxy",
    color: "#4a8fa0",
    name: "Proxy",
    description: "Time blocked waiting for proxy",
  },
  {
    key: "blocked",
    color: "#b06060",
    name: "Blocked",
    description: "Time waiting for network connection to be available",
  },
  {
    key: "dns",
    color: "#8e6898",
    name: "DNS",
    description: "DNS hostname lookup time",
  },
  {
    key: "connect",
    color: "#b87840",
    name: "Connect",
    description: "Time to establish TCP connection",
  },
  {
    key: "ssl",
    color: "#c09038",
    name: "SSL",
    description: "SSL/TLS handshake time (included within connect)",
  },
  {
    key: "send",
    color: "#5090a0",
    name: "Send",
    description: "Time to send HTTP request to server",
  },
  {
    key: "wait",
    color: "#905878",
    name: "Wait",
    description: "Waiting for first byte from server (TTFB)",
  },
  {
    key: "receive",
    color: "#4a7ab0",
    name: "Receive",
    description: "Time to receive full HTTP response",
  },
];

export const SSL_KEY = "ssl";
export const CONNECT_KEY = "connect";

export function buildTimingSegments(
  timings: Record<string, number>,
  totalTime: number,
) {
  const mainSpecs = TIMING_SPEC.filter((s) => s.key !== SSL_KEY);
  const sslSpec = TIMING_SPEC.find((s) => s.key === SSL_KEY)!;
  const sslValue = timings[SSL_KEY] ?? -1;

  const visible = mainSpecs
    .map((s) => ({ ...s, value: timings[s.key] ?? -1 }))
    .filter((s) => s.value > 0);

  if (visible.length === 0) return [];

  const naturalPcts = visible.map((s) => (s.value / totalTime) * 100);
  const sum = naturalPcts.reduce((a, b) => a + b, 0);
  const normalizedPcts = naturalPcts.map((p) => (p / sum) * 100);

  let cumLeft = 0;
  return visible.map((s, i) => {
    const widthPct = normalizedPcts[i] ?? 0;
    const leftPct = cumLeft;
    cumLeft += widthPct;

    const isConnect = s.key === CONNECT_KEY;
    const subSegment =
      isConnect && sslValue > 0
        ? { color: sslSpec.color, widthPct: (sslValue / s.value) * 100 }
        : undefined;

    return {
      key: s.key,
      color: s.color,
      name: s.name,
      value: s.value,
      pct: (s.value / totalTime) * 100,
      widthPct,
      leftPct,
      subSegment,
    };
  });
}

export function buildTimingRows(
  timings: Record<string, number>,
  totalTime: number,
) {
  return TIMING_SPEC.map((s) => ({ ...s, value: timings[s.key] ?? -1 }))
    .filter((s) => s.value > 0)
    .map((s) => ({
      key: s.key,
      color: s.color,
      name: s.name,
      description: s.description,
      value: s.value,
      pct: (s.value / totalTime) * 100,
    }));
}
