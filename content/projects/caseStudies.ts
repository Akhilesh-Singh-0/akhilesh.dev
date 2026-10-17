export type PerformanceMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type BenchmarkRow = {
  concurrency: string;
  requests: string;
  throughput: string;
  p50: string;
  p95: string;
  p99: string;
  errors: string;
};

export type CaseStudy = {
  eyebrow: string;
  introduction: string;
  problem: string;
  solution: string;
  engineering: {
    title: string;
    description: string;
  }[];
  architectureNote: string;
  performance?: {
    title: string;
    description: string;
    metrics: PerformanceMetric[];
    benchmarks?: BenchmarkRow[];
    note: string;
  };
};

export const caseStudies: Record<string, CaseStudy> = {
  beacon: {
    eyebrow: "OpenTelemetry observability",
    introduction:
      "Beacon turns OpenTelemetry traces into a persistent execution graph and live dashboard updates. It separates telemetry ingestion from background processing so the HTTP request does not have to wait for graph construction to finish.",
    problem:
      "Telemetry ingestion, execution graph construction, and live visualization have different responsibilities. Performing all of that work inside the initial HTTP request would couple ingestion latency to database processing.",
    solution:
      "The Fastify API validates workspace API keys and queues incoming telemetry through BullMQ. A dedicated worker processes spans, persists runs, nodes, and edges in PostgreSQL, and publishes execution events through Redis Pub/Sub to connected dashboards.",
    engineering: [
      {
        title: "Asynchronous ingestion",
        description:
          "The OTLP endpoint validates the request, enqueues telemetry, and returns 202 Accepted without waiting for PostgreSQL graph construction.",
      },
      {
        title: "Execution graph construction",
        description:
          "OpenTelemetry spans become nodes, parent-span relationships become edges, and traces map to runs. Span ID uniqueness prevents duplicate nodes.",
      },
      {
        title: "Event-driven updates",
        description:
          "Processed execution events travel through Redis Pub/Sub and WebSockets, allowing the dashboard to update without continuously polling PostgreSQL.",
      },
      {
        title: "Workspace-scoped ingestion",
        description:
          "Workspace API keys authenticate telemetry ingestion, while dashboard users authenticate through Clerk.",
      },
    ],
    architectureNote:
      "The diagram shows the ingestion and live-visualization paths separately. Historical run data is also retrieved through the Fastify API from PostgreSQL.",
    performance: {
      title: "OTLP ingestion benchmarks",
      description:
        "The production OTLP ingestion endpoint was tested with authenticated requests at increasing concurrency levels.",
      metrics: [
        {
          label: "Peak throughput",
          value: "377.95 req/s",
          detail: "100 concurrent clients",
        },
        {
          label: "Requests processed",
          value: "4,015",
          detail: "Over 10.62 seconds",
        },
        {
          label: "p50 latency",
          value: "224 ms",
        },
        {
          label: "p95 latency",
          value: "289 ms",
        },
        {
          label: "HTTP request failures",
          value: "0%",
        },
      ],
      benchmarks: [
        {
          concurrency: "10",
          requests: "397",
          throughput: "38.79 req/s",
          p50: "228 ms",
          p95: "545 ms",
          p99: "735 ms",
          errors: "0%",
        },
        {
          concurrency: "25",
          requests: "1,018",
          throughput: "99.52 req/s",
          p50: "225 ms",
          p95: "273 ms",
          p99: "800 ms",
          errors: "0%",
        },
        {
          concurrency: "50",
          requests: "2,031",
          throughput: "198.57 req/s",
          p50: "225 ms",
          p95: "397 ms",
          p99: "702 ms",
          errors: "0%",
        },
        {
          concurrency: "100",
          requests: "4,015",
          throughput: "377.95 req/s",
          p50: "224 ms",
          p95: "289 ms",
          p99: "913 ms",
          errors: "0%",
        },
      ],
      note:
        "These measurements represent OTLP ingestion throughput, not complete workflow execution throughput. Span processing continues asynchronously through BullMQ.",
    },
  },

  guardrail: {
    eyebrow: "AI spend enforcement",
    introduction:
      "Guardrail is a self-hosted AI billing proxy that sits between an application and its AI provider. It checks spending limits before forwarding requests and prevents requests from reaching the provider when the available budget has been exhausted.",
    problem:
      "Checking a user's spending counter and incrementing it in separate operations introduces a race condition. Concurrent requests can each pass the same limit check and collectively exceed the budget.",
    solution:
      "Guardrail uses Redis Lua scripts to check and increment spending counters atomically. It also processes usage events asynchronously and pushes spend updates and alerts to the dashboard through Redis Pub/Sub and WebSockets.",
    engineering: [
      {
        title: "Atomic spend enforcement",
        description:
          "A single Redis Lua operation reads the counters, checks daily and monthly limits, and increments only when budget remains. Costs are stored as integer micro-units to avoid floating-point billing errors.",
      },
      {
        title: "Usage processing",
        description:
          "The proxy returns the provider response and hands usage processing off to BullMQ. A worker persists usage events in PostgreSQL and publishes updates through Redis Pub/Sub.",
      },
      {
        title: "Recovery and idempotency",
        description:
          "A unique database constraint on idempotencyKey prevents duplicate usage records. Counter recovery rebuilds Redis counters from PostgreSQL after a Redis restart.",
      },
      {
        title: "Alerts and anomaly detection",
        description:
          "Threshold alerts trigger at 80% and 100% of configured limits. Spend anomalies are detected against a rolling baseline.",
      },
    ],
    architectureNote:
      "The API server contains the proxy, billing, queue, analytics, and alert layers. Redis handles atomic counters and queue-related infrastructure, while PostgreSQL stores durable usage and alert records.",
    performance: {
      title: "Recorded k6 load test",
      description:
        "The recorded test used 50 virtual users and measured check results across the tested requests.",
      metrics: [
        {
          label: "Virtual users",
          value: "50",
        },
        {
          label: "Total checks",
          value: "1,144",
        },
        {
          label: "Checks succeeded",
          value: "82.51%",
        },
        {
          label: "Checks failed",
          value: "17.48%",
        },
      ],
      note:
        "These figures represent the recorded k6 check results. They are not request-throughput, latency, or HTTP error-rate measurements.",
    },
  },

  flowspace: {
    eyebrow: "Real-time project management",
    introduction:
      "FlowSpace is a project management platform built around workspaces, role-based access control, projects, tasks, comments, labels, real-time updates, and background notifications.",
    problem:
      "Collaborative systems must keep permissions consistent across operations while delivering task updates to connected clients without blocking the request that triggered them.",
    solution:
      "FlowSpace uses a four-layer Express REST API, with business logic and permission checks in the service layer. Prisma transactions protect workspace creation, Redis Pub/Sub distributes real-time events, and BullMQ handles notifications asynchronously.",
    engineering: [
      {
        title: "Four-layer API",
        description:
          "The Route, Controller, Service, and Repository layers separate input validation, request handling, business logic, and database access.",
      },
      {
        title: "Role-based access control",
        description:
          "OWNER, ADMIN, MEMBER, and VIEWER permissions are enforced in the service layer. Last-owner protection prevents a workspace from being left without an owner.",
      },
      {
        title: "Atomic workspace creation",
        description:
          "A single Prisma transaction creates the workspace and assigns its owner, preventing an orphaned workspace without an owner.",
      },
      {
        title: "Real-time collaboration",
        description:
          "Redis Pub/Sub decouples event emission from WebSocket management. BullMQ processes notifications in the background so they do not block API requests.",
      },
    ],
    architectureNote:
      "The diagram separates the Express API, PostgreSQL persistence, and Redis infrastructure. Clerk handles authentication and user synchronization through webhooks.",
    performance: {
      title: "API and WebSocket load test",
      description:
        "Load-tested against the Railway deployment on shared free-tier infrastructure.",
      metrics: [
        {
          label: "Throughput",
          value: "~150 req/s",
          detail: "50 concurrent connections",
        },
        {
          label: "p50 latency",
          value: "313 ms",
        },
        {
          label: "p95 latency",
          value: "359 ms",
        },
        {
          label: "WebSocket clients",
          value: "50/50",
          detail: "Connected, 0 failures",
        },
        {
          label: "Concurrent-write errors",
          value: "0",
        },
      ],
      note:
        "These are recorded results from the deployed environment. Latency and throughput can vary with infrastructure and workload.",
    },
  },

  luminary: {
    eyebrow: "Personal knowledge management",
    introduction:
      "Luminary is a personal knowledge management system for saving YouTube videos, tweets, articles, and links in one place. Users can organize saved content by type and share their entire collection through a single public link.",
    problem:
      "Useful resources often end up scattered across bookmarks, screenshots, and folders, making them difficult to find and share later.",
    solution:
      "Luminary provides a central collection for saved content, with type-based filtering and a persistent public share link. Its React frontend communicates with an Express REST API backed by MongoDB.",
    engineering: [
      {
        title: "User-scoped content",
        description:
          "The API derives user identity from a verified JWT instead of trusting a user ID supplied in the request body.",
      },
      {
        title: "Content organization",
        description:
          "Users can save YouTube videos, tweets, articles, links, images, and audio, then filter their collection by type.",
      },
      {
        title: "Persistent share links",
        description:
          "A generated share link remains stable, allowing a collection to be shared without creating a new URL each time.",
      },
      {
        title: "Public read-only sharing",
        description:
          "Anyone with a share link can view the owner's shared collection without signing in. The public endpoint does not allow modifications.",
      },
    ],
    architectureNote:
      "The React and TypeScript frontend uses Vite and communicates with the Express API. MongoDB stores users, content, and share links, while JWT authentication protects user-specific operations.",
  },

  nexus: {
    eyebrow: "Real-time messaging systems",
    introduction:
      "Nexus is an early-stage real-time chat project exploring WebSocket connection state, message ordering, and delivery guarantees. The current build focuses on the monorepo, WebSocket server, and database connection rather than a completed chat experience.",
    problem:
      "Real-time messaging involves more than opening a socket. A production-oriented system must account for multiple devices, authenticated users, conversation permissions, and the order in which messages are persisted and broadcast.",
    solution:
      "The project is being built around a Next.js frontend, a Node.js WebSocket server using the ws package, and PostgreSQL accessed through Prisma. The intended message flow is to validate and authorize a message, persist it, broadcast it, and then acknowledge it.",
    engineering: [
      {
        title: "Explicit WebSocket server",
        description:
          "Nexus uses the raw ws package rather than adding Socket.IO as an abstraction, keeping connection and message handling explicit.",
      },
      {
        title: "Multiple connections per user",
        description:
          "The planned connection model maps a user ID to a set of sockets, allowing multiple devices to connect for the same user.",
      },
      {
        title: "Persist before broadcast",
        description:
          "The planned delivery sequence is validate, authorize, persist, broadcast, and acknowledge. This prevents broadcasting a message before durable persistence.",
      },
      {
        title: "Build only what is needed",
        description:
          "Redis Pub/Sub for multi-instance WebSocket fanout and BullMQ for offline notifications are planned for a later version, once multiple server instances require them.",
      },
    ],
    architectureNote:
      "The current scaffold contains apps/web, apps/ws-server, packages/db, and packages/config. Authentication, database schema for messages, persistence, and the complete real-time message flow are not implemented yet.",
  },

  quizmon: {
    eyebrow: "Interactive frontend quiz",
    introduction:
      "QuizMon is a simple, interactive quiz application built with HTML, CSS, and JavaScript. It lets users answer multiple-choice questions, receive instant feedback, and track their score in real time.",
    problem:
      "Practising frontend fundamentals is more useful when users can answer questions and see the result of their choices immediately.",
    solution:
      "QuizMon combines multiple-choice questions with JavaScript-driven answer handling, instant feedback, and score tracking in a responsive interface.",
    engineering: [
      {
        title: "DOM manipulation",
        description:
          "JavaScript updates the interface in response to user answers and the current quiz state.",
      },
      {
        title: "Event handling",
        description:
          "User interactions drive answer selection, feedback, and progression through the quiz.",
      },
      {
        title: "Conditional logic and scoring",
        description:
          "Answer evaluation determines the feedback shown to the user and updates the score.",
      },
      {
        title: "Responsive interface",
        description:
          "The app uses HTML, CSS, and JavaScript to provide a lightweight quiz experience without a frontend framework.",
      },
    ],
    architectureNote:
      "QuizMon is a browser-based frontend project built with HTML, CSS, and JavaScript. Its focus is DOM manipulation, event handling, conditional logic, and UI state management rather than a separate backend.",
  },
};