const $ = (e) => document.querySelector(e); const $$ = (e) => [...document.querySelectorAll(e)];

const escapeHTML = (e = "") =>
  String(e)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// Preset profiles for job roles (Dummy & safe placeholder details)
const sampleProfiles = {
  "network-engineer": {
    fullName: "Network Engineer Example",
    jobTitle: "Senior Network & Systems Engineer",
    email: "network.sample@example.com",
    phone: "+91 98000 00001",
    location: "City, State",
    linkedin: "linkedin.com/in/network-example",
    github: "github.com/network-example",
    summary: "Dedicated Network Engineer with 6+ years of experience designing, configuring, and optimizing enterprise hybrid-cloud WAN/LAN networks, next-gen firewalls, and SD-WAN architectures with 99.99% uptime compliance.",
    template: "harvard",
    color: "#2563eb",
    pageSize: "a4",
    margin: "standard",
    fontSize: "base",
    lineHeight: "normal",
    experience: [
      {
        position: "Senior Network Engineer",
        company: "Example Networks Tech Ltd",
        location: "City, State",
        start: "2022 – Present",
        bullets: "Designed and deployed enterprise SD-WAN routing across 20+ branch offices, reducing network latency by 32%.\nConfigured Cisco ASA and Palo Alto firewalls, maintaining strict Zero-Trust compliance and security audits.\nAutomated routine switch configuration backups across 100+ nodes using Python and Netmiko."
      },
      {
        position: "Network Operations Engineer",
        company: "Global Infrastructure Services",
        location: "City, State",
        start: "2019 – 2022",
        bullets: "Managed BGP and OSPF routing protocols for Tier-1 data center traffic.\nDiagnosed critical network bottlenecks using Wireshark and SolarWinds, cutting Mean Time to Resolution (MTTR) by 25%."
      }
    ],
    projects: [
      {
        title: "Automated Switch Config Compliance Bot",
        link: "github.com/network-example/network-bot",
        bullets: "Built a Python-based compliance tool to verify running configurations against CIS benchmarks on 80+ network routers nightly."
      }
    ],
    education: [
      {
        degree: "B.Tech in Information Technology",
        institution: "Example Technical University",
        year: "2015 – 2019"
      }
    ],
    skills: [
      {
        category: "Routing & Switching",
        items: "Cisco IOS-XE, BGP, OSPF, VLANs, VXLAN, SD-WAN, Juniper JunOS"
      },
      {
        category: "Security & Tools",
        items: "Palo Alto Networks, Fortinet, Wireshark, PRTG, SolarWinds, IPsec VPN"
      },
      {
        category: "Scripting & Cloud",
        items: "Python (Netmiko, Paramiko), Ansible, Bash, AWS VPC Routing"
      }
    ],
    certifications: [
      {
        title: "Cisco Certified Network Professional (CCNP Enterprise)",
        issuer: "Cisco Systems",
        year: "2023"
      },
      {
        title: "AWS Certified Advanced Networking – Specialty",
        issuer: "Amazon Web Services",
        year: "2024"
      }
    ]
  },

  "python-developer": {
    fullName: "Python Developer Example",
    jobTitle: "Senior Python & Backend Developer",
    email: "python.sample@example.com",
    phone: "+91 98000 00002",
    location: "City, State (Remote)",
    linkedin: "linkedin.com/in/python-example",
    github: "github.com/python-example",
    summary: "Performance-focused Python Backend Engineer with 5+ years of experience architecting high-throughput RESTful & GraphQL microservices, caching layers, and database optimizations that support over 2M monthly active users.",
    template: "stanford",
    color: "#0284c7",
    pageSize: "a4",
    margin: "standard",
    fontSize: "base",
    lineHeight: "normal",
    experience: [
      {
        position: "Senior Backend Developer",
        company: "Example Software Labs",
        location: "City, State",
        start: "2022 – Present",
        bullets: "Architected asynchronous payment processing pipelines using FastAPI, Celery, and Redis, reducing API response times by 45%.\nRefactored complex PostgreSQL relational queries, indexing strategies, and database connection pooling to handle 10k requests/sec.\nMentored 4 junior engineers on clean architecture, unit testing with PyTest, and CI/CD automation."
      },
      {
        position: "Software Engineer (Python)",
        company: "Sample Digital Solutions",
        location: "City, State",
        start: "2019 – 2022",
        bullets: "Engineered scalable web scrapers and ETL data extraction workflows using Scrapy and Pandas.\nMaintained 99.95% API uptime by implementing automated health-checks and Dockerized AWS ECS deployments."
      }
    ],
    projects: [
      {
        title: "High-Speed Distributed Rate Limiter",
        link: "github.com/python-example/rate-limiter",
        bullets: "Designed a lightweight token-bucket rate-limiting middleware for FastAPI backed by Redis Cluster with sub-millisecond overhead."
      }
    ],
    education: [
      {
        degree: "B.E. in Computer Engineering",
        institution: "Example Engineering College",
        year: "2015 – 2019"
      }
    ],
    skills: [
      {
        category: "Languages & Frameworks",
        items: "Python 3.12, FastAPI, Django, Flask, AsyncIO, PyTest"
      },
      {
        category: "Databases & Messaging",
        items: "PostgreSQL, Redis, MongoDB, Kafka, RabbitMQ, SQLAlchemy"
      },
      {
        category: "DevOps & Cloud",
        items: "Docker, Kubernetes, AWS (ECS, Lambda, RDS), GitHub Actions, Linux"
      }
    ],
    certifications: [
      {
        title: "PCEP – Certified Entry-Level Python Programmer",
        issuer: "Python Institute",
        year: "2020"
      },
      {
        title: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        year: "2023"
      }
    ]
  },

  "php-developer": {
    fullName: "PHP Developer Example",
    jobTitle: "Full Stack PHP / Laravel Developer",
    email: "php.sample@example.com",
    phone: "+91 98000 00003",
    location: "City, State",
    linkedin: "linkedin.com/in/php-example",
    github: "github.com/php-example",
    summary: "Full Stack Web Developer with 5+ years of expertise in PHP, Laravel ecosystem, MySQL database architecture, and REST API development for multi-tenant SaaS and enterprise e-commerce platforms.",
    template: "modern-split",
    color: "#e11d48",
    pageSize: "a4",
    margin: "standard",
    fontSize: "base",
    lineHeight: "normal",
    experience: [
      {
        position: "Lead Laravel Developer",
        company: "Example Web Solutions",
        location: "City, State",
        start: "2021 – Present",
        bullets: "Led development of a multi-tenant B2B marketplace handling $1.5M in monthly transactions using Laravel 11 and Livewire.\nIntegrated Razorpay, Stripe, and PayPal payment gateways with automated webhook event recovery mechanisms.\nOptimized MySQL queries using EXPLAIN and multi-level caching via Redis, boosting page speed by 40%."
      },
      {
        position: "PHP Developer",
        company: "Sample IT Services",
        location: "City, State",
        start: "2019 – 2021",
        bullets: "Built custom REST APIs and webhook integrations for third-party shipping APIs like Shiprocket and Delhivery.\nCreated responsive admin control panels with modern Blade templates and Tailwind CSS."
      }
    ],
    projects: [
      {
        title: "SaaS Subscription & Invoicing Engine",
        link: "github.com/php-example/billing-package",
        bullets: "Developed an open-source Laravel package for managing recurring subscriptions, metered usage, and PDF invoice generation."
      }
    ],
    education: [
      {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Example State University",
        year: "2016 – 2019"
      }
    ],
    skills: [
      {
        category: "Backend & Web",
        items: "PHP 8+, Laravel, Livewire, RESTful APIs, OOP, MVC, Composer"
      },
      {
        category: "Frontend & DB",
        items: "JavaScript (ES6+), Vue.js, Tailwind CSS, MySQL, Redis"
      },
      {
        category: "Server & Tools",
        items: "Nginx, Apache, Git, Docker, Forge, Linux Ubuntu Server"
      }
    ],
    certifications: [
      {
        title: "Certified Laravel Developer",
        issuer: "Laravel Certification",
        year: "2023"
      }
    ]
  },

  "java-developer": {
    fullName: "Java Developer Example",
    jobTitle: "Senior Java Software Engineer",
    email: "java.sample@example.com",
    phone: "+91 98000 00004",
    location: "City, State",
    linkedin: "linkedin.com/in/java-example",
    github: "github.com/java-example",
    summary: "Senior Java Developer with 6+ years of specialized experience in Spring Boot, Kafka, event-driven microservices, and distributed transaction management for high-concurrency banking systems.",
    template: "executive",
    color: "#ea580c",
    pageSize: "a4",
    margin: "standard",
    fontSize: "base",
    lineHeight: "normal",
    experience: [
      {
        position: "Senior Java Software Engineer",
        company: "Example Financial Technologies",
        location: "City, State",
        start: "2021 – Present",
        bullets: "Designed and implemented microservices using Spring Boot and Spring Cloud, processing 4M+ daily transactions.\nEngineered distributed asynchronous event streaming with Apache Kafka and Schema Registry, ensuring zero message loss.\nImplemented JUnit 5 and Mockito test suites, achieving 88% overall code test coverage."
      },
      {
        position: "Java Developer",
        company: "Sample Infotech Ltd",
        location: "City, State",
        start: "2018 – 2021",
        bullets: "Migrated legacy monolith Java EE apps to Spring Boot microservices deployed on Kubernetes clusters.\nOptimized Hibernate JPA queries and tuned JVM garbage collection parameters, reducing CPU spikes by 25%."
      }
    ],
    projects: [
      {
        title: "Distributed Transaction Saga Coordinator",
        link: "github.com/java-example/saga-pattern",
        bullets: "Implemented an event-driven Saga pattern using Spring Boot and Kafka for ensuring eventual consistency in distributed systems."
      }
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "Example Institute of Technology",
        year: "2014 – 2018"
      }
    ],
    skills: [
      {
        category: "Core & Frameworks",
        items: "Java 17/21, Spring Boot, Spring Cloud, Hibernate JPA, Microservices"
      },
      {
        category: "Messaging & Data",
        items: "Apache Kafka, RabbitMQ, PostgreSQL, Oracle DB, Redis"
      },
      {
        category: "Architecture & DevOps",
        items: "Docker, Kubernetes, Jenkins, Maven, Gradle, RESTful APIs, Git"
      }
    ],
    certifications: [
      {
        title: "Oracle Certified Professional: Java SE 11 Developer",
        issuer: "Oracle",
        year: "2021"
      },
      {
        title: "Spring Certified Professional",
        issuer: "VMware Tanzu",
        year: "2023"
      }
    ]
  },

  "driver": {
    fullName: "Commercial Driver Example",
    jobTitle: "Professional Commercial & Heavy Vehicle Driver",
    email: "driver.sample@example.com",
    phone: "+91 98000 00005",
    location: "City, State",
    linkedin: "linkedin.com/in/driver-example",
    github: "",
    summary: "Reliable, safety-certified Professional Commercial Driver with 8+ years of experience in long-haul freight, inter-city transport, and time-critical urban delivery. 100% accident-free record with advanced route navigation and proactive vehicle maintenance skills.",
    template: "minimalist",
    color: "#1e293b",
    pageSize: "a4",
    margin: "standard",
    fontSize: "base",
    lineHeight: "normal",
    experience: [
      {
        position: "Senior Heavy Commercial Vehicle (HCV) Driver",
        company: "Example Logistics Fleet Ltd",
        location: "Highway Route Services",
        start: "2020 – Present",
        bullets: "Transported high-value commercial shipments over 250,000+ safe kilometers across national highways with zero cargo damage.\nConducted pre-trip and post-trip technical vehicle inspections (brakes, tires, fluids, cargo securing).\nUtilized GPS navigation and telematics systems to avoid congestions and achieve 98.5% on-time delivery rate."
      },
      {
        position: "Fleet Delivery Driver",
        company: "Sample Roadways & Transport",
        location: "City, State",
        start: "2016 – 2020",
        bullets: "Delivered sensitive medical and industrial supplies across 30+ regional hubs weekly under tight delivery deadlines.\nMaintained precise logbooks, toll vouchers, and delivery verification documentation in compliance with RTO guidelines."
      }
    ],
    projects: [],
    education: [
      {
        degree: "Senior Secondary School Certificate (10+2)",
        institution: "Example Public School",
        year: "2015"
      }
    ],
    skills: [
      {
        category: "Driving & Operations",
        items: "Heavy Commercial Vehicles (HCV), Multi-Axle Trucks, Long-Haul Logistics, Defensive Driving"
      },
      {
        category: "Maintenance & Compliance",
        items: "Preventative Maintenance, Cargo Strapping, RTO Regulatory Compliance, Emergency Roadside Repairs"
      },
      {
        category: "Navigation & Tech",
        items: "GPS Fleet Management, Route Optimization, Digital Manifesting, On-Time Delivery Tracking"
      }
    ],
    certifications: [
      {
        title: "Commercial Heavy Vehicle Driving License (HMV & Commercial Transport)",
        issuer: "Regional Transport Office (RTO)",
        year: "2016"
      },
      {
        title: "Defensive Driving & Hazardous Materials (HazMat) Safety Certificate",
        issuer: "National Safety Training Council",
        year: "2022"
      }
    ]
  },

  "warehouse-worker": {
    fullName: "Warehouse Associate Example",
    jobTitle: "Warehouse & Inventory Operations Associate",
    email: "warehouse.sample@example.com",
    phone: "+91 98000 00006",
    location: "City, State",
    linkedin: "linkedin.com/in/warehouse-example",
    github: "",
    summary: "Punctual, safety-conscious Warehouse Operations Associate with 4+ years of hands-on experience in high-volume e-commerce fulfillment centers. Certified Forklift Operator skilled in barcode scanning, stock audits, palletizing, and OSHA-compliant handling.",
    template: "compact",
    color: "#059669",
    pageSize: "a4",
    margin: "compact",
    fontSize: "base",
    lineHeight: "tight",
    experience: [
      {
        position: "Senior Warehouse Associate",
        company: "Example Fulfillment Center",
        location: "City, State",
        start: "2022 – Present",
        bullets: "Processed, picked, and packed 650+ items per shift with 99.8% order accuracy rate during peak sales periods.\nOperated reach trucks, pallet jacks, and counterbalanced forklifts safely in tight warehouse aisles.\nPerformed daily cycle counts and reconciliation audits using handheld RF scanners, reducing inventory variance by 18%."
      },
      {
        position: "Inbound Material Handler",
        company: "Sample Logistics Warehousing",
        location: "City, State",
        start: "2020 – 2022",
        bullets: "Unloaded incoming shipping containers, inspected goods for transit defects, and logged manifest data into WMS software.\nOrganized bin storage according to SKU frequency and weight regulations to optimize picking paths."
      }
    ],
    projects: [],
    education: [
      {
        degree: "Secondary School Examination (10th)",
        institution: "Example Secondary School Board",
        year: "2018"
      }
    ],
    skills: [
      {
        category: "Warehouse Operations",
        items: "Order Picking & Packing, RF Barcode Scanning, Pallet Stacking, Shipping & Receiving"
      },
      {
        category: "Equipment & Safety",
        items: "Forklift Operation, Electric Pallet Jacks, Reach Trucks, PPE Compliance, Ergonomic Lifting"
      },
      {
        category: "Software & Logistics",
        items: "Warehouse Management Systems (WMS), Inventory Cycle Counting, FIFO Principles"
      }
    ],
    certifications: [
      {
        title: "Certified Industrial Forklift Operator",
        issuer: "National Logistics Institute",
        year: "2021"
      },
      {
        title: "Occupational Workplace Safety & First Aid",
        issuer: "Workplace Safety Council",
        year: "2023"
      }
    ]
  },

  "operations-manager": {
    fullName: "Operations Manager Example",
    jobTitle: "Operations & Business Process Manager",
    email: "operations.sample@example.com",
    phone: "+91 98000 00007",
    location: "City, State",
    linkedin: "linkedin.com/in/operations-example",
    github: "",
    summary: "Strategic, metric-driven Operations Manager with 7+ years of experience leading cross-functional teams, reducing operational costs by 22%, and scaling supply chain workflows in fast-growth corporate environments.",
    template: "executive",
    color: "#1e293b",
    pageSize: "a4",
    margin: "standard",
    fontSize: "base",
    lineHeight: "normal",
    experience: [
      {
        position: "Operations Manager",
        company: "Example Corporate Logistics",
        location: "City, State",
        start: "2021 – Present",
        bullets: "Oversaw day-to-day operations for 4 regional fulfillment centers, managing 85+ full-time employees and third-party vendors.\nImplemented Lean Six Sigma workflow adjustments that trimmed order fulfillment lead times from 48 hours to 18 hours.\nControlled annual departmental operating budget of $2.4M, cutting operational overhead expenses by 18% over two fiscal years."
      },
      {
        position: "Assistant Operations Manager",
        company: "Sample Business Enterprises",
        location: "City, State",
        start: "2017 – 2021",
        bullets: "Designed standard operating procedures (SOPs) and KPI performance scorecards for customer dispatch units.\nAnalyzed operational bottlenecks using Power BI dashboards, improving team SLA fulfillment from 89% to 98%."
      }
    ],
    projects: [
      {
        title: "Enterprise Fleet Route Optimization Initiative",
        link: "",
        bullets: "Spearheaded an enterprise telemetry tracking migration that eliminated duplicate dispatch routes and reduced monthly fleet fuel costs by 14%."
      }
    ],
    education: [
      {
        degree: "Master of Business Administration (MBA - Operations)",
        institution: "Example Business School",
        year: "2015 – 2017"
      },
      {
        degree: "Bachelor of Business Administration (BBA)",
        institution: "Example University",
        year: "2012 – 2015"
      }
    ],
    skills: [
      {
        category: "Management & Strategy",
        items: "Operations Management, Budgeting & P&L, Lean Six Sigma, Cross-functional Leadership, Vendor Relations"
      },
      {
        category: "Analytics & Tools",
        items: "Power BI, Tableau, Advanced Excel, ERP (SAP / Oracle NetSuite), Asana, JIRA"
      },
      {
        category: "Process Improvement",
        items: "SOP Development, Supply Chain Optimization, SLA Tracking, Risk Mitigation"
      }
    ],
    certifications: [
      {
        title: "Six Sigma Green Belt (SSGB)",
        issuer: "ASQ - Quality Standards Council",
        year: "2020"
      },
      {
        title: "Project Management Professional (PMP)",
        issuer: "Project Management Institute (PMI)",
        year: "2023"
      }
    ]
  }
};

// Default fallback data (Generic Placeholder)
const defaultData = sampleProfiles["network-engineer"];

let resumeData = JSON.parse(JSON.stringify(defaultData));
let currentZoom = 1;

const setValue = (id, val) => {
  const el = document.getElementById(id);
  if (el) el.value = val || "";
};

// Real-time ATS Parser & Scoring Engine
function calculateATSScore() {
  let score = 40; // Base score
  if (resumeData.fullName && resumeData.fullName.trim().length > 2) score += 10;
  if (resumeData.email && resumeData.email.includes("@")) score += 10;
  if (resumeData.phone && resumeData.phone.trim().length > 6) score += 10;
  if (resumeData.summary && resumeData.summary.trim().split(/\s+/).length > 20) score += 10;
  if (resumeData.experience && resumeData.experience.length >= 1) score += 10;
  if (resumeData.skills && resumeData.skills.length >= 2) score += 5;
  if (resumeData.education && resumeData.education.length >= 1) score += 5;

  const badge = document.getElementById("atsScoreText");
  if (badge) {
    badge.textContent = `ATS Score: ${Math.min(score, 100)}/100`;
  }
}

function renderExperienceEditor() {
  const el = document.getElementById("experienceList");
  if (!el) return;
  el.innerHTML = "";
  (resumeData.experience || []).forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <div class="dynamic-item-header">
        <strong>Position ${idx + 1}</strong>
        <button type="button" class="remove-btn" data-action="remove" data-section="experience" data-index="${idx}" title="Delete Position">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="form-grid">
        <div>
          <label>Job Title</label>
          <input type="text" data-section="experience" data-index="${idx}" data-field="position" value="${escapeHTML(item.position || "")}">
        </div>
        <div>
          <label>Company</label>
          <input type="text" data-section="experience" data-index="${idx}" data-field="company" value="${escapeHTML(item.company || "")}">
        </div>
        <div>
          <label>Location</label>
          <input type="text" data-section="experience" data-index="${idx}" data-field="location" value="${escapeHTML(item.location || "")}">
        </div>
        <div>
          <label>Dates (e.g. 2023 – Present)</label>
          <input type="text" data-section="experience" data-index="${idx}" data-field="start" value="${escapeHTML(item.start || "")}">
        </div>
        <div class="field full">
          <label>Bullet Points (One action verb per line)</label>
          <textarea rows="3" data-section="experience" data-index="${idx}" data-field="bullets">${escapeHTML(item.bullets || "")}</textarea>
        </div>
      </div>
    `;
    el.appendChild(div);
  });
}

function renderEducationEditor() {
  const el = document.getElementById("educationList");
  if (!el) return;
  el.innerHTML = "";
  (resumeData.education || []).forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <div class="dynamic-item-header">
        <strong>Degree ${idx + 1}</strong>
        <button type="button" class="remove-btn" data-action="remove" data-section="education" data-index="${idx}" title="Delete Education">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="form-grid">
        <div class="field full">
          <label>Degree</label>
          <input type="text" data-section="education" data-index="${idx}" data-field="degree" value="${escapeHTML(item.degree || "")}">
        </div>
        <div>
          <label>School / University</label>
          <input type="text" data-section="education" data-index="${idx}" data-field="institution" value="${escapeHTML(item.institution || "")}">
        </div>
        <div>
          <label>Year</label>
          <input type="text" data-section="education" data-index="${idx}" data-field="year" value="${escapeHTML(item.year || "")}">
        </div>
      </div>
    `;
    el.appendChild(div);
  });
}

function renderSkillsEditor() {
  const el = document.getElementById("skillsList");
  if (!el) return;
  el.innerHTML = "";
  (resumeData.skills || []).forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <div class="dynamic-item-header">
        <strong>Skill Category ${idx + 1}</strong>
        <button type="button" class="remove-btn" data-action="remove" data-section="skills" data-index="${idx}" title="Delete Category">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="form-grid">
        <div>
          <label>Category Name</label>
          <input type="text" data-section="skills" data-index="${idx}" data-field="category" value="${escapeHTML(item.category || "")}">
        </div>
        <div>
          <label>Skills (Comma-separated)</label>
          <input type="text" data-section="skills" data-index="${idx}" data-field="items" value="${escapeHTML(item.items || "")}">
        </div>
      </div>
    `;
    el.appendChild(div);
  });
}

function renderProjectsEditor() {
  const el = document.getElementById("projectsList");
  if (!el) return;
  el.innerHTML = "";
  (resumeData.projects || []).forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <div class="dynamic-item-header">
        <strong>Project ${idx + 1}</strong>
        <button type="button" class="remove-btn" data-action="remove" data-section="projects" data-index="${idx}" title="Delete Project">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="form-grid">
        <div>
          <label>Project Name</label>
          <input type="text" data-section="projects" data-index="${idx}" data-field="title" value="${escapeHTML(item.title || "")}">
        </div>
        <div>
          <label>Repo / Live URL</label>
          <input type="text" data-section="projects" data-index="${idx}" data-field="link" value="${escapeHTML(item.link || "")}">
        </div>
        <div class="field full">
          <label>Bullet Points</label>
          <textarea rows="2" data-section="projects" data-index="${idx}" data-field="bullets">${escapeHTML(item.bullets || "")}</textarea>
        </div>
      </div>
    `;
    el.appendChild(div);
  });
}

function renderCertificationsEditor() {
  const el = document.getElementById("certificationsList");
  if (!el) return;
  el.innerHTML = "";
  (resumeData.certifications || []).forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <div class="dynamic-item-header">
        <strong>Certification ${idx + 1}</strong>
        <button type="button" class="remove-btn" data-action="remove" data-section="certifications" data-index="${idx}" title="Delete Certification">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="form-grid">
        <div class="field full">
          <label>Certification Name</label>
          <input type="text" data-section="certifications" data-index="${idx}" data-field="title" value="${escapeHTML(item.title || "")}">
        </div>
        <div>
          <label>Issuer Organization</label>
          <input type="text" data-section="certifications" data-index="${idx}" data-field="issuer" value="${escapeHTML(item.issuer || "")}">
        </div>
        <div>
          <label>Year</label>
          <input type="text" data-section="certifications" data-index="${idx}" data-field="year" value="${escapeHTML(item.year || "")}">
        </div>
      </div>
    `;
    el.appendChild(div);
  });
}

function renderAllEditors() {
  renderExperienceEditor();
  renderEducationEditor();
  renderSkillsEditor();
  renderProjectsEditor();
  renderCertificationsEditor();
}

function applyTemplateAndStyles() {
  const resume = document.getElementById("resume");
  if (!resume) return;

  // Apply template & typography dynamic classes
  resume.className = `resume template-${resumeData.template || "harvard"} margin-${resumeData.margin || "standard"} size-${resumeData.pageSize || "a4"} font-${resumeData.fontSize || "base"} leading-${resumeData.lineHeight || "normal"}`;

  // Theme Color Variable
  document.documentElement.style.setProperty("--primary", resumeData.color || "#0f172a");
}

function updatePreview() {
  applyTemplateAndStyles();

  // Header Details
  const nameEl = document.getElementById("previewName");
  const titleEl = document.getElementById("previewTitle");
  if (nameEl) nameEl.textContent = resumeData.fullName || "Candidate Name";
  if (titleEl) titleEl.textContent = resumeData.jobTitle || "Target Role / Title";

  // Contact Info Strip
  const contacts = [];
  if (resumeData.email) contacts.push(`<span><i class="fa-solid fa-envelope"></i> ${escapeHTML(resumeData.email)}</span>`);
  if (resumeData.phone) contacts.push(`<span><i class="fa-solid fa-phone"></i> ${escapeHTML(resumeData.phone)}</span>`);
  if (resumeData.location) contacts.push(`<span><i class="fa-solid fa-location-dot"></i> ${escapeHTML(resumeData.location)}</span>`);
  if (resumeData.linkedin) contacts.push(`<span><i class="fa-brands fa-linkedin"></i> ${escapeHTML(resumeData.linkedin)}</span>`);
  if (resumeData.github) contacts.push(`<span><i class="fa-brands fa-github"></i> ${escapeHTML(resumeData.github)}</span>`);

  const contactEl = document.getElementById("previewContact");
  if (contactEl) contactEl.innerHTML = contacts.join("");

  // Professional Summary
  const summaryText = resumeData.summary || "";
  const summaryEl = document.getElementById("previewSummary");
  const summarySec = document.getElementById("summarySection");
  if (summaryEl) summaryEl.textContent = summaryText;
  if (summarySec) summarySec.style.display = summaryText.trim() ? "block" : "none";

  // Experience
  const expEl = document.getElementById("previewExperience");
  const expSec = document.getElementById("experienceSection");
  if (expEl && expSec) {
    if (resumeData.experience && resumeData.experience.length > 0) {
      expSec.style.display = "block";
      expEl.innerHTML = resumeData.experience
        .map((exp) => {
          const bullets = (exp.bullets || "")
            .split("\n")
            .map((b) => b.trim())
            .filter((b) => b.length > 0)
            .map((b) => `<li>${escapeHTML(b.replace(/^•\s*/, ""))}</li>`)
            .join("");

          return `
            <div class="ats-entry">
              <div class="ats-entry-header">
                <strong>${escapeHTML(exp.position || "Position")}</strong>
                <span>${escapeHTML(exp.start || "")}</span>
              </div>
              <div class="ats-entry-sub">
                <span>${escapeHTML(exp.company || "Company")}${exp.location ? " &bull; " + escapeHTML(exp.location) : ""}</span>
              </div>
              ${bullets ? `<ul class="ats-bullet-list">${bullets}</ul>` : ""}
            </div>
          `;
        })
        .join("");
    } else {
      expSec.style.display = "none";
    }
  }

  // Projects
  const projEl = document.getElementById("previewProjects");
  const projSec = document.getElementById("projectsSection");
  if (projEl && projSec) {
    if (resumeData.projects && resumeData.projects.length > 0) {
      projSec.style.display = "block";
      projEl.innerHTML = resumeData.projects
        .map((prj) => {
          const bullets = (prj.bullets || "")
            .split("\n")
            .map((b) => b.trim())
            .filter((b) => b.length > 0)
            .map((b) => `<li>${escapeHTML(b.replace(/^•\s*/, ""))}</li>`)
            .join("");

          return `
            <div class="ats-entry">
              <div class="ats-entry-header">
                <strong>${escapeHTML(prj.title || "Project")}</strong>
                <span>${escapeHTML(prj.link || "")}</span>
              </div>
              ${bullets ? `<ul class="ats-bullet-list">${bullets}</ul>` : ""}
            </div>
          `;
        })
        .join("");
    } else {
      projSec.style.display = "none";
    }
  }

  // Education
  const eduEl = document.getElementById("previewEducation");
  const eduSec = document.getElementById("educationSection");
  if (eduEl && eduSec) {
    if (resumeData.education && resumeData.education.length > 0) {
      eduSec.style.display = "block";
      eduEl.innerHTML = resumeData.education
        .map(
          (edu) => `
            <div class="ats-entry">
              <div class="ats-entry-header">
                <strong>${escapeHTML(edu.degree || "Degree")}</strong>
                <span>${escapeHTML(edu.year || "")}</span>
              </div>
              <div class="ats-entry-sub">
                <span>${escapeHTML(edu.institution || "University")}</span>
              </div>
            </div>
          `
        )
        .join("");
    } else {
      eduSec.style.display = "none";
    }
  }

  // Skills
  const skillsEl = document.getElementById("previewSkills");
  const skillsSec = document.getElementById("skillsSection");
  if (skillsEl && skillsSec) {
    if (resumeData.skills && resumeData.skills.length > 0) {
      skillsSec.style.display = "block";
      skillsEl.innerHTML = resumeData.skills
        .map(
          (skl) => `
            <div class="ats-skill-line">
              <strong>${escapeHTML(skl.category || "Skills")}:</strong> ${escapeHTML(skl.items || "")}
            </div>
          `
        )
        .join("");
    } else {
      skillsSec.style.display = "none";
    }
  }

  // Certifications
  const certEl = document.getElementById("previewCertifications");
  const certSec = document.getElementById("certificationSection");
  if (certEl && certSec) {
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      certSec.style.display = "block";
      certEl.innerHTML = resumeData.certifications
        .map(
          (crt) => `
            <div class="ats-entry" style="margin-bottom: 4px;">
              <div class="ats-entry-header">
                <strong>${escapeHTML(crt.title || "Certification")}</strong>
                <span>${escapeHTML(crt.year || "")}</span>
              </div>
              <div class="ats-entry-sub">
                <span>${escapeHTML(crt.issuer || "")}</span>
              </div>
            </div>
          `
        )
        .join("");
    } else {
      certSec.style.display = "none";
    }
  }

  calculateATSScore();
}

function triggerHighDefPrint() {
  const origTitle = document.title;
  const safeName = (resumeData.fullName || "Candidate").replace(/[^a-zA-Z0-9]/g, "_");
  document.title = `${safeName}_Resume`;

  const resumeEl = document.getElementById("resume");
  if (resumeEl) resumeEl.style.transform = "none";

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => window.print());
  } else {
    window.print();
  }

  setTimeout(() => {
    document.title = origTitle;
    applyZoom();
  }, 1000);
}

function saveData() {
  try {
    localStorage.setItem("jobcv-data-v6", JSON.stringify(resumeData));
    const status = document.getElementById("saveStatus");
    if (status) {
      status.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Auto-saved</span>';
      status.style.opacity = "1";
    }
  } catch (err) {}
}

function loadFormData() {
  setValue("fullName", resumeData.fullName);
  setValue("jobTitle", resumeData.jobTitle);
  setValue("email", resumeData.email);
  setValue("phone", resumeData.phone);
  setValue("location", resumeData.location);
  setValue("linkedin", resumeData.linkedin);
  setValue("github", resumeData.github);
  setValue("summary", resumeData.summary);

  setValue("templateSelect", resumeData.template || "harvard");
  setValue("pageSizeSelect", resumeData.pageSize || "a4");
  setValue("marginSelect", resumeData.margin || "standard");
  setValue("fontSizeSelect", resumeData.fontSize || "base");
  setValue("lineHeightSelect", resumeData.lineHeight || "normal");

  $$(".color-choice").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.color === resumeData.color);
  });
}

function applyZoom() {
  const resume = document.getElementById("resume");
  const zoomText = document.getElementById("zoomLevel");
  if (resume) {
    resume.style.transform = `scale(${currentZoom})`;
    resume.style.transformOrigin = "top center";
  }
  if (zoomText) {
    zoomText.textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

// Preset Role Switcher
document.getElementById("jobSampleSelect")?.addEventListener("change", (e) => {
  const key = e.target.value;
  if (!sampleProfiles[key]) return;

  if (confirm(`Do you want to load the pre-filled template for "${e.target.options[e.target.selectedIndex].text}"? Current unsaved edits will be replaced.`)) {
    resumeData = JSON.parse(JSON.stringify(sampleProfiles[key]));
    loadFormData();
    renderAllEditors();
    updatePreview();
    saveData();
  }
});

// Global Event Handlers
document.addEventListener("input", (e) => {
  const t = e.target;
  if (!t) return;

  if (["fullName", "jobTitle", "email", "phone", "location", "linkedin", "github", "summary"].includes(t.id)) {
    resumeData[t.id] = t.value;
    updatePreview();
    saveData();
    return;
  }

  const { section, index, field } = t.dataset;
  if (section && index !== undefined && field) {
    const idx = Number(index);
    if (resumeData[section] && resumeData[section][idx]) {
      resumeData[section][idx][field] = t.value;
      updatePreview();
      saveData();
    }
  }
});

document.addEventListener("change", (e) => {
  const t = e.target;
  if (!t) return;

  if (["templateSelect", "pageSizeSelect", "marginSelect", "fontSizeSelect", "lineHeightSelect"].includes(t.id)) {
    const map = {
      templateSelect: "template",
      pageSizeSelect: "pageSize",
      marginSelect: "margin",
      fontSizeSelect: "fontSize",
      lineHeightSelect: "lineHeight"
    };
    resumeData[map[t.id]] = t.value;
    updatePreview();
    saveData();
  }
});

document.addEventListener("click", (e) => {
  const t = e.target;
  if (!t) return;

  const removeBtn = t.closest("button[data-action='remove']");
  if (removeBtn) {
    const { section, index } = removeBtn.dataset;
    const idx = Number(index);
    if (resumeData[section] && resumeData[section][idx] !== undefined) {
      resumeData[section].splice(idx, 1);
      renderAllEditors();
      updatePreview();
      saveData();
    }
    return;
  }

  const colorChoice = t.closest(".color-choice");
  if (colorChoice) {
    resumeData.color = colorChoice.dataset.color;
    $$(".color-choice").forEach((c) => c.classList.remove("active"));
    colorChoice.classList.add("active");
    updatePreview();
    saveData();
    return;
  }
});

// Add Item Buttons
document.getElementById("addExperience")?.addEventListener("click", () => {
  if (!resumeData.experience) resumeData.experience = [];
  resumeData.experience.push({ position: "", company: "", location: "", start: "2024 – Present", bullets: "" });
  renderExperienceEditor();
  updatePreview();
  saveData();
});

document.getElementById("addEducation")?.addEventListener("click", () => {
  if (!resumeData.education) resumeData.education = [];
  resumeData.education.push({ degree: "", institution: "", year: "2024" });
  renderEducationEditor();
  updatePreview();
  saveData();
});

document.getElementById("addSkill")?.addEventListener("click", () => {
  if (!resumeData.skills) resumeData.skills = [];
  resumeData.skills.push({ category: "Tools & Technologies", items: "" });
  renderSkillsEditor();
  updatePreview();
  saveData();
});

document.getElementById("addProject")?.addEventListener("click", () => {
  if (!resumeData.projects) resumeData.projects = [];
  resumeData.projects.push({ title: "", link: "", bullets: "" });
  renderProjectsEditor();
  updatePreview();
  saveData();
});

document.getElementById("addCertification")?.addEventListener("click", () => {
  if (!resumeData.certifications) resumeData.certifications = [];
  resumeData.certifications.push({ title: "", issuer: "", year: "2024" });
  renderCertificationsEditor();
  updatePreview();
  saveData();
});

// Zoom Button Listeners
document.getElementById("zoomInBtn")?.addEventListener("click", () => {
  if (currentZoom < 1.3) {
    currentZoom += 0.1;
    applyZoom();
  }
});

document.getElementById("zoomOutBtn")?.addEventListener("click", () => {
  if (currentZoom > 0.6) {
    currentZoom -= 0.1;
    applyZoom();
  }
});

// Reset & Print
document.getElementById("clearBtn")?.addEventListener("click", () => {
  if (confirm("Reset to clean standard sample template?")) {
    localStorage.removeItem("jobcv-data-v6");
    resumeData = JSON.parse(JSON.stringify(defaultData));
    const roleSelect = document.getElementById("jobSampleSelect");
    if (roleSelect) roleSelect.value = "network-engineer";
    loadFormData();
    renderAllEditors();
    updatePreview();
  }
});

document.getElementById("mainPrintBtn")?.addEventListener("click", triggerHighDefPrint);
document.getElementById("previewPrintBtn")?.addEventListener("click", triggerHighDefPrint);

// Initialize Application
function initialize() {
  try {
    const saved = localStorage.getItem("jobcv-data-v6");
    if (saved) {
      const parsed = JSON.parse(saved);
      resumeData = { ...defaultData, ...parsed };
    }
  } catch (err) {
    resumeData = JSON.parse(JSON.stringify(defaultData));
  }
  loadFormData();
  renderAllEditors();
  updatePreview();
  applyZoom();
}

initialize();
