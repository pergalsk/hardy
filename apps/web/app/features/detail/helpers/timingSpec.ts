export interface TimingFieldSpec {
  key: string;
  color: string;
  name: string;
  description: string;
  parent?: string;
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
    color: "#b87840",
    name: "SSL",
    description: "SSL/TLS handshake time (included within connect)",
    parent: "connect",
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

const childSpecs = TIMING_SPEC.filter((s) => s.parent !== undefined);

export function buildTimingSegments(
  timings: Record<string, number>,
  totalTime: number,
) {
  const childKeys = new Set(childSpecs.map((s) => s.key));
  const parentSpecs = TIMING_SPEC.filter((s) => !childKeys.has(s.key));

  const visible = parentSpecs
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

    const childSpec = childSpecs.find((c) => c.parent === s.key);
    const childValue = childSpec ? (timings[childSpec.key] ?? -1) : -1;
    const subSegment =
      childSpec && childValue > 0
        ? { key: childSpec.key, color: childSpec.color, widthPct: (childValue / s.value) * 100 }
        : undefined;
    const name = subSegment ? `${s.name}/${childSpec!.name}` : s.name;

    return {
      key: s.key,
      color: s.color,
      name,
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
      ...(s.parent !== undefined && { striped: true }),
    }));
}
