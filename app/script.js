const $ = (e) => document.querySelector(e); const $$ = (e) => [...document.querySelectorAll(e)];

const escapeHTML = (e = "") =>
  String(e)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const defaultData = {
  fullName: "John Doe",
  jobTitle: "Senior Systems & Cloud Engineer",
  email: "candidate@example.com",
  phone: "+1 (555) 019-2834",
  location: "Chandigarh, India",
  linkedin: "linkedin.com/in/example",
  github: "github.com/example",
  summary:
    "Results-driven Systems Engineer with 4+ years of experience managing enterprise hybrid-cloud networks and Linux infrastructure. Proven track record in BGP/OSPF routing, automated configuration audits, and reducing critical incident response times by 35%.",
  template: "harvard",
  color: "#0f172a",
  pageSize: "a4",
  margin: "standard",
  fontSize: "base",
  lineHeight: "normal",
  experience: [
    {
      position: "Senior Systems Engineer",
      company: "Tech Systems Solutions",
      location: "Mohali, India",
      start: "June 2023 – Present",
      bullets:
        "Architected enterprise SD-WAN routing across 14 branch offices, cutting network latency by 28%.\nManaged multi-vendor firewall rules and automated nightly configuration backups with Ansible.\nCollaborated with DevOps teams to deploy scalable AWS VPCs using Terraform."
    },
    {
      position: "Network Support Engineer",
      company: "Global Infrastructure Ltd",
      location: "Noida, India",
      start: "Aug 2021 – May 2023",
      bullets:
        "Resolved Level 2 and Level 3 escalations, maintaining 99.8% SLA adherence for high-traffic servers.\nMonitored critical server bandwidth using Wireshark and configured site-to-site IPsec VPN tunnels."
    }
  ],
  projects: [
    {
      title: "Automated Network Backup & Compliance Engine",
      link: "github.com/example/network-backup-bot",
      bullets:
        "Developed a Python CLI utility using Netmiko to pull running configurations from 40+ Cisco switches nightly.\nEncrypted and transferred backups to AWS S3 with automated Slack failure alerting."
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Punjab Technical University",
      year: "2017 – 2021"
    }
  ],
  skills: [
    {
      category: "Networking & Cloud",
      items: "Cisco Routing & Switching, BGP, OSPF, AWS (VPC, EC2, S3), IPsec VPN"
    },
    {
      category: "Automation & Scripting",
      items: "Python, Bash, Ansible, Terraform, Git, Linux Administration"
    },
    {
      category: "Security & Monitoring",
      items: "Palo Alto Firewalls, Fortinet, Wireshark, PRTG Network Monitor"
    }
  ],
  certifications: [
    {
      title: "Cisco Certified Network Associate (CCNA 200-301)",
      issuer: "Cisco Systems",
      year: "2022"
    },
    {
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      year: "2024"
    }
  ]
};

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

  // Reset & apply base classes
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

  // Scale reset for clear vector output
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
  resumeData.experience.push({ position: "", company: "", location: "", start: "2024 – Present", bullets: "" });
  renderExperienceEditor();
  updatePreview();
  saveData();
});

document.getElementById("addEducation")?.addEventListener("click", () => {
  resumeData.education.push({ degree: "", institution: "", year: "2024" });
  renderEducationEditor();
  updatePreview();
  saveData();
});

document.getElementById("addSkill")?.addEventListener("click", () => {
  resumeData.skills.push({ category: "Tools & Technologies", items: "" });
  renderSkillsEditor();
  updatePreview();
  saveData();
});

document.getElementById("addProject")?.addEventListener("click", () => {
  resumeData.projects.push({ title: "", link: "", bullets: "" });
  renderProjectsEditor();
  updatePreview();
  saveData();
});

document.getElementById("addCertification")?.addEventListener("click", () => {
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
