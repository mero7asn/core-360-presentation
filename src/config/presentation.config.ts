export interface ERPFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
  metricLabel?: string;
  tags: string[];
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  kpi?: string;
}

export interface ScreenshotView {
  id: string;
  label: string;
  filename: string;
  description: string;
  hotspots: Hotspot[];
}

export interface DepartmentConfig {
  id: string;
  name: string;
  code: string;
  floor: number;
  roomNumber: string;
  icon: string;
  accentColor: string;
  glowColor: string;
  themeGradient: string;
  position3D: [number, number, number];
  doorPosition3D: [number, number, number];
  realisticRoomImage: string;

  hero: {
    badge: string;
    title: string;
    subtitle: string;
    overview: string;
    statHeadline: string;
    statValue: string;
    statChange: string;
  };

  kpis: Array<{
    id: string;
    label: string;
    value: string;
    subtext: string;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
  }>;

  features: ERPFeature[];

  showcase: {
    type: 'screenshot' | 'interactive_module' | 'video';
    mockTitle: string;
    mockSubtitle: string;
    primaryScreenshot: string;
    subScreens: ScreenshotView[];
    quickStats: Array<{ label: string; value: string }>;
  };

  liveErp: {
    url: string;
    moduleName: string;
    deepLinkRoute: string;
    demoRecordId: string;
  };

  presenterNotes: string[];
  talkingPoints: string[];
}

export interface ProjectMetadata {
  projectName: string;
  projectTagline: string;
  trackName: string;
  diplomaDuration: string;
  supervisor: string;
  trackHead: string;
  team: Array<{
    id: string;
    name: string;
    role: string;
    specialty: string;
    initials: string;
  }>;
}

export interface DossierFile {
  id: string;
  fileNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  summary: string;
  sections: Array<{
    title: string;
    content?: string;
    items?: Array<{
      title: string;
      description: string;
      highlight?: string;
    }>;
  }>;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
}

export const PROJECT_METADATA: ProjectMetadata = {
  projectName: "Core 360 ERP",
  projectTagline: "Next-Gen Enterprise Resource Planning System",
  trackName: "AI Software Development",
  diplomaDuration: "9 Months Diploma",
  supervisor: "Eng. Supervisor Name",
  trackHead: "Eng. Track Head Name",
  team: [
    {
      id: "omar",
      name: "Omar Hassan Mahmoud",
      role: "Full Stack Developer & Team Leader",
      specialty: "Core Architecture & Leadership",
      initials: "OH"
    },
    {
      id: "mohamed",
      name: "Mohamed Saeed",
      role: "Full Stack Developer & Integration Manager",
      specialty: "System Integrations & API Gateway",
      initials: "MS"
    },
    {
      id: "rowan",
      name: "Rowan Khalil",
      role: "Full Stack Developer & DevOps Manager",
      specialty: "DevOps, CI/CD & Cloud Infrastructure",
      initials: "RK"
    },
    {
      id: "abanob",
      name: "Abanob Wagih",
      role: "Full Stack Developer & CyberSecurity Manager",
      specialty: "RBAC, JWT & Data Protection",
      initials: "AW"
    }
  ]
};

export const DOSSIER_FILES: DossierFile[] = [
  {
    id: "intro",
    fileNumber: 1,
    title: "Why ERP Matters",
    subtitle: "How ERP transforms fragmented business operations into one connected system",
    badge: "FOUNDATION",
    icon: "Building2",
    summary: "As companies grow, their departments often become isolated, relying on separate systems, spreadsheets, and manual processes. ERP brings these functions together into one integrated platform, creating a single source of accurate information and enabling faster, smarter, and more efficient business decisions.",
    sections: [
      {
        title: "Executive Summary",
        content: "ERP systems connect the key functions of a company into one unified environment. Instead of managing finance, HR, sales, inventory, operations, and customer information through disconnected tools, employees work with shared data and standardized processes. This reduces duplication, improves efficiency, increases visibility, and gives management a complete view of the business."
      },
      {
        title: "Why Companies Need ERP",
        items: [
          {
            title: "01 — ONE SOURCE OF INFORMATION",
            description: "All departments work with the same up-to-date business data, reducing duplication, inconsistency, and conflicting information."
          },
          {
            title: "02 — AUTOMATED PROCESSES",
            description: "ERP reduces repetitive manual work by automating routine processes such as approvals, purchasing, payroll, inventory updates, and reporting."
          },
          {
            title: "03 — CONNECTED DEPARTMENTS",
            description: "Finance, HR, Sales, Inventory, Operations, and other departments work together through one integrated system instead of isolated tools."
          },
          {
            title: "04 — BETTER DECISION-MAKING",
            description: "Management gains real-time visibility into business performance, allowing faster decisions based on accurate and centralized information."
          }
        ]
      }
    ],
    metrics: [
      { label: "Finance • HR • Sales • Operations", value: "ONE CONNECTED SYSTEM" },
      { label: "Accurate information across the business", value: "REAL-TIME VISIBILITY" },
      { label: "Faster decisions based on unified data", value: "BETTER DECISIONS" }
    ]
  },
  {
    id: "problems",
    fileNumber: 2,
    title: "Problem Definition",
    subtitle: "Critical Enterprise Pain Points & Industry Inefficiencies",
    badge: "ANALYSIS",
    icon: "AlertTriangle",
    summary: "Modern companies suffer severe operational friction, high overhead, and critical compliance vulnerabilities caused by disjointed SaaS tools and manual spreadsheets.",
    sections: [
      {
        title: "Key Industry Pain Points Addressed",
        items: [
          {
            title: "Data Fragmentation & Disconnected Systems",
            description: "Companies juggle 5–8 disparate tools (CRM in one tool, payroll in spreadsheets, attendance in legacy clock-ins, support in third-party inboxes), leading to sync delays, duplicate records, and heavy subscription overhead.",
            highlight: "5-8 Disparate SaaS Tools"
          },
          {
            title: "Payroll Vulnerabilities & Compliance Overhead",
            description: "Manual calculation of overtime, deductions, social insurance, employee loans, and banking IBAN errors causing costly fiscal discrepancies and audit liabilities.",
            highlight: "Calculation Variances"
          },
          {
            title: "Sales & Offer Turnaround Bottlenecks",
            description: "Slow proposal generation times, lack of dynamic template versioning, and no live audit trail on margin discounts and quote approvals.",
            highlight: "Delayed Conversions"
          },
          {
            title: "Support Ticket Latency & SLA Breaches",
            description: "Disconnected communication channels lead to lost customer inquiries, untracked agent response times, and degraded customer retention.",
            highlight: "Unenforced SLAs"
          },
          {
            title: "Lack of Executive Real-Time Telemetry",
            description: "Leadership lacks unified cross-department KPI cockpits to monitor cash flow, departmental expenses, and workforce productivity in real time.",
            highlight: "Blind Governance"
          }
        ]
      }
    ],
    metrics: [
      { label: "Avg Disconnected Tools", value: "6+ Per Org" },
      { label: "Admin Hours Wasted", value: "35% Per Week" },
      { label: "Manual Error Frequency", value: "14.8% in Ledgers" }
    ]
  },
  {
    id: "solution",
    fileNumber: 3,
    title: "The Core 360 ERP Solution",
    subtitle: "Unified Modular Ecosystem & Seamless Automation",
    badge: "INNOVATION",
    icon: "Sparkles",
    summary: "A unified, event-driven enterprise platform where commercial deals, workforce records, treasury disbursements, and customer tickets communicate synchronously through a centralized API kernel.",
    sections: [
      {
        title: "The Core 360 Ecosystem Modules",
        items: [
          {
            title: "Unified Modular Micro-Kernel Architecture",
            description: "Interconnected functional domains operating on a single unified schema and API gateway, enabling seamless cross-module data propagation.",
            highlight: "Single Schema"
          },
          {
            title: "Automated Lead-to-Cash Pipeline",
            description: "Seamless lead qualification, meeting bookings, automated PDF offer generation with version control, and digital contract signing.",
            highlight: "End-to-End Sales"
          },
          {
            title: "Next-Gen HRM & Automated Payroll Engine",
            description: "Automated calculation of net salaries, loan deductions, bank account exports, anomaly alerts, auxiliary schedules, and self-service leave approvals.",
            highlight: "Zero-Variance Fiscal"
          },
          {
            title: "Integrated Omnichannel Helpdesk",
            description: "Built-in two-way email synchronization, dynamic SLA countdown timers, priority queues, and customer satisfaction metrics.",
            highlight: "24/7 SLA Tracking"
          },
          {
            title: "Executive 360° Intelligence Suite",
            description: "High-density live analytics, conversion rate monitors, department health scores, and payment gateway settlement auditing.",
            highlight: "Executive BI"
          }
        ]
      }
    ],
    metrics: [
      { label: "Turnaround Acceleration", value: "4.8x Faster" },
      { label: "Audit Accuracy", value: "100% Mathematical" },
      { label: "Process Automation", value: "85% Touchless" }
    ]
  },
  {
    id: "architecture",
    fileNumber: 4,
    title: "Architecture & Tech Stack",
    subtitle: "Engineering Blueprint, Security Layer & Infrastructure",
    badge: "SYSTEMS",
    icon: "Cpu",
    summary: "Built upon enterprise-grade modern web standards with strict separation of concerns, high throughput REST endpoints, relational document indexing, and defense-in-depth security.",
    sections: [
      {
        title: "System Architecture Layers",
        content: `[Frontend Layer: React 18 + TypeScript + Tailwind CSS + Lucide Icons]
                           │ (REST / HTTPS / JSON)
                           ▼
      [API Gateway / Routing: Node.js + Express.js]
                           │
      [Security Layer: JWT + RBAC + Helmet + Rate Limit + CORS]
                           │
 ┌─────────────────────────┴─────────────────────────┐
 │                                                   │
 ▼                                                   ▼
[Business Logic & Controllers]             [Integration Engine]
 • CRM & Sales Pipeline                    • Nodemailer / SMTP
 • HRM, Aux Schedules, ESS                 • Payment Gateways (Stripe/Paymob)
 • Payroll & Fiscal Engine                 • PDF & Excel Generation
 • Ticketing & SLA Engine                  • Webhooks & Event Listeners
 • Offer & Template Engine                           │
 │                                                   │
 └─────────────────────────┬─────────────────────────┘
                           ▼
          [Data Persistence: MongoDB & Mongoose Schema Engine]`
      },
      {
        title: "Technical Stack Specification",
        items: [
          {
            title: "Frontend Tier",
            description: "React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas / 3D Scene transitions for high-density, responsive enterprise interfaces.",
            highlight: "React 18 + TypeScript"
          },
          {
            title: "Backend API Tier",
            description: "Node.js with Express.js architecture featuring modular routes, service controllers, custom validation middleware, and structured error handlers.",
            highlight: "Node.js + Express"
          },
          {
            title: "Data Persistence Tier",
            description: "MongoDB & Mongoose with schema validation, composite indexing, transaction sessions, and relational population.",
            highlight: "MongoDB & Mongoose"
          },
          {
            title: "Security & Authentication",
            description: "Stateless JWT tokens, Bcrypt password hashing, granular Role-Based Access Control (RBAC), Helmet HTTP header guards, and IP rate limiting.",
            highlight: "JWT + RBAC + Bcrypt"
          },
          {
            title: "DevOps & Deployment",
            description: "Docker containerization, CI/CD pipeline automation, environment isolation, and production cloud hosting.",
            highlight: "Docker + CI/CD"
          }
        ]
      }
    ],
    metrics: [
      { label: "API Throughput", value: "10,000+ Req/min" },
      { label: "Security Standard", value: "OWASP Compliant" },
      { label: "Data Integrity", value: "ACID Transactions" }
    ]
  }
];

export const PRESENTATION_DATA_MODE = import.meta.env.VITE_ENABLE_LIVE_DATA === 'true' ? 'live' : 'demo';
export const ERP_BASE_URL = import.meta.env.VITE_ERP_BASE_URL || '';

export interface FloorConfig {
  floorNumber: number;
  name: string;
  subtitle: string;
  altitude: number;
  theme: string;
  departmentId: string;
  description: string;
  tag: string;
}

export const FLOORS_CONFIG: FloorConfig[] = [
  {
    floorNumber: 1,
    name: "Floor 1: Commercial & CRM",
    subtitle: "Lead Pipelines, Meeting Bookings & Digital Contracts",
    altitude: 0,
    theme: "amber",
    departmentId: "crm",
    tag: "COMMERCIAL",
    description: "Modern sales trading floor accelerating customer acquisition, deal lifecycles, and automated quote handshakes."
  },
  {
    floorNumber: 2,
    name: "Floor 2: HRM & People Operations",
    subtitle: "Workforce Directory, Aux Logs, ATS & Self-Service ESS",
    altitude: 4.5,
    theme: "purple",
    departmentId: "hrm",
    tag: "PEOPLE & TALENT",
    description: "Modern people operations office orchestrating talent recruitment, shift tracking, break logging, and leave approvals."
  },
  {
    floorNumber: 3,
    name: "Floor 3: Payroll & Fiscal Engine",
    subtitle: "Automated Runs, Loan Installments & Bank Discrepancy Alerts",
    altitude: 9.0,
    theme: "emerald",
    departmentId: "payroll",
    tag: "TREASURY & FISCAL",
    description: "High-security treasury suite executing one-click payroll runs, banking IBAN exports, and anomaly detection."
  },
  {
    floorNumber: 4,
    name: "Floor 4: Customer Support & SLA",
    subtitle: "Omnichannel Helpdesk, SLA Timers & Email Threading",
    altitude: 13.5,
    theme: "cyan",
    departmentId: "support",
    tag: "24/7 OPERATIONS",
    description: "Collaborative operations center managing ticket queues, two-way customer email sync, and automated SLA countdowns."
  },
  {
    floorNumber: 5,
    name: "Floor 5: Marketing & Smart Offers",
    subtitle: "Dynamic Proposal Builder, Template Versioning & Campaigns",
    altitude: 18.0,
    theme: "rose",
    departmentId: "marketing",
    tag: "CREATIVE & OFFERS",
    description: "Creative studio and growth hub maintaining proposal templates with revision history and promotional campaigns."
  },
  {
    floorNumber: 6,
    name: "Floor 6: Executive Command Center",
    subtitle: "Unified BI Telemetry, Payment Gateways & RBAC Security",
    altitude: 22.5,
    theme: "gold",
    departmentId: "executive",
    tag: "BOARDROOM & SECURITY",
    description: "Penthouse command boardroom synthesizing cross-department analytics, payment gateways, and system audit logs."
  }
];

export const DEPARTMENTS_CONFIG: DepartmentConfig[] = [
  // 🏢 FLOOR 1: Commercial, CRM & Sales Pipeline
  {
    id: "crm",
    name: "Commercial, CRM & Sales Pipeline",
    code: "CRM-01",
    floor: 1,
    roomNumber: "101",
    icon: "TrendingUp",
    accentColor: "#FB9600",
    glowColor: "rgba(251, 150, 0, 0.4)",
    themeGradient: "from-amber-500/20 to-orange-500/5",
    position3D: [3.5, 0, 1.2],
    doorPosition3D: [3.5, 0, 3.2],
    realisticRoomImage: "/office_sales_room_1787220483194.jpg",

    hero: {
      badge: "Commercial Revenue Pipeline",
      title: "Commercial, CRM & Sales Pipeline",
      subtitle: "Accelerating revenue cycles from lead qualification and meeting bookings to automated proposal issuance and digital contract signing.",
      overview: "Core 360 Commercial CRM delivers a high-velocity sales engine with Kanban deal visualization, calendar appointment scheduling, and automated margin-guarded quotation handshakes.",
      statHeadline: "Total Pipeline Value",
      statValue: "$482,500",
      statChange: "+28.4% Conversion Rate"
    },

    kpis: [
      { id: "pipe", label: "Total Pipeline Value", value: "$482,500", subtext: "142 Active enterprise deals", trend: "up", trendValue: "+18.4% MoM" },
      { id: "conv", label: "Lead Conversion Rate", value: "28.4%", subtext: "Industry benchmark: 19.2%", trend: "up", trendValue: "↑ 4.2% MoM" },
      { id: "deals", label: "Active Deals in Flight", value: "142 Deals", subtext: "Across 5 Kanban stages", trend: "neutral", trendValue: "142 Active" },
      { id: "velocity", label: "Avg Cycle Velocity", value: "11.4 Days", subtext: "Lead-to-signed contract", trend: "down", trendValue: "-45% Speed" }
    ],

    features: [
      {
        id: "crm-1",
        title: "Dynamic Lead Pipeline & Kanban",
        description: "Stage-based opportunity tracking (New, Contacted, Qualified, Proposal, Won/Lost) with drag-and-drop workflow triggers.",
        icon: "Kanban",
        metric: "5 Stages",
        metricLabel: "Kanban Flow",
        tags: ["Kanban", "Lead Scoring", "Pipeline"]
      },
      {
        id: "crm-2",
        title: "Integrated Booking Engine",
        description: "Direct client appointment scheduling with automated email reminders, time-slot locking, and meeting notes logging.",
        icon: "Calendar",
        metric: "100%",
        metricLabel: "Calendar Sync",
        tags: ["Bookings", "Calendar", "Reminders"]
      },
      {
        id: "crm-3",
        title: "Digital Contract Lifecycle",
        description: "Contract creation, value tracking, client signature status verification, and automatic expiration notifications.",
        icon: "FileCheck",
        metric: "Instant",
        metricLabel: "Contract Dispatch",
        tags: ["E-Sign", "Contracts", "Compliance"]
      },
      {
        id: "crm-4",
        title: "Cross-Department Order Handoff",
        description: "Winning a deal immediately triggers employee assignment in HR and generates invoice schedules in Payroll/Finance.",
        icon: "Zap",
        metric: "0s Lag",
        metricLabel: "Cross-Silo Sync",
        tags: ["ERP Handshake", "Automated Flow", "SSOT"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Core 360 ERP — Commercial & CRM Cockpit",
      mockSubtitle: "Kanban Lead Board, Booking Scheduler & Active Contract Table",
      primaryScreenshot: "/screenshots/floor1_crm_kanban.png",
      subScreens: [
        {
          id: "crm-screen-1",
          label: "Kanban Lead Board",
          filename: "/screenshots/floor1_crm_kanban.png",
          description: "Visual pipeline with lead scoring, deal values, and stage transitions.",
          hotspots: [
            { id: "hs-c1", x: 22, y: 35, title: "Stage Milestone Automation", description: "Automated trigger validates deal requirements before moving to Proposal.", kpi: "$482,500 Total" },
            { id: "hs-c2", x: 68, y: 40, title: "Deal Probability Matrix", description: "AI predicts conversion likelihood based on client interaction recency.", kpi: "28.4% Win Rate" }
          ]
        },
        {
          id: "crm-screen-2",
          label: "Appointment Booking Scheduler",
          filename: "/screenshots/floor1_crm_bookings.png",
          description: "Interactive calendar view for client discovery calls and contract negotiations.",
          hotspots: [
            { id: "hs-c3", x: 50, y: 30, title: "Smart Slot Allocation", description: "Prevents double-booking and assigns account reps dynamically.", kpi: "100% Calendar Sync" }
          ]
        },
        {
          id: "crm-screen-3",
          label: "Digital Contract Manager",
          filename: "/screenshots/floor1_crm_contracts.png",
          description: "Legally binding electronic signature audit trail with renewal tracking.",
          hotspots: [
            { id: "hs-c4", x: 45, y: 65, title: "Signature Verification", description: "Cryptographically verified digital signatures with timestamp audit.", kpi: "142 Active Deals" }
          ]
        }
      ],
      quickStats: [
        { label: "Active Deals", value: "142 Opportunities" },
        { label: "Pipeline Value", value: "$482,500" },
        { label: "Win Rate", value: "28.4%" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/crm",
      moduleName: "Commercial Operations & CRM Suite v4.5",
      deepLinkRoute: "/crm/leads-pipeline",
      demoRecordId: "DEAL-CORE-2026-88"
    },

    presenterNotes: [
      "Emphasize the automated transition from Lead → Booking → Offer → Signed Contract.",
      "Show how winning an opportunity automatically notifies HR for staffing and Payroll for billing schedules without manual data entry.",
      "Highlight the Kanban pipeline with real-time deal stage calculations."
    ],

    talkingPoints: [
      "Dynamic Kanban pipeline with automated milestone qualification.",
      "Integrated appointment booking system synchronized with client calendars.",
      "End-to-end digital contract lifecycle with cryptographic signature logging."
    ]
  },

  // 🏢 FLOOR 2: Human Capital Management (HRM) & ESS
  {
    id: "hrm",
    name: "Human Capital Management (HRM) & ESS",
    code: "HRM-02",
    floor: 2,
    roomNumber: "202",
    icon: "Users",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    themeGradient: "from-purple-500/20 to-indigo-500/5",
    position3D: [3.5, 4.5, 1.2],
    doorPosition3D: [3.5, 4.5, 3.2],
    realisticRoomImage: "/office_hr_room_1787220429347.jpg",

    hero: {
      badge: "Human Capital Intelligence",
      title: "Human Capital Management (HRM) & ESS",
      subtitle: "Comprehensive workforce lifecycle administration, candidate applicant tracking (ATS), real-time auxiliary shift logs, and employee self-service leave portals.",
      overview: "Core 360 HRM transforms people operations with automated employee onboarding, shift activity logs, and seamless approval chains connected directly to payroll settlement.",
      statHeadline: "Active Workforce Managed",
      statValue: "84 Employees",
      statChange: "98.1% Leave Clearance"
    },

    kpis: [
      { id: "workforce", label: "Active Workforce", value: "84 Employees", subtext: "Across 6 core departments", trend: "up", trendValue: "+12 Hired" },
      { id: "ats", label: "Talent Acquisition Time", value: "14.2 Days Avg", subtext: "From job posting to offer", trend: "down", trendValue: "-60% Time" },
      { id: "leave", label: "Leave Clearance Rate", value: "98.1%", subtext: "Automated manager approval", trend: "up", trendValue: "98.1% Met" },
      { id: "shifts", label: "Aux Shift Adherence", value: "99.4%", subtext: "Real-time activity logging", trend: "up", trendValue: "+5.2% YoY" }
    ],

    features: [
      {
        id: "hrm-1",
        title: "Comprehensive Employee Profiles",
        description: "Centralized repository for banking details, employment contracts, emergency contacts, tax files, and job roles.",
        icon: "UserCheck",
        metric: "100%",
        metricLabel: "Digital Dossier",
        tags: ["Profiles", "Documents", "Compliance"]
      },
      {
        id: "hrm-2",
        title: "Recruitment & ATS Pipeline",
        description: "Job vacancy publishing, candidate resume ingestion, interview scorecards, and offer letter generation.",
        icon: "UserPlus",
        metric: "14.2 Days",
        metricLabel: "Time-to-Hire",
        tags: ["ATS", "Candidate Flow", "Scorecards"]
      },
      {
        id: "hrm-3",
        title: "Auxiliary Schedule & Log System",
        description: "Real-time monitoring of work shifts, break intervals, auxiliary activities, and complete schedule revision history.",
        icon: "Clock",
        metric: "Real-Time",
        metricLabel: "Aux Telemetry",
        tags: ["Aux Schedules", "Shifts", "Break Logs"]
      },
      {
        id: "hrm-4",
        title: "Self-Service Leave Portal (ESS)",
        description: "Employee balance calculation, vacation/sick request submission, and multi-tier manager approval chains.",
        icon: "CalendarCheck",
        metric: "98.1%",
        metricLabel: "Clearance Rate",
        tags: ["ESS", "Leave Portal", "Approval Flow"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Core 360 ERP — People Operations Hub",
      mockSubtitle: "Employee Directory, Auxiliary Tracking Log & Leave Management View",
      primaryScreenshot: "/screenshots/floor2_hrm_directory.png",
      subScreens: [
        {
          id: "hrm-screen-1",
          label: "Employee Directory & Profiles",
          filename: "/screenshots/floor2_hrm_directory.png",
          description: "Full staff roster with department filters, job titles, and status tags.",
          hotspots: [
            { id: "hs-h1", x: 25, y: 32, title: "Live Staff Status", description: "Tracks active, remote, and on-leave team members instantaneously.", kpi: "84 Employees" },
            { id: "hs-h2", x: 75, y: 35, title: "Bank & Tax Guardrails", description: "Validates IBAN accounts before allowing payroll authorization.", kpi: "Verified Data" }
          ]
        },
        {
          id: "hrm-screen-2",
          label: "Aux Tracking & Shift Logs",
          filename: "/screenshots/floor2_hrm_aux_logs.png",
          description: "Real-time shift activity timeline and break logging telemetry.",
          hotspots: [
            { id: "hs-h3", x: 50, y: 40, title: "Aux Log Timeline", description: "Records work shifts, break durations, and schedule modifications.", kpi: "99.4% Adherence" }
          ]
        },
        {
          id: "hrm-screen-3",
          label: "Leave Request Center",
          filename: "/screenshots/floor2_hrm_leaves.png",
          description: "Manager approval queue with automatic entitlement deductions.",
          hotspots: [
            { id: "hs-h4", x: 40, y: 60, title: "Automated Balance Check", description: "Prevents negative leave balances by checking policy constraints.", kpi: "98.1% Clearance" }
          ]
        }
      ],
      quickStats: [
        { label: "Active Staff", value: "84 Headcount" },
        { label: "Open Vacancies", value: "6 Roles" },
        { label: "Pending Leaves", value: "2 Requests" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/hrm",
      moduleName: "Human Capital Management Suite v5.2",
      deepLinkRoute: "/hrm/employee-directory",
      demoRecordId: "EMP-CORE-084"
    },

    presenterNotes: [
      "Highlight how employee profile changes immediately update payroll calculation variables (allowances, social insurance, loans).",
      "Demonstrate the Auxiliary schedule system which prevents workforce scheduling overlaps and tracks active work vs break states."
    ],

    talkingPoints: [
      "Unified employee lifecycle from applicant tracking to retirement.",
      "Granular auxiliary schedule tracking with immutable log revision history.",
      "Automated leave balance reconciliation and multi-level manager approvals."
    ]
  },

  // 🏢 FLOOR 3: Payroll, Compensation & Fiscal Engine
  {
    id: "payroll",
    name: "Payroll, Compensation & Fiscal Engine",
    code: "PAY-03",
    floor: 3,
    roomNumber: "303",
    icon: "CreditCard",
    accentColor: "#10b981",
    glowColor: "rgba(168, 85, 129, 0.4)",
    themeGradient: "from-emerald-500/20 to-teal-500/5",
    position3D: [-3.5, 9.0, 1.2],
    doorPosition3D: [-3.5, 9.0, 3.2],
    realisticRoomImage: "/office_finance_room_1787220396138.jpg",

    hero: {
      badge: "Fiscal Engine & Treasury",
      title: "Payroll, Compensation & Fiscal Engine",
      subtitle: "One-click automated payroll calculation, loan balance deductions, company bank account management, and proactive discrepancy alerts.",
      overview: "Core 360 Payroll Engine provides zero-variance compensation execution, calculating gross salaries, tax deductions, loans, and net payouts with complete banking auditability.",
      statHeadline: "Monthly Disbursed Payroll",
      statValue: "$189,400",
      statChange: "100% Zero Variance"
    },

    kpis: [
      { id: "p_disbursed", label: "Monthly Payroll Disbursed", value: "$189,400", subtext: "84 staff settled on schedule", trend: "up", trendValue: "$189,400 Net" },
      { id: "p_loans", label: "Calculated Loan Balances", value: "$24,800 Active", subtext: "Automated monthly deductions", trend: "neutral", trendValue: "18 Active Loans" },
      { id: "p_accuracy", label: "Audit Accuracy", value: "100%", subtext: "Zero calculation variance", trend: "up", trendValue: "0 Anomaly Errors" },
      { id: "p_accounts", label: "Active Bank Accounts", value: "4 Accounts", subtext: "Multi-currency bank rails", trend: "neutral", trendValue: "4 Connected" }
    ],

    features: [
      {
        id: "pay-1",
        title: "One-Click Payroll Runs",
        description: "Automated calculation of gross pay, overtime, housing allowances, tax deductions, and net payable per employee.",
        icon: "Calculator",
        metric: "1-Click",
        metricLabel: "Automated Run",
        tags: ["Payroll Run", "Gross-to-Net", "Taxes"]
      },
      {
        id: "pay-2",
        title: "Automated Payroll Anomaly Alerts",
        description: "Proactive alert system detecting negative net pay, missing employee bank IBANs, or abnormal overtime spikes.",
        icon: "AlertOctagon",
        metric: "100%",
        metricLabel: "Anomaly Guard",
        tags: ["Alert Center", "Validation", "Audit"]
      },
      {
        id: "pay-3",
        title: "Company Bank Account Matrix",
        description: "Manage multiple corporate bank accounts, track liquid balances, and export encrypted bank transfer payment sheets.",
        icon: "Building",
        metric: "4 Accounts",
        metricLabel: "Bank Rails",
        tags: ["Banking", "IBAN Export", "Treasury"]
      },
      {
        id: "pay-4",
        title: "Employee Loan Management",
        description: "Track loan requests, active principal balances, installment schedules, and automated monthly salary deductions.",
        icon: "Coins",
        metric: "$24,800",
        metricLabel: "Active Balances",
        tags: ["Loans", "Installments", "Auto-Deduct"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Core 360 ERP — Fiscal Payroll Command",
      mockSubtitle: "Payroll Run Summary, Anomaly Alert Center & Company Bank Accounts",
      primaryScreenshot: "/screenshots/floor3_payroll_runs.png",
      subScreens: [
        {
          id: "pay-screen-1",
          label: "Payroll Run Summary",
          filename: "/screenshots/floor3_payroll_runs.png",
          description: "Monthly compensation ledger with gross, deductions, loan offsets, and net disbursements.",
          hotspots: [
            { id: "hs-p1", x: 28, y: 35, title: "Gross to Net Engine", description: "Dynamically calculates taxes and insurance in compliance with labor laws.", kpi: "$189,400 Disbursed" },
            { id: "hs-p2", x: 72, y: 35, title: "Bank File Export", description: "Generates standardized bank transfer files for batch wire execution.", kpi: "Instant Export" }
          ]
        },
        {
          id: "pay-screen-2",
          label: "Anomaly Alert Center",
          filename: "/screenshots/floor3_payroll_alerts.png",
          description: "Pre-payroll execution validation flags ensuring zero payment discrepancies.",
          hotspots: [
            { id: "hs-p3", x: 50, y: 35, title: "Zero Variance Guard", description: "Flags missing bank details or unusual overtime calculations before approval.", kpi: "0 Unresolved Flags" }
          ]
        },
        {
          id: "pay-screen-3",
          label: "Company Bank Matrix",
          filename: "/screenshots/floor3_payroll_banks.png",
          description: "Treasury dashboard monitoring balances across corporate operational accounts.",
          hotspots: [
            { id: "hs-p4", x: 45, y: 60, title: "Liquidity Guardrails", description: "Verifies sufficient account funds before committing payroll disbursement.", kpi: "4 Bank Accounts" }
          ]
        }
      ],
      quickStats: [
        { label: "Monthly Disbursal", value: "$189,400" },
        { label: "Active Loans", value: "$24,800" },
        { label: "Calculated Variance", value: "$0.00 (Zero)" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/payroll",
      moduleName: "Fiscal & Payroll Processing Suite v4.8",
      deepLinkRoute: "/payroll/runs-summary",
      demoRecordId: "PAYROLL-2026-SEP-RUN"
    },

    presenterNotes: [
      "Demonstrate the one-click payroll run: how gross salaries, tax deductions, and active loan installments are calculated automatically.",
      "Show the Anomaly Alert Center detecting discrepancies before disbursement to guarantee 100% accuracy.",
      "Explain the banking integration where payment files are exported directly in standard banking format."
    ],

    talkingPoints: [
      "Zero calculation variance with automated gross-to-net math.",
      "Integrated employee loan tracking with automatic monthly deduction schedules.",
      "Proactive discrepancy detection preventing invalid disbursements or missing banking data."
    ]
  },

  // 🏢 FLOOR 4: Customer Support, Ticketing & SLA Operations
  {
    id: "support",
    name: "Customer Support, Ticketing & SLA Operations",
    code: "SUP-04",
    floor: 4,
    roomNumber: "404",
    icon: "Headphones",
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    themeGradient: "from-cyan-500/20 to-blue-500/5",
    position3D: [-3.5, 13.5, 1.2],
    doorPosition3D: [-3.5, 13.5, 3.2],
    realisticRoomImage: "/office_support_hub.jpg",

    hero: {
      badge: "24/7 Omnichannel Helpdesk",
      title: "Customer Support, Ticketing & SLA Operations",
      subtitle: "Multi-channel incident resolution, live SLA timer enforcement, priority queue routing, and direct two-way email synchronization.",
      overview: "Core 360 Support ensures high customer satisfaction and rapid ticket turnaround with intelligent queue assignment, visual escalation warnings, and email threading.",
      statHeadline: "SLA Compliance Rate",
      statValue: "96.8%",
      statChange: "12.4 Min First Response"
    },

    kpis: [
      { id: "s_response", label: "Avg First Response Time", value: "12.4 Mins", subtext: "Target: < 15 mins", trend: "down", trendValue: "-38% Latency" },
      { id: "s_sla", label: "SLA Compliance Rate", value: "96.8%", subtext: "Automated countdown enforcement", trend: "up", trendValue: "96.8% Met" },
      { id: "s_csat", label: "Customer Satisfaction", value: "4.85 / 5.0", subtext: "Based on 340 client ratings", trend: "up", trendValue: "+0.35 pts" },
      { id: "s_open", label: "Active Ticket Queue", value: "18 Tickets", subtext: "Across 4 support tiers", trend: "down", trendValue: "94% Resolved" }
    ],

    features: [
      {
        id: "sup-1",
        title: "Ticket Queue Management",
        description: "Filter and triage tickets by severity (Critical, High, Medium, Low), department, assignee, and resolution status.",
        icon: "Inbox",
        metric: "18 Open",
        metricLabel: "Managed Queue",
        tags: ["Triage", "Severity", "Routing"]
      },
      {
        id: "sup-2",
        title: "Direct Two-Way Email Integration",
        description: "Customer email replies append directly into active ticket discussion threads with rich-text attachments.",
        icon: "Mail",
        metric: "100%",
        metricLabel: "Email Threading",
        tags: ["Email Sync", "Threading", "SMTP/IMAP"]
      },
      {
        id: "sup-3",
        title: "Automated SLA Countdown Timers",
        description: "Visual color-coded countdown timers flagging approaching breaches and auto-escalating overdue tickets to supervisors.",
        icon: "Timer",
        metric: "96.8%",
        metricLabel: "SLA Met",
        tags: ["SLA Timers", "Escalation", "Alerts"]
      },
      {
        id: "sup-4",
        title: "Customer CSAT & Performance Telemetry",
        description: "Post-resolution satisfaction surveys and agent resolution metrics integrated into team scorecards.",
        icon: "Star",
        metric: "4.85 / 5.0",
        metricLabel: "Client CSAT",
        tags: ["CSAT", "Telemetry", "Analytics"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Core 360 ERP — Omnichannel Support Center",
      mockSubtitle: "Active Ticket Queue, SLA Countdown Tracker & Live Discussion Thread",
      primaryScreenshot: "/screenshots/floor4_support_tickets.png",
      subScreens: [
        {
          id: "sup-screen-1",
          label: "Ticket Queue Dashboard",
          filename: "/screenshots/floor4_support_tickets.png",
          description: "Real-time incident feed with priority flags, assigned engineers, and status badges.",
          hotspots: [
            { id: "hs-s1", x: 24, y: 35, title: "Dynamic Priority Triage", description: "Critical production incidents trigger immediate mobile and Slack notifications.", kpi: "18 Active Tickets" },
            { id: "hs-s2", x: 74, y: 35, title: "Live SLA Timer Guard", description: "Visual timer turns red when response threshold is within 15 minutes.", kpi: "96.8% SLA" }
          ]
        },
        {
          id: "sup-screen-2",
          label: "SLA Tracker & Escalations",
          filename: "/screenshots/floor4_support_sla.png",
          description: "Department SLA adherence matrix and agent turnaround benchmarks.",
          hotspots: [
            { id: "hs-s3", x: 50, y: 35, title: "Escalation Hierarchy", description: "Unresolved tier-1 tickets auto-escalate to Tier-2 engineers after 30 minutes.", kpi: "12.4m Response" }
          ]
        },
        {
          id: "sup-screen-3",
          label: "Two-Way Email Thread View",
          filename: "/screenshots/floor4_support_email.png",
          description: "Synchronized email conversation view with internal private agent notes.",
          hotspots: [
            { id: "hs-s4", x: 45, y: 65, title: "Synchronized Email Thread", description: "Customers respond via standard email; messages appear live in the ticket.", kpi: "4.85 CSAT Score" }
          ]
        }
      ],
      quickStats: [
        { label: "Avg Response", value: "12.4 Mins" },
        { label: "SLA Adherence", value: "96.8%" },
        { label: "CSAT Score", value: "4.85 / 5.0" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/support",
      moduleName: "Customer Support & SLA Operations Suite v3.8",
      deepLinkRoute: "/support/ticket-desk",
      demoRecordId: "TICKET-SUP-2026-104"
    },

    presenterNotes: [
      "Highlight how two-way email synchronization ensures customers never have to log into a portal if they prefer communicating via email.",
      "Showcase the automated SLA countdown timer which prevents forgotten tickets and keeps response times below 15 minutes."
    ],

    talkingPoints: [
      "Omnichannel ticketing with two-way email conversation threads.",
      "Visual SLA enforcement with automated supervisor escalation rules.",
      "4.85/5.0 CSAT rating supported by real-time agent performance scorecards."
    ]
  },

  // 🏢 FLOOR 5: Marketing Automation & Smart Offer Generation
  {
    id: "marketing",
    name: "Marketing Automation & Smart Offer Generation",
    code: "MKT-05",
    floor: 5,
    roomNumber: "505",
    icon: "Send",
    accentColor: "#f43f5e",
    glowColor: "rgba(244, 63, 94, 0.4)",
    themeGradient: "from-rose-500/20 to-pink-500/5",
    position3D: [3.5, 18.0, 1.2],
    doorPosition3D: [3.5, 18.0, 3.2],
    realisticRoomImage: "/office_marketing_studio.jpg",

    hero: {
      badge: "Dynamic Offer Engine",
      title: "Marketing Automation & Smart Offer Generation",
      subtitle: "Dynamic proposal building, master template versioning with revision diffs, promotional campaigns, and automated PDF client generation.",
      overview: "Core 360 Marketing delivers high-conversion proposal generation in under 5 minutes, allowing sales and marketing to build margin-protected client offers with complete version control.",
      statHeadline: "Offer Turnaround Time",
      statValue: "< 5 Minutes",
      statChange: "64.5% Proposal Acceptance"
    },

    kpis: [
      { id: "m_roi", label: "Campaign ROI", value: "340%", subtext: "Attributed pipeline revenue", trend: "up", trendValue: "+42% YoY" },
      { id: "m_accept", label: "Proposal Acceptance Rate", value: "64.5%", subtext: "Dynamic structured quotes", trend: "up", trendValue: "+18.2% Lift" },
      { id: "m_speed", label: "Offer Turnaround Time", value: "< 5 Mins", subtext: "Down from 2 business days", trend: "down", trendValue: "-94% Time" },
      { id: "m_templates", label: "Active Master Templates", value: "24 Templates", subtext: "With full revision diffs", trend: "neutral", trendValue: "v3.4 Latest" }
    ],

    features: [
      {
        id: "mkt-1",
        title: "Smart Offer Builder",
        description: "Modular item selection, discount controls, milestone payment schedules, and automated branded PDF export.",
        icon: "FileText",
        metric: "< 5 Mins",
        metricLabel: "Build Time",
        tags: ["Offer Builder", "PDF Generation", "Pricing"]
      },
      {
        id: "mkt-2",
        title: "Template & Versioning Engine",
        description: "Maintain master offer templates with complete revision history, rollback capabilities, and side-by-side diffs.",
        icon: "GitBranch",
        metric: "100%",
        metricLabel: "Audit History",
        tags: ["Versioning", "Diffs", "Templates"]
      },
      {
        id: "mkt-3",
        title: "Omnichannel Campaign Launcher",
        description: "Target market segmentation, promotional email blasts, conversion link tracking, and campaign ROI analytics.",
        icon: "Target",
        metric: "340%",
        metricLabel: "Campaign ROI",
        tags: ["Campaigns", "Segmentation", "Analytics"]
      },
      {
        id: "mkt-4",
        title: "Margin Protection Guardrails",
        description: "Algorithmic profit validation prevents reps from discounting offers below corporate margins without executive sign-off.",
        icon: "ShieldCheck",
        metric: "Guardrail",
        metricLabel: "Margin Safe",
        tags: ["Profitability", "Discounts", "Governance"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Core 360 ERP — Smart Offer & Campaign Suite",
      mockSubtitle: "Offer Proposal Builder, Template Version Drawer & Campaign Matrix",
      primaryScreenshot: "/screenshots/floor5_marketing_offers.png",
      subScreens: [
        {
          id: "mkt-screen-1",
          label: "Offer Proposal Builder",
          filename: "/screenshots/floor5_marketing_offers.png",
          description: "Dynamic quote assembly interface with item breakdown and one-click PDF generation.",
          hotspots: [
            { id: "hs-m1", x: 26, y: 32, title: "Modular Pricing Engine", description: "Select products/services with live discount and tax calculation.", kpi: "< 5m Turnaround" },
            { id: "hs-m2", x: 74, y: 32, title: "One-Click PDF Export", description: "Produces client-ready branded PDFs with payment schedule terms.", kpi: "64.5% Win Rate" }
          ]
        },
        {
          id: "mkt-screen-2",
          label: "Template & Version Drawer",
          filename: "/screenshots/floor5_marketing_versions.png",
          description: "Master proposal templates with visual diff comparison between version releases.",
          hotspots: [
            { id: "hs-m3", x: 50, y: 35, title: "Revision History & Diffs", description: "Inspect changes made to template terms and rollback with one click.", kpi: "24 Master Templates" }
          ]
        },
        {
          id: "mkt-screen-3",
          label: "Campaign Analytics Matrix",
          filename: "/screenshots/floor5_marketing_campaigns.png",
          description: "Campaign performance metrics tracking clicks, open rates, and closed revenue.",
          hotspots: [
            { id: "hs-m4", x: 45, y: 65, title: "Revenue Attribution", description: "Directly links incoming CRM deals back to the originating campaign.", kpi: "340% ROI" }
          ]
        }
      ],
      quickStats: [
        { label: "Turnaround Time", value: "< 5 Minutes" },
        { label: "Proposal Acceptance", value: "64.5%" },
        { label: "Active Campaigns", value: "8 Live Campaigns" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/marketing",
      moduleName: "Marketing Automation & Offer Suite v4.1",
      deepLinkRoute: "/marketing/offer-generator",
      demoRecordId: "OFFER-CORE-2026-772"
    },

    presenterNotes: [
      "Demonstrate how proposal generation is reduced from 2 days to under 5 minutes.",
      "Show the Template Versioning Engine with side-by-side revision comparisons.",
      "Highlight the margin guardrails ensuring every generated offer remains profitable."
    ],

    talkingPoints: [
      "Dynamic proposal builder reducing quote turnaround to under 5 minutes.",
      "Master template versioning engine with complete revision history and diff audits.",
      "Omnichannel campaigns with direct revenue attribution back to CRM deals."
    ]
  },

  // 🏢 FLOOR 6: Executive Command Center, AI Analytics & Security
  {
    id: "executive",
    name: "Executive Command Center, AI Analytics & Security",
    code: "EXEC-06",
    floor: 6,
    roomNumber: "Penthouse Suite",
    icon: "Shield",
    accentColor: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.4)",
    themeGradient: "from-amber-500/20 to-yellow-500/5",
    position3D: [0, 22.5, 1.2],
    doorPosition3D: [0, 22.5, 3.2],
    realisticRoomImage: "/office_boardroom_command.jpg",

    hero: {
      badge: "Unified Enterprise Governance",
      title: "Executive Command Center, AI Analytics & Security",
      subtitle: "Holistic 360-degree business intelligence, multi-gateway payment configurations, system audit logs, and granular RBAC security matrix.",
      overview: "The Executive Command Center synthesizes real-time telemetry from all 6 ERP modules into high-density boardroom dashboards, automated security guards, and financial health indexes.",
      statHeadline: "Monthly Recurring Revenue",
      statValue: "$312,000",
      statChange: "99.98% System Uptime"
    },

    kpis: [
      { id: "e_uptime", label: "System Availability & Uptime", value: "99.98%", subtext: "Zero critical service outages", trend: "up", trendValue: "99.98% SLA" },
      { id: "e_mrr", label: "Monthly Recurring Revenue", value: "$312,000", subtext: "Target: $290,000 (+7.6%)", trend: "up", trendValue: "+7.6% Above Target" },
      { id: "e_gateways", label: "Active Payment Gateways", value: "Stripe, PayPal, Paymob", subtext: "Multi-gateway settlement active", trend: "neutral", trendValue: "3 Configured" },
      { id: "e_rbac", label: "Security & RBAC Policies", value: "100% Audited", subtext: "Granular role-based controls", trend: "up", trendValue: "OWASP Compliant" }
    ],

    features: [
      {
        id: "exec-1",
        title: "Cross-Department Unified BI",
        description: "Live correlation between sales pipeline, workforce headcount, payroll disbursements, support CSAT, and marketing ROI.",
        icon: "Activity",
        metric: "360°",
        metricLabel: "Holistic Vision",
        tags: ["Cross-Silo", "BI Telemetry", "Health Index"]
      },
      {
        id: "exec-2",
        title: "Payment Gateway Manager",
        description: "Configure Stripe, PayPal, and Paymob API credentials, toggle test/live modes, and audit transaction settlements in real time.",
        icon: "CreditCard",
        metric: "3 Gateways",
        metricLabel: "Settlement Rails",
        tags: ["Stripe", "PayPal", "Paymob", "Gateways"]
      },
      {
        id: "exec-3",
        title: "Role-Based Access Control (RBAC)",
        description: "Granular permission matrix defining read, write, edit, and delete scopes for Admins, Managers, HR, Sales, and Support.",
        icon: "Lock",
        metric: "Granular",
        metricLabel: "RBAC Matrix",
        tags: ["Security", "RBAC", "JWT", "Permissions"]
      },
      {
        id: "exec-4",
        title: "Cryptographic Audit Log Monitor",
        description: "Immutable event logging recording every user action, login attempt, data export, and permission modification.",
        icon: "ShieldAlert",
        metric: "Immutable",
        metricLabel: "Audit Trail",
        tags: ["Audit Logs", "Compliance", "Security"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Core 360 ERP — Executive Boardroom Cockpit",
      mockSubtitle: "Unified BI Telemetry, Payment Gateway Configurator & Audit Log Monitor",
      primaryScreenshot: "/screenshots/floor6_executive_bi.png",
      subScreens: [
        {
          id: "exec-screen-1",
          label: "Executive KPI Command Center",
          filename: "/screenshots/floor6_executive_bi.png",
          description: "High-density executive dashboard synthesizing cross-department metrics into unified charts.",
          hotspots: [
            { id: "hs-e1", x: 25, y: 32, title: "Consolidated Revenue Pulse", description: "Streams live billing data across all commercial deals and recurring contracts.", kpi: "$312,000 MRR" },
            { id: "hs-e2", x: 75, y: 32, title: "Operational Health Index", description: "Aggregates uptime, support SLA, payroll precision, and sales velocity.", kpi: "99.98% Uptime" }
          ]
        },
        {
          id: "exec-screen-2",
          label: "Payment Gateway Configurator",
          filename: "/screenshots/floor6_executive_gateways.png",
          description: "Management panel for Stripe, PayPal, and Paymob API credentials with test mode toggles.",
          hotspots: [
            { id: "hs-e3", x: 50, y: 35, title: "Multi-Gateway Settlement", description: "Allows clients to pay via international (Stripe/PayPal) or local (Paymob) rails.", kpi: "3 Gateways Configured" }
          ]
        },
        {
          id: "exec-screen-3",
          label: "RBAC & Audit Log Monitor",
          filename: "/screenshots/floor6_executive_audit.png",
          description: "Live cryptographic event log and role permission assignment grid.",
          hotspots: [
            { id: "hs-e4", x: 45, y: 65, title: "Immutable Event Ledger", description: "Records timestamped user logins, data modifications, and privilege changes.", kpi: "100% Audited" }
          ]
        }
      ],
      quickStats: [
        { label: "System Uptime", value: "99.98%" },
        { label: "MRR", value: "$312,000" },
        { label: "Active Gateways", value: "Stripe, PayPal, Paymob" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/executive",
      moduleName: "Executive Command & BI Intelligence v7.5",
      deepLinkRoute: "/executive/command-center",
      demoRecordId: "BOARDROOM-MEETING-Q3-LIVE"
    },

    presenterNotes: [
      "This is the climactic moment of the presentation: Core 360 ERP unifies all 6 functional silos into a singular intelligent brain.",
      "Showcase the Payment Gateway integration (Stripe, PayPal, Paymob) demonstrating production-readiness.",
      "Highlight the granular RBAC security matrix protecting sensitive company data."
    ],

    talkingPoints: [
      "Unified cross-department business intelligence with zero sync latency.",
      "Multi-gateway payment architecture with Stripe, PayPal, and Paymob support.",
      "Granular RBAC permission matrix and immutable cryptographic audit logging."
    ]
  }
];

export const PRESENTATION_FLOW = [
  { id: "hero", title: "Headquarters Entrance", departmentId: null, floor: null, viewType: "hero" },
  { id: "reception", title: "Reception Desk & Dossier Files", departmentId: null, floor: null, viewType: "reception" },
  { id: "crm", title: "Floor 1: Commercial & CRM", departmentId: "crm", floor: 1, viewType: "department" },
  { id: "hrm", title: "Floor 2: HRM & People Operations", departmentId: "hrm", floor: 2, viewType: "department" },
  { id: "payroll", title: "Floor 3: Payroll & Fiscal Engine", departmentId: "payroll", floor: 3, viewType: "department" },
  { id: "support", title: "Floor 4: Customer Support & SLA", departmentId: "support", floor: 4, viewType: "department" },
  { id: "marketing", title: "Floor 5: Marketing & Smart Offers", departmentId: "marketing", floor: 5, viewType: "department" },
  { id: "executive", title: "Floor 6: Executive Command Center", departmentId: "executive", floor: 6, viewType: "department" },
  { id: "whole_org", title: "Whole Organization Synthesis", departmentId: "executive", floor: 6, viewType: "whole_org" },
  { id: "outro", title: "Rooftop Terrace & Acknowledgements", departmentId: null, floor: null, viewType: "outro" }
];

export const OUTRO_CONFIG = {
  headline: "Empowering Enterprise Agility with Core 360 ERP",
  closingStatement: "A complete, unified solution designed and implemented for next-generation digital operations.",
  specialThanks: [
    { title: "Track Supervisor & Mentors", desc: "For invaluable technical guidance, architectural review, and engineering mentorship." },
    { title: "Information Technology Institute (ITI)", desc: "AI Software Development Track Faculty & Leadership for fostering high-level excellence." }
  ],
  qaTopics: [
    {
      q: "How does Core 360 ERP prevent calculation variances in the Payroll Engine?",
      a: "By employing deterministic gross-to-net mathematical validation pipelines, checking social insurance constraints, loan balance installments, and bank IBAN formats before committing disbursements."
    },
    {
      q: "How does the system maintain performance across 6 interconnected modules?",
      a: "Through a modular micro-kernel architecture with asynchronous event-driven triggers, indexed MongoDB queries, and structured REST API service boundaries."
    },
    {
      q: "How is data security and role segregation enforced?",
      a: "Through stateless JWT authentication, cryptographic password hashing with Bcrypt, strict Role-Based Access Control (RBAC) middleware, and immutable audit logs."
    },
    {
      q: "How do dynamic offer proposals reflect in CRM and production?",
      a: "When an offer is accepted by a client, the system automatically advances the CRM deal to 'Won', generates the digital contract, and creates corresponding billing schedules."
    }
  ]
};
