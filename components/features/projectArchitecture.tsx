import type { CSSProperties, ReactNode } from "react";

type NodeKind = "source" | "service" | "storage" | "frontend";

type NodeProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  title: string;
  subtitle?: string;
  kind?: NodeKind;
};

const nodeColors: Record<NodeKind, string> = {
  source: "var(--diagram-source)",
  service: "var(--diagram-service)",
  storage: "var(--diagram-storage)",
  frontend: "var(--diagram-frontend)",
};

function DiagramNode({
  x,
  y,
  width = 220,
  height = 73,
  title,
  subtitle,
  kind = "service",
}: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="4"
        fill="var(--diagram-surface)"
        stroke={nodeColors[kind]}
        strokeWidth="1.5"
      />

      <text
        x={x + width / 2}
        y={subtitle ? y + 28 : y + height / 2 + 5}
        textAnchor="middle"
        fill="var(--diagram-text)"
        fontSize="16"
        fontWeight="600"
      >
        {title}
      </text>

      {subtitle && (
        <text
          x={x + width / 2}
          y={y + 51}
          textAnchor="middle"
          fill="var(--diagram-secondary)"
          fontSize="12"
          fontWeight="500"
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}

function Arrow({
  d,
  label,
  labelX,
  labelY,
}: {
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="var(--diagram-arrow)"
        strokeWidth="1.7"
        markerEnd="url(#architecture-arrow)"
      />

      {label && (
        <text
          x={labelX}
          y={labelY}
          fill="var(--diagram-secondary)"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function DiagramCanvas({ children }: { children: ReactNode }) {
  const diagramStyles = {
    "--diagram-surface": "var(--project-diagram-surface)",
    "--diagram-text": "var(--project-diagram-text)",
    "--diagram-secondary": "var(--project-diagram-secondary)",
    "--diagram-arrow": "var(--project-diagram-arrow)",
    "--diagram-source": "#2563eb",
    "--diagram-service": "#7c3aed",
    "--diagram-storage": "#047857",
    "--diagram-frontend": "#0369a1",
  } as CSSProperties;

  return (
    <svg
      viewBox="0 0 760 790"
      role="img"
      aria-label="Project system architecture and data flow"
      className="block h-auto w-full"
      style={diagramStyles}
    >
      <defs>
        <marker
          id="architecture-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path
            d="M0,0 L0,6 L6,3 z"
            fill="var(--diagram-arrow)"
          />
        </marker>
      </defs>

      {children}
    </svg>
  );
}

function BeaconDiagram() {
  return (
    <DiagramCanvas>
      <DiagramNode
        x={270}
        y={20}
        title="Application"
        subtitle="Instrumented with OpenTelemetry"
        kind="source"
      />

      <DiagramNode
        x={270}
        y={125}
        title="OpenTelemetry"
        subtitle="OTLP traces"
        kind="source"
      />

      <DiagramNode
        x={270}
        y={230}
        title="Fastify API"
        subtitle="POST /otel · API key validation"
      />

      <DiagramNode
        x={270}
        y={335}
        title="BullMQ"
        subtitle="Asynchronous span processing"
      />

      <DiagramNode
        x={270}
        y={440}
        title="Span Worker"
        subtitle="Build runs, nodes and edges"
      />

      <Arrow d="M380 93 V120" />
      <Arrow d="M380 198 V225" />
      <Arrow
        d="M380 303 V330"
        label="Queue spans"
        labelX={450}
        labelY={320}
      />
      <Arrow d="M380 408 V435" />

      <path
        d="M380 513 V540 H185 V565"
        fill="none"
        stroke="var(--diagram-arrow)"
        strokeWidth="1.7"
        markerEnd="url(#architecture-arrow)"
      />

      <path
        d="M380 513 V540 H575 V565"
        fill="none"
        stroke="var(--diagram-arrow)"
        strokeWidth="1.7"
        markerEnd="url(#architecture-arrow)"
      />

      <text
        x={185}
        y={531}
        fill="var(--diagram-secondary)"
        fontSize="12"
        fontWeight="500"
        textAnchor="middle"
      >
        Persist graph data
      </text>

      <text
        x={575}
        y={531}
        fill="var(--diagram-secondary)"
        fontSize="12"
        fontWeight="500"
        textAnchor="middle"
      >
        Publish events
      </text>

      <DiagramNode
        x={75}
        y={570}
        width={220}
        title="PostgreSQL"
        subtitle="Runs · Nodes · Edges"
        kind="storage"
      />

      <DiagramNode
        x={465}
        y={570}
        width={220}
        title="Redis"
        subtitle="Pub/Sub"
        kind="storage"
      />

      <Arrow d="M575 643 V665" />

      <DiagramNode
        x={465}
        y={670}
        width={220}
        title="WebSocket"
        subtitle="Live execution events"
      />

      <Arrow d="M575 743 V755" />

      <text
        x={575}
        y={779}
        fill="var(--diagram-text)"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
      >
        Next.js Dashboard
      </text>
    </DiagramCanvas>
  );
}

function FlowSpaceDiagram() {
  return (
    <DiagramCanvas>
      <DiagramNode
        x={270}
        y={25}
        title="Next.js Frontend"
        subtitle="TanStack Query · Clerk · WebSocket"
        kind="frontend"
      />

      <DiagramNode
        x={270}
        y={160}
        title="Express API Server"
        subtitle="Route → Controller → Service → Repository"
      />

      <Arrow
        d="M380 98 V155"
        label="HTTP / WebSocket"
        labelX={470}
        labelY={132}
      />

      <DiagramNode
        x={75}
        y={325}
        width={250}
        title="PostgreSQL"
        subtitle="Prisma · Persistent records"
        kind="storage"
      />

      <DiagramNode
        x={435}
        y={325}
        width={250}
        title="Redis"
        subtitle="Pub/Sub · BullMQ queues"
        kind="storage"
      />

      <path
        d="M380 233 V275 H200 V320"
        fill="none"
        stroke="var(--diagram-arrow)"
        strokeWidth="1.7"
        markerEnd="url(#architecture-arrow)"
      />

      <path
        d="M380 233 V275 H560 V320"
        fill="none"
        stroke="var(--diagram-arrow)"
        strokeWidth="1.7"
        markerEnd="url(#architecture-arrow)"
      />

      <DiagramNode
        x={270}
        y={475}
        title="Clerk"
        subtitle="JWT verification · User webhook"
        kind="source"
      />

      <path
        d="M270 511 H215 V196 H265"
        fill="none"
        stroke="var(--diagram-arrow)"
        strokeWidth="1.7"
        markerEnd="url(#architecture-arrow)"
      />

      <text
        x={380}
        y={610}
        fill="var(--diagram-text)"
        fontSize="13"
        fontWeight="500"
        textAnchor="middle"
      >
        Real-time task events and background notifications
      </text>
    </DiagramCanvas>
  );
}

function GuardrailDiagram() {
  return (
    <DiagramCanvas>
      <DiagramNode
        x={270}
        y={20}
        title="Browser / Client"
        kind="source"
      />

      <DiagramNode
        x={270}
        y={135}
        title="API Server"
        subtitle="Proxy · Billing · Analytics · Alerts"
      />

      <Arrow
        d="M380 93 V130"
        label="AI request"
        labelX={435}
        labelY={115}
      />

      <DiagramNode
        x={30}
        y={285}
        width={250}
        title="Redis"
        subtitle="Atomic Lua counters · BullMQ"
        kind="storage"
      />

      <DiagramNode
        x={480}
        y={285}
        width={250}
        title="PostgreSQL"
        subtitle="Usage events · Limits · Alerts"
        kind="storage"
      />

      <path
        d="M380 208 V240 H155 V280"
        fill="none"
        stroke="var(--diagram-arrow)"
        strokeWidth="1.7"
        markerEnd="url(#architecture-arrow)"
      />

      <path
        d="M380 208 V240 H605 V280"
        fill="none"
        stroke="var(--diagram-arrow)"
        strokeWidth="1.7"
        markerEnd="url(#architecture-arrow)"
      />

      <DiagramNode
        x={270}
        y={420}
        title="AI Provider"
        subtitle="OpenAI / Groq"
        kind="source"
      />

      <Arrow
        d="M380 208 V270 H425 V415"
        label="Forward if within budget"
        labelX={505}
        labelY={370}
      />

      <DiagramNode
        x={270}
        y={565}
        title="WebSocket"
        subtitle="Usage and alert events"
      />

      <Arrow d="M155 358 V515 H380 V560" />
      <Arrow d="M380 493 V560" />

      <DiagramNode
        x={270}
        y={690}
        title="Next.js Dashboard"
        kind="frontend"
      />

      <Arrow d="M380 638 V685" />
    </DiagramCanvas>
  );
}

export function ProjectArchitecture({ slug }: { slug: string }) {
  const diagrams: Record<string, ReactNode> = {
    beacon: <BeaconDiagram />,
    guardrail: <GuardrailDiagram />,
    flowspace: <FlowSpaceDiagram />,
  };

  const diagram = diagrams[slug];

  if (!diagram) {
    return (
      <div className="border border-neutral-300 p-6 text-base text-neutral-800 dark:border-neutral-800 dark:text-neutral-100">
        Architecture diagram is not available for this project yet.
      </div>
    );
  }

  return (
    <div className="min-w-0 overflow-hidden border border-neutral-300 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-neutral-300 pb-4 dark:border-neutral-800">
        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-100 sm:text-xl">
          System architecture
        </h3>

        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Data flow
        </span>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        {diagram}
      </div>
    </div>
  );
}