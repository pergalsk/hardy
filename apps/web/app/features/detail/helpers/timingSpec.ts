export interface TimingFieldSpec {
  key: string;
  color: string;
  name: string;
  description: string;
}

export const TIMING_SPEC: TimingFieldSpec[] = [
  {
    key: "_blocked_queueing",
    color: "#b0b0b0",
    name: "Queueing",
    description: "Time request spent in browser queue before sending",
  },
  {
    key: "_blocked_proxy",
    color: "#808080",
    name: "Proxy",
    description: "Time blocked waiting for proxy",
  },
  {
    key: "blocked",
    color: "#a1887f",
    name: "Blocked",
    description: "Time waiting for network connection to be available",
  },
  {
    key: "dns",
    color: "#ab47bc",
    name: "DNS",
    description: "DNS hostname lookup time",
  },
  {
    key: "connect",
    color: "#ef6c00",
    name: "Connect",
    description: "Time to establish TCP connection",
  },
  {
    key: "ssl",
    color: "#c0ca33",
    name: "SSL",
    description: "SSL/TLS handshake time (included within connect)",
  },
  {
    key: "send",
    color: "#43a047",
    name: "Send",
    description: "Time to send HTTP request to server",
  },
  {
    key: "wait",
    color: "#00897b",
    name: "Wait",
    description: "Waiting for first byte from server (TTFB)",
  },
  {
    key: "receive",
    color: "#1e88e5",
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
