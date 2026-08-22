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
 • Inventory Core                          • Webhooks & Event Listeners
 • Supply Chain Core                                 │
 • Accounting Core                                   │
 • Management Core                                   │
 • My Workspace                                      │
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
    name: "Floor 1: CRM & Sales Management",
    subtitle: "CRM Module · Sales & Customer Management",
    altitude: 0,
    theme: "amber",
    departmentId: "crm",
    tag: "COMMERCIAL & SALES",
    description: "Manage leads, customers, sales stages, and offers in one place."
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
    name: "Floor 3: Accounting Core",
    subtitle: "Accounting Core · Financial Management & Ledgers",
    altitude: 9.0,
    theme: "emerald",
    departmentId: "payroll",
    tag: "FINANCE & ACCOUNTING",
    description: "Comprehensive financial management and real-time ledger intelligence."
  },
  {
    floorNumber: 4,
    name: "Floor 4: Inventory Core",
    subtitle: "Inventory Core · Stock Visibility & Asset Tracking",
    altitude: 13.5,
    theme: "cyan",
    departmentId: "support",
    tag: "INVENTORY & ASSETS",
    description: "Real-time stock visibility, asset tracking, and multi-warehouse control."
  },
  {
    floorNumber: 5,
    name: "Floor 5: Supply Chain Core",
    subtitle: "Supply Chain Core · Procurement & Fulfillment",
    altitude: 18.0,
    theme: "rose",
    departmentId: "marketing",
    tag: "PROCUREMENT & SUPPLY",
    description: "End-to-end procurement, vendor collaboration, and fulfillment lifecycle."
  },
  {
    floorNumber: 6,
    name: "Floor 6: My Workspace Core",
    subtitle: "My Workspace Core · Employee Productivity & Tasks",
    altitude: 22.5,
    theme: "gold",
    departmentId: "executive",
    tag: "WORKSPACE & PRODUCTIVITY",
    description: "Personalized employee dashboard, daily productivity suite, and task control center."
  }
];

export const DEPARTMENTS_CONFIG: DepartmentConfig[] = [
  // 🏢 FLOOR 1: Commercial, CRM & Sales Pipeline
  {
    id: "crm",
    name: "CRM Module · Sales & Customer Management",
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
      badge: "My Role: CRM Frontend + Backend",
      title: "CORE 360 · CRM MODULE · SALES & CUSTOMER MANAGEMENT",
      subtitle: "Manage leads, customers, sales stages, and offers in one place.",
      overview: "Manage leads, customers, sales stages, and offers in one place.",
      statHeadline: "CRM SALES ENGINE",
      statValue: "CRM Sales Engine",
      statChange: "My Role: CRM Frontend + Backend"
    },

    kpis: [
      { id: "lead-mgmt", label: "1. LEAD MANAGEMENT", value: "Lead Management", subtext: "Create, update, assign and track leads.", trend: "up", trendValue: "Frontend + Backend" },
      { id: "sales-pipe", label: "2. SALES PIPELINE", value: "Sales Pipeline", subtext: "Manage sales stages using a dash board.", trend: "up", trendValue: "Dashboard View" },
      { id: "offers", label: "3. OFFERS", value: "Offers", subtext: "Create and manage customer offers.", trend: "up", trendValue: "Quotation Engine" },
      { id: "workflow", label: "4. SALES WORKFLOW", value: "Sales Workflow", subtext: "Lead → Qualification → Offer → Sale", trend: "up", trendValue: "End-to-End" }
    ],

    features: [
      {
        id: "crm-1",
        title: "Lead Management",
        description: "Create, update, assign and track leads.",
        icon: "Users",
        metric: "Core",
        metricLabel: "Module",
        tags: ["Leads", "Tracking"]
      },
      {
        id: "crm-2",
        title: "Customer Management",
        description: "Maintain customer directory and client profiles.",
        icon: "UserCheck",
        metric: "Core",
        metricLabel: "Module",
        tags: ["Customers", "Profiles"]
      },
      {
        id: "crm-3",
        title: "Contact Management",
        description: "Organize client contacts and communication details.",
        icon: "Contact",
        metric: "Core",
        metricLabel: "Module",
        tags: ["Contacts", "Directory"]
      },
      {
        id: "crm-4",
        title: "Sales Pipeline",
        description: "Manage sales stages using a dashboard.",
        icon: "Kanban",
        metric: "Core",
        metricLabel: "Module",
        tags: ["Pipeline", "Stages"]
      },
      {
        id: "crm-5",
        title: "Offers / Quotations",
        description: "Create and manage customer offers.",
        icon: "FileText",
        metric: "Core",
        metricLabel: "Module",
        tags: ["Offers", "Quotes"]
      },
      {
        id: "crm-6",
        title: "Sales Follow-up",
        description: "Follow up with prospects through structured sales stages.",
        icon: "Clock",
        metric: "Core",
        metricLabel: "Module",
        tags: ["Follow-up", "Sales"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "CRM Leads & Sales Pipeline",
      mockSubtitle: "Manage leads, customers, sales stages, and offers in one place.",
      primaryScreenshot: "/screenshots/floor1_crm_kanban.png",
      subScreens: [
        {
          id: "crm-screen-1",
          label: "CRM Leads & Sales Pipeline",
          filename: "/screenshots/floor1_crm_kanban.png",
          description: "Manage leads, customers, sales stages, and offers in one place.",
          hotspots: [
            { id: "hs-c1", x: 25, y: 35, title: "Lead Management", description: "Create, update, assign and track leads.", kpi: "Leads" },
            { id: "hs-c2", x: 75, y: 35, title: "Sales Pipeline & Offers", description: "Manage sales stages and customer offers.", kpi: "Offers" }
          ]
        }
      ],
      quickStats: [
        { label: "Module", value: "CRM Sales Engine" },
        { label: "Role", value: "Frontend + Backend" },
        { label: "Workflow", value: "Lead → Sale" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/crm",
      moduleName: "CRM Module · Sales & Customer Management",
      deepLinkRoute: "/crm/leads-pipeline",
      demoRecordId: "DEAL-CORE-2026-88"
    },

    presenterNotes: [
      "Title: CORE 360 · CRM MODULE · SALES & CUSTOMER MANAGEMENT",
      "Main description: Manage leads, customers, sales stages, and offers in one place.",
      "Highlight responsibility: My Role: CRM Frontend + Backend.",
      "Explain the 4 feature cards: 1. Lead Management, 2. Sales Pipeline, 3. Offers, 4. Sales Workflow (Lead → Qualification → Offer → Sale)."
    ],

    talkingPoints: [
      "My Role: CRM Frontend + Backend.",
      "1. Lead Management: Create, update, assign and track leads.",
      "2. Sales Pipeline: Manage sales stages using a dashboard.",
      "3. Offers: Create and manage customer offers.",
      "4. Sales Workflow: Lead → Qualification → Offer → Sale."
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

  // 🏢 FLOOR 3: Accounting Core
  {
    id: "payroll",
    name: "Accounting Core",
    code: "ACC-03",
    floor: 3,
    roomNumber: "303",
    icon: "Calculator",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    themeGradient: "from-emerald-500/20 to-teal-500/5",
    position3D: [-3.5, 9.0, 1.2],
    doorPosition3D: [-3.5, 9.0, 3.2],
    realisticRoomImage: "/office_finance_room_1787220396138.jpg",

    hero: {
      badge: "Accounting & Financial Core",
      title: "CORE 360 · ACCOUNTING CORE · FINANCIAL MANAGEMENT",
      subtitle: "Comprehensive financial management and real-time ledger intelligence.",
      overview: "Comprehensive financial management and real-time ledger intelligence.",
      statHeadline: "ACCOUNTING CORE",
      statValue: "Financial Management",
      statChange: "Real-Time Ledger Intelligence"
    },

    kpis: [
      { id: "gl-curr", label: "1. GENERAL LEDGER & MULTI-CURRENCY", value: "General Ledger", subtext: "Automated double-entry bookkeeping with real-time balance sheets, profit & loss statements, and multi-currency support.", trend: "up", trendValue: "Real-Time" },
      { id: "ar-ap", label: "2. ACCOUNTS RECEIVABLE & PAYABLE (AR/AP)", value: "AR / AP Management", subtext: "Streamlined invoice creation, automated payment reminders, vendor bill tracking, and reconciliation.", trend: "up", trendValue: "Automated" },
      { id: "tax-comp", label: "3. TAX & COMPLIANCE AUTOMATION", value: "Tax Compliance", subtext: "Automated tax rule calculation (VAT, sales tax, withholding) with exportable audit-ready financial reports.", trend: "up", trendValue: "Audit-Ready" },
      { id: "cash-flow", label: "4. CASH FLOW & EXPENSE TRACKING", value: "Cash Flow Tracking", subtext: "End-to-end expense logging, petty cash tracking, and dynamic cash flow forecasting dashboards.", trend: "up", trendValue: "Dynamic Forecast" }
    ],

    features: [
      {
        id: "acc-1",
        title: "General Ledger & Multi-Currency",
        description: "Automated double-entry bookkeeping with real-time balance sheets, profit & loss statements, and multi-currency support.",
        icon: "BookOpen",
        metric: "Core",
        metricLabel: "Ledger",
        tags: ["General Ledger", "Multi-Currency", "P&L"]
      },
      {
        id: "acc-2",
        title: "Accounts Receivable & Payable (AR/AP)",
        description: "Streamlined invoice creation, automated payment reminders, vendor bill tracking, and reconciliation.",
        icon: "Receipt",
        metric: "Core",
        metricLabel: "Invoicing",
        tags: ["AR/AP", "Invoices", "Reconciliation"]
      },
      {
        id: "acc-3",
        title: "Tax & Compliance Automation",
        description: "Automated tax rule calculation (VAT, sales tax, withholding) with exportable audit-ready financial reports.",
        icon: "ShieldCheck",
        metric: "Core",
        metricLabel: "Tax",
        tags: ["Tax Rules", "VAT", "Audit Reports"]
      },
      {
        id: "acc-4",
        title: "Cash Flow & Expense Tracking",
        description: "End-to-end expense logging, petty cash tracking, and dynamic cash flow forecasting dashboards.",
        icon: "TrendingUp",
        metric: "Core",
        metricLabel: "Cash Flow",
        tags: ["Expenses", "Petty Cash", "Forecasting"]
      },
      {
        id: "acc-5",
        title: "Bank Reconciliation & Audit Trails",
        description: "Secure transaction matching with bank feeds, granular permission controls, and complete historical audit logs.",
        icon: "Building",
        metric: "Core",
        metricLabel: "Banking",
        tags: ["Bank Feeds", "Audit Trail", "Security"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Accounting Core & Financial Ledger",
      mockSubtitle: "Comprehensive financial management and real-time ledger intelligence.",
      primaryScreenshot: "/screenshots/floor3_payroll_runs.png",
      subScreens: [
        {
          id: "acc-screen-1",
          label: "Accounting Core & Financial Ledger",
          filename: "/screenshots/floor3_payroll_runs.png",
          description: "Comprehensive financial management and real-time ledger intelligence.",
          hotspots: [
            { id: "hs-a1", x: 28, y: 35, title: "General Ledger", description: "Automated double-entry bookkeeping and real-time balance sheets.", kpi: "General Ledger" },
            { id: "hs-a2", x: 72, y: 35, title: "AR / AP & Reconciliation", description: "Invoice automation and bank transaction matching.", kpi: "Reconciliation" }
          ]
        }
      ],
      quickStats: [
        { label: "Module", value: "Accounting Core" },
        { label: "Ledger", value: "Multi-Currency" },
        { label: "Compliance", value: "Audit-Ready" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/accounting",
      moduleName: "Accounting Core · Financial Management Suite",
      deepLinkRoute: "/accounting/general-ledger",
      demoRecordId: "ACC-CORE-2026-LEDGER"
    },

    presenterNotes: [
      "Title: Accounting Core - Comprehensive financial management and real-time ledger intelligence.",
      "Explain the core capabilities: General Ledger, AR/AP, Tax & Compliance automation, Cash Flow tracking, and Bank Reconciliation.",
      "Highlight multi-currency support and real-time auditability across all fiscal transactions."
    ],

    talkingPoints: [
      "1. General Ledger & Multi-Currency: Automated double-entry bookkeeping and real-time P&L.",
      "2. Accounts Receivable & Payable (AR/AP): Streamlined invoicing and automated vendor payment reconciliation.",
      "3. Tax & Compliance Automation: Automated VAT/sales tax rules and audit-ready financial reports.",
      "4. Cash Flow & Expense Tracking: Dynamic cash flow forecasting and expense management.",
      "5. Bank Reconciliation & Audit Trails: Secure bank feed matching and immutable logs."
    ]
  },

  // 🏢 FLOOR 4: Inventory Core
  {
    id: "support",
    name: "Inventory Core",
    code: "INV-04",
    floor: 4,
    roomNumber: "404",
    icon: "Boxes",
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    themeGradient: "from-cyan-500/20 to-blue-500/5",
    position3D: [-3.5, 13.5, 1.2],
    doorPosition3D: [-3.5, 13.5, 3.2],
    realisticRoomImage: "/office_inventory_room_1787220542567.jpg",

    hero: {
      badge: "Stock & Multi-Warehouse Control",
      title: "CORE 360 · INVENTORY CORE · REAL-TIME STOCK & ASSET MANAGEMENT",
      subtitle: "Real-time stock visibility, asset tracking, and multi-warehouse control.",
      overview: "Real-time stock visibility, asset tracking, and multi-warehouse control.",
      statHeadline: "INVENTORY CORE",
      statValue: "Stock & Asset Control",
      statChange: "Multi-Warehouse Visibility"
    },

    kpis: [
      { id: "inv-wh", label: "1. MULTI-WAREHOUSE & LOCATION CONTROL", value: "Multi-Warehouse", subtext: "Centralized tracking of stock levels, bin locations, transfers, and transit goods across multiple facilities.", trend: "up", trendValue: "Multi-Facility" },
      { id: "inv-sku", label: "2. SKU, BATCH & EXPIRY MANAGEMENT", value: "Batch & Expiry", subtext: "Granular tracking by serial numbers, barcodes, batch/lot numbers, and automated expiration date alerts.", trend: "up", trendValue: "Barcode/Lot" },
      { id: "inv-alerts", label: "3. AUTOMATED STOCK LEVEL ALERTS", value: "Stock Level Alerts", subtext: "Dynamic reorder point calculation, low-stock notifications, and automatic purchase requisition triggers.", trend: "up", trendValue: "Auto Reorder" },
      { id: "inv-val", label: "4. STOCK VALUATION & COSTING METHODS", value: "Valuation & Costing", subtext: "Support for standard costing methods (FIFO, LIFO, Weighted Average) integrated directly with the General Ledger.", trend: "up", trendValue: "FIFO / LIFO" }
    ],

    features: [
      {
        id: "inv-1",
        title: "Multi-Warehouse & Location Control",
        description: "Centralized tracking of stock levels, bin locations, transfers, and transit goods across multiple facilities.",
        icon: "Building2",
        metric: "Core",
        metricLabel: "Facilities",
        tags: ["Warehouses", "Bin Locations", "Transfers"]
      },
      {
        id: "inv-2",
        title: "SKU, Batch & Expiry Management",
        description: "Granular tracking by serial numbers, barcodes, batch/lot numbers, and automated expiration date alerts.",
        icon: "QrCode",
        metric: "Core",
        metricLabel: "Tracking",
        tags: ["Serial Numbers", "Barcodes", "Batches", "Expiry"]
      },
      {
        id: "inv-3",
        title: "Automated Stock Level Alerts",
        description: "Dynamic reorder point calculation, low-stock notifications, and automatic purchase requisition triggers.",
        icon: "BellRing",
        metric: "Core",
        metricLabel: "Alerts",
        tags: ["Reorder Points", "Low Stock", "Auto-PO"]
      },
      {
        id: "inv-4",
        title: "Stock Valuation & Costing Methods",
        description: "Support for standard costing methods (FIFO, LIFO, Weighted Average) integrated directly with the General Ledger.",
        icon: "Coins",
        metric: "Core",
        metricLabel: "Valuation",
        tags: ["FIFO", "LIFO", "Weighted Average", "GL Sync"]
      },
      {
        id: "inv-5",
        title: "Dead Stock & Cycle Count Analytics",
        description: "Rapid barcode-assisted cycle counting, discrepancy auditing, and slow-moving/dead-stock identification.",
        icon: "BarChart3",
        metric: "Core",
        metricLabel: "Analytics",
        tags: ["Cycle Counts", "Audit", "Dead Stock"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Inventory Core & Stock Management",
      mockSubtitle: "Real-time stock visibility, asset tracking, and multi-warehouse control.",
      primaryScreenshot: "/screenshots/floor4_support_tickets.png",
      subScreens: [
        {
          id: "inv-screen-1",
          label: "Inventory Core & Stock Management",
          filename: "/screenshots/floor4_support_tickets.png",
          description: "Real-time stock visibility, asset tracking, and multi-warehouse control.",
          hotspots: [
            { id: "hs-i1", x: 24, y: 35, title: "Multi-Warehouse Map", description: "Real-time stock level monitoring across facilities.", kpi: "Multi-Warehouse" },
            { id: "hs-i2", x: 74, y: 35, title: "Automated Reorder Engine", description: "Dynamic triggers generate purchase requisitions upon threshold breach.", kpi: "Auto-Reorder" }
          ]
        }
      ],
      quickStats: [
        { label: "Module", value: "Inventory Core" },
        { label: "Costing", value: "FIFO / LIFO / W.Avg" },
        { label: "Tracking", value: "Barcode & Batch" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/inventory",
      moduleName: "Inventory Core · Multi-Warehouse & Asset Suite",
      deepLinkRoute: "/inventory/stock-matrix",
      demoRecordId: "INV-CORE-STOCK-2026"
    },

    presenterNotes: [
      "Title: Inventory Core - Real-time stock visibility, asset tracking, and multi-warehouse control.",
      "Explain the 5 core functions: Multi-Warehouse tracking, SKU/batch/expiry management, automated reorder alerts, standard valuation methods (FIFO/LIFO), and dead stock cycle counting.",
      "Highlight the integration with General Ledger for automatic asset value reconciliation."
    ],

    talkingPoints: [
      "1. Multi-Warehouse & Location Control: Real-time stock visibility across all physical facilities.",
      "2. SKU, Batch & Expiry Management: Serial number, barcode, and batch tracking with expiration alerts.",
      "3. Automated Stock Level Alerts: Dynamic reorder point calculation to eliminate stockouts.",
      "4. Stock Valuation & Costing Methods: FIFO, LIFO, and Weighted Average costing synced with accounting.",
      "5. Dead Stock & Cycle Count Analytics: Barcode cycle counting and slow-moving stock identification."
    ]
  },

  // 🏢 FLOOR 5: Supply Chain Core
  {
    id: "marketing",
    name: "Supply Chain Core",
    code: "SCM-05",
    floor: 5,
    roomNumber: "505",
    icon: "Truck",
    accentColor: "#f43f5e",
    glowColor: "rgba(244, 63, 94, 0.4)",
    themeGradient: "from-rose-500/20 to-pink-500/5",
    position3D: [3.5, 18.0, 1.2],
    doorPosition3D: [3.5, 18.0, 3.2],
    realisticRoomImage: "/office_marketing_studio.jpg",

    hero: {
      badge: "Procurement & Fulfillment",
      title: "CORE 360 · SUPPLY CHAIN CORE · PROCUREMENT & FULFILLMENT",
      subtitle: "End-to-end procurement, vendor collaboration, and fulfillment lifecycle.",
      overview: "End-to-end procurement, vendor collaboration, and fulfillment lifecycle.",
      statHeadline: "SUPPLY CHAIN CORE",
      statValue: "Procurement & Fulfillment",
      statChange: "Lifecycle Automation"
    },

    kpis: [
      { id: "scm-po", label: "1. PROCUREMENT & PURCHASE ORDER WORKFLOW", value: "Procurement Workflow", subtext: "Automated RFQs (Request for Quotations), PO generation, vendor comparison matrices, and multi-tier approval chains.", trend: "up", trendValue: "Multi-Tier Approvals" },
      { id: "scm-vendor", label: "2. SUPPLIER & VENDOR RELATIONSHIP HUB", value: "Supplier Hub", subtext: "Centralized supplier directory with scorecards tracking on-time delivery, quality ratings, and pricing history.", trend: "up", trendValue: "Vendor Scorecards" },
      { id: "scm-qc", label: "3. GOODS RECEIPT & QUALITY INSPECTION (QC)", value: "QC & GRN Logging", subtext: "Digital GRN (Goods Received Note) logging with built-in quality check workflows, pass/fail status, and return-to-vendor (RTV) handling.", trend: "up", trendValue: "Digital GRN & QC" },
      { id: "scm-demand", label: "4. DEMAND FORECASTING & REPLENISHMENT", value: "Demand Forecasting", subtext: "Lead-time analytics and predictive demand planning to eliminate stockouts and optimize bulk purchasing.", trend: "up", trendValue: "Predictive Planning" }
    ],

    features: [
      {
        id: "scm-1",
        title: "Procurement & Purchase Order Workflow",
        description: "Automated RFQs (Request for Quotations), PO generation, vendor comparison matrices, and multi-tier approval chains.",
        icon: "FileCheck2",
        metric: "Core",
        metricLabel: "Procurement",
        tags: ["RFQs", "Purchase Orders", "Approvals"]
      },
      {
        id: "scm-2",
        title: "Supplier & Vendor Relationship Hub",
        description: "Centralized supplier directory with scorecards tracking on-time delivery, quality ratings, and pricing history.",
        icon: "Users2",
        metric: "Core",
        metricLabel: "Vendors",
        tags: ["Suppliers", "Scorecards", "Quality"]
      },
      {
        id: "scm-3",
        title: "Goods Receipt & Quality Inspection (QC)",
        description: "Digital GRN (Goods Received Note) logging with built-in quality check workflows, pass/fail status, and return-to-vendor (RTV) handling.",
        icon: "ShieldAlert",
        metric: "Core",
        metricLabel: "Quality",
        tags: ["GRN", "Quality Checks", "RTV Handling"]
      },
      {
        id: "scm-4",
        title: "Demand Forecasting & Replenishment",
        description: "Lead-time analytics and predictive demand planning to eliminate stockouts and optimize bulk purchasing.",
        icon: "TrendingUp",
        metric: "Core",
        metricLabel: "Forecasting",
        tags: ["Lead Times", "Replenishment", "Bulk Planning"]
      },
      {
        id: "scm-5",
        title: "Logistics & Order Fulfillment",
        description: "Seamless integration from sales orders to pick-pack-ship stages with automated shipping status updates.",
        icon: "PackageCheck",
        metric: "Core",
        metricLabel: "Logistics",
        tags: ["Pick-Pack-Ship", "Fulfillment", "Tracking"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "Supply Chain Core & Procurement Hub",
      mockSubtitle: "End-to-end procurement, vendor collaboration, and fulfillment lifecycle.",
      primaryScreenshot: "/screenshots/floor5_marketing_offers.png",
      subScreens: [
        {
          id: "scm-screen-1",
          label: "Supply Chain Core & Procurement Hub",
          filename: "/screenshots/floor5_marketing_offers.png",
          description: "End-to-end procurement, vendor collaboration, and fulfillment lifecycle.",
          hotspots: [
            { id: "hs-sc1", x: 26, y: 32, title: "Purchase Order Matrix", description: "Automated RFQs and multi-tier approval chains.", kpi: "PO Automation" },
            { id: "hs-sc2", x: 74, y: 32, title: "Goods Receipt & QC", description: "Digital GRN processing and quality check workflows.", kpi: "Digital GRN" }
          ]
        }
      ],
      quickStats: [
        { label: "Module", value: "Supply Chain Core" },
        { label: "Workflow", value: "RFQ → PO → GRN" },
        { label: "Fulfillment", value: "Pick-Pack-Ship" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/supply-chain",
      moduleName: "Supply Chain Core · Procurement & Logistics Suite",
      deepLinkRoute: "/supply-chain/purchase-orders",
      demoRecordId: "PO-CORE-2026-991"
    },

    presenterNotes: [
      "Title: Supply Chain Core - End-to-end procurement, vendor collaboration, and fulfillment lifecycle.",
      "Explain the 5 core components: Procurement workflows (RFQs & POs), Supplier relationship scorecards, Goods Receipt with QC, Demand forecasting, and pick-pack-ship logistics.",
      "Highlight how supply chain seamlessly connects sales orders to warehouse inventory and purchase orders."
    ],

    talkingPoints: [
      "1. Procurement & Purchase Order Workflow: Automated RFQs, PO generation, and multi-tier approvals.",
      "2. Supplier & Vendor Relationship Hub: Centralized directory with performance scorecards.",
      "3. Goods Receipt & Quality Inspection (QC): Digital GRN logging with pass/fail workflows.",
      "4. Demand Forecasting & Replenishment: Predictive analytics preventing stockouts.",
      "5. Logistics & Order Fulfillment: Seamless sales order to pick-pack-ship lifecycle."
    ]
  },

  // 🏢 FLOOR 6: My Workspace Core
  {
    id: "executive",
    name: "My Workspace Core",
    code: "WRK-06",
    floor: 6,
    roomNumber: "Penthouse Suite",
    icon: "LayoutDashboard",
    accentColor: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.4)",
    themeGradient: "from-amber-500/20 to-yellow-500/5",
    position3D: [0, 22.5, 1.2],
    doorPosition3D: [0, 22.5, 3.2],
    realisticRoomImage: "/office_boardroom_command.jpg",

    hero: {
      badge: "Employee Productivity Hub",
      title: "CORE 360 · MY WORKSPACE CORE · EMPLOYEE PRODUCTIVITY",
      subtitle: "Personalized employee dashboard, daily productivity suite, and task control center.",
      overview: "Personalized employee dashboard, daily productivity suite, and task control center.",
      statHeadline: "MY WORKSPACE CORE",
      statValue: "Productivity & Task Center",
      statChange: "Unified Employee Suite"
    },

    kpis: [
      { id: "wrk-dash", label: "1. UNIFIED ACTION DASHBOARD", value: "Action Dashboard", subtext: "Personalized overview of assigned tasks, pending approvals, upcoming deadlines, and key role-specific metrics.", trend: "up", trendValue: "Role-Specific" },
      { id: "wrk-ess", label: "2. SELF-SERVICE HR & ATTENDANCE", value: "Self-Service HR", subtext: "Clock-in/out, leave requests, timesheet tracking, payroll slips, and expense claim submissions.", trend: "up", trendValue: "Attendance & ESS" },
      { id: "wrk-comms", label: "3. COLLABORATION & INTERNAL COMMS", value: "Collaboration Hub", subtext: "Integrated company announcements, cross-department notifications, direct mentions, and team message feeds.", trend: "up", trendValue: "Company Feeds" },
      { id: "wrk-approval", label: "4. WORKFLOW & APPROVAL HUB", value: "Approval Inbox", subtext: "One-click approval inbox for purchase requests, invoices, discount authorizations, and workflow delegations.", trend: "up", trendValue: "1-Click Approvals" }
    ],

    features: [
      {
        id: "wrk-1",
        title: "Unified Action Dashboard",
        description: "Personalized overview of assigned tasks, pending approvals, upcoming deadlines, and key role-specific metrics.",
        icon: "Layout",
        metric: "Core",
        metricLabel: "Dashboard",
        tags: ["Tasks", "Deadlines", "Role Metrics"]
      },
      {
        id: "wrk-2",
        title: "Self-Service HR & Attendance",
        description: "Clock-in/out, leave requests, timesheet tracking, payroll slips, and expense claim submissions.",
        icon: "UserCheck2",
        metric: "Core",
        metricLabel: "ESS",
        tags: ["Clock-In/Out", "Leaves", "Pay Slips", "Expenses"]
      },
      {
        id: "wrk-3",
        title: "Collaboration & Internal Comms",
        description: "Integrated company announcements, cross-department notifications, direct mentions, and team message feeds.",
        icon: "MessageSquare",
        metric: "Core",
        metricLabel: "Comms",
        tags: ["Announcements", "Mentions", "Team Feeds"]
      },
      {
        id: "wrk-4",
        title: "Workflow & Approval Hub",
        description: "One-click approval inbox for purchase requests, invoices, discount authorizations, and workflow delegations.",
        icon: "CheckSquare",
        metric: "Core",
        metricLabel: "Approvals",
        tags: ["PO Approvals", "Invoices", "Delegations"]
      },
      {
        id: "wrk-5",
        title: "Custom Shortcuts & Quick Actions",
        description: "Personalized navigation bar with custom quick-action buttons to launch common tasks instantly.",
        icon: "Sparkles",
        metric: "Core",
        metricLabel: "Shortcuts",
        tags: ["Quick Actions", "Custom Navigation", "Productivity"]
      }
    ],

    showcase: {
      type: "screenshot",
      mockTitle: "My Workspace Core & Productivity Dashboard",
      mockSubtitle: "Personalized employee dashboard, daily productivity suite, and task control center.",
      primaryScreenshot: "/screenshots/floor6_executive_bi.png",
      subScreens: [
        {
          id: "wrk-screen-1",
          label: "My Workspace Core & Productivity Dashboard",
          filename: "/screenshots/floor6_executive_bi.png",
          description: "Personalized employee dashboard, daily productivity suite, and task control center.",
          hotspots: [
            { id: "hs-w1", x: 25, y: 32, title: "Personal Task & Metric Overview", description: "Real-time task assignments and deadline notifications.", kpi: "Action Center" },
            { id: "hs-w2", x: 75, y: 32, title: "One-Click Approval Queue", description: "Direct authorizations for requests, discounts, and workflow steps.", kpi: "Instant Approval" }
          ]
        }
      ],
      quickStats: [
        { label: "Module", value: "My Workspace Core" },
        { label: "Productivity", value: "Tasks & Deadlines" },
        { label: "Approvals", value: "1-Click Hub" }
      ]
    },

    liveErp: {
      url: "https://demo.core360-erp.enterprise.internal/workspace",
      moduleName: "My Workspace Core · Employee Productivity Suite",
      deepLinkRoute: "/workspace/dashboard",
      demoRecordId: "WORKSPACE-USER-2026"
    },

    presenterNotes: [
      "Title: My Workspace Core - Personalized employee dashboard, daily productivity suite, and task control center.",
      "Explain the 5 core features: Action dashboard, self-service HR (clock-in, leaves, slips), internal team collaboration feeds, workflow approval inbox, and custom quick-action shortcuts.",
      "Highlight how My Workspace empowers individual employee efficiency and centralizes cross-department tasks in one daily hub."
    ],

    talkingPoints: [
      "1. Unified Action Dashboard: Personalized tasks, deadlines, and role-specific KPIs.",
      "2. Self-Service HR & Attendance: Clock-in/out, leave requests, timesheets, and pay slips.",
      "3. Collaboration & Internal Comms: Integrated company announcements and team notifications.",
      "4. Workflow & Approval Hub: One-click approval inbox for invoices and purchase requests.",
      "5. Custom Shortcuts & Quick Actions: Instant launcher for frequent daily operations."
    ]
  }
];

export const PRESENTATION_FLOW = [
  { id: "hero", title: "Headquarters Entrance", departmentId: null, floor: null, viewType: "hero" },
  { id: "reception", title: "Reception Desk & Dossier Files", departmentId: null, floor: null, viewType: "reception" },
  { id: "crm", title: "Floor 1: CRM & Sales Management", departmentId: "crm", floor: 1, viewType: "department" },
  { id: "hrm", title: "Floor 2: HRM & People Operations", departmentId: "hrm", floor: 2, viewType: "department" },
  { id: "payroll", title: "Floor 3: Accounting Core", departmentId: "payroll", floor: 3, viewType: "department" },
  { id: "support", title: "Floor 4: Inventory Core", departmentId: "support", floor: 4, viewType: "department" },
  { id: "marketing", title: "Floor 5: Supply Chain Core", departmentId: "marketing", floor: 5, viewType: "department" },
  { id: "executive", title: "Floor 6: My Workspace Core", departmentId: "executive", floor: 6, viewType: "department" },
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
