/* =========================================================
   Resumora - High Precision ATS Core Logic & Bulletproof State
   ========================================================= */

const $ = (selector) => document.querySelector(selector); const $$ = (selector) => [...document.querySelectorAll(selector)];

const escapeHTML = (str = "") => {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

// 100% Verified Clean Sample Data
const defaultData = {
    fullName: "John Doe",
    jobTitle: "Senior Systems & Cloud Engineer",
    email: "candidate@example.com",
    phone: "985*****10",
    location: "Chandigarh, India",
    linkedin: "linkedin.com/in/example",
    github: "github.com/example",
    summary: "Results-driven Systems Engineer with 4+ years of experience managing enterprise hybrid-cloud networks and Linux infrastructure. Proven track record in BGP/OSPF routing, automated configuration audits, and reducing critical incident response times by 35%.",
    template: "harvard",
    color: "#0f172a",
    experience: [
        {
            position: "Senior Systems Engineer",
            company: "Tech Systems Solutions",
            location: "Mohali, India",
            start: "June 2023 – Present",
            bullets: "Architected enterprise SD-WAN routing across 14 branch offices, cutting network latency by 28%.\nManaged multi-vendor firewall rules and automated nightly configuration backups with Ansible.\nCollaborated with DevOps teams to deploy scalable AWS VPCs using Terraform."
        },
        {
            position: "Network Support Engineer",
            company: "Global Infrastructure Ltd",
            location: "Noida, India",
            start: "Aug 2021 – May 2023",
            bullets: "Resolved Level 2 and Level 3 escalations, maintaining 99.8% SLA adherence for high-traffic servers.\nMonitored critical server bandwidth using Wireshark and configured site-to-site IPsec VPN tunnels."
        }
    ],
    projects: [
        {
            title: "Automated Network Backup & Compliance Engine",
            link: "github.com/example/network-backup-bot",
            bullets: "Developed a Python CLI utility using Netmiko to pull running configurations from 40+ Cisco switches nightly.\nEncrypted and transferred backups to AWS S3 with automated Slack failure alerting."
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
        { category: "Networking & Cloud", items: "Cisco Routing & Switching, BGP, OSPF, AWS (VPC, EC2, S3), IPsec VPN" },
        { category: "Automation & Scripting", items: "Python, Bash, Ansible, Terraform, Git, Linux Administration" },
        { category: "Security & Monitoring", items: "Palo Alto Firewalls, Fortinet, Wireshark, PRTG Network Monitor" }
    ],
    certifications: [
        { title: "Cisco Certified Network Associate (CCNA 200-301)", issuer: "Cisco Systems", year: "2022" },
        { title: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" }
    ]
};

let resumeData = JSON.parse(JSON.stringify(defaultData));

const setValue = (id, val) => { 
    const el = document.getElementById(id); 
    if (el) el.value = val || ""; 
};

/* =========================================================
   FORM EDITORS RENDERING
   ========================================================= */

function renderExperienceEditor() {
    const container = document.getElementById("experienceList");
    if (!container) return;
    container.innerHTML = "";
    (resumeData.experience || []).forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Position ${index + 1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="experience" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div>
                    <label>Job Title</label>
                    <input type="text" data-section="experience" data-index="${index}" data-field="position" value="${escapeHTML(item.position || '')}">
                </div>
                <div>
                    <label>Company</label>
                    <input type="text" data-section="experience" data-index="${index}" data-field="company" value="${escapeHTML(item.company || '')}">
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" data-section="experience" data-index="${index}" data-field="location" value="${escapeHTML(item.location || '')}">
                </div>
                <div>
                    <label>Dates (e.g. 2023 – Present)</label>
                    <input type="text" data-section="experience" data-index="${index}" data-field="start" value="${escapeHTML(item.start || '')}">
                </div>
                <div class="field full">
                    <label>Bullet Points (One per line)</label>
                    <textarea rows="3" data-section="experience" data-index="${index}" data-field="bullets">${escapeHTML(item.bullets || '')}</textarea>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderEducationEditor() {
    const container = document.getElementById("educationList");
    if (!container) return;
    container.innerHTML = "";
    (resumeData.education || []).forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Degree ${index + 1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="education" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="field full">
                    <label>Degree</label>
                    <input type="text" data-section="education" data-index="${index}" data-field="degree" value="${escapeHTML(item.degree || '')}">
                </div>
                <div>
                    <label>School / University</label>
                    <input type="text" data-section="education" data-index="${index}" data-field="institution" value="${escapeHTML(item.institution || '')}">
                </div>
                <div>
                    <label>Year</label>
                    <input type="text" data-section="education" data-index="${index}" data-field="year" value="${escapeHTML(item.year || '')}">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderSkillsEditor() {
    const container = document.getElementById("skillsList");
    if (!container) return;
    container.innerHTML = "";
    (resumeData.skills || []).forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Category ${index + 1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="skills" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div>
                    <label>Category Name</label>
                    <input type="text" data-section="skills" data-index="${index}" data-field="category" value="${escapeHTML(item.category || '')}">
                </div>
                <div>
                    <label>Skills (Comma-separated)</label>
                    <input type="text" data-section="skills" data-index="${index}" data-field="items" value="${escapeHTML(item.items || '')}">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderProjectsEditor() {
    const container = document.getElementById("projectsList");
    if (!container) return;
    container.innerHTML = "";
    (resumeData.projects || []).forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Project ${index + 1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="projects" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div>
                    <label>Project Name</label>
                    <input type="text" data-section="projects" data-index="${index}" data-field="title" value="${escapeHTML(item.title || '')}">
                </div>
                <div>
                    <label>Repo / Live URL</label>
                    <input type="text" data-section="projects" data-index="${index}" data-field="link" value="${escapeHTML(item.link || '')}">
                </div>
                <div class="field full">
                    <label>Bullet Points</label>
                    <textarea rows="2" data-section="projects" data-index="${index}" data-field="bullets">${escapeHTML(item.bullets || '')}</textarea>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderCertificationsEditor() {
    const container = document.getElementById("certificationsList");
    if (!container) return;
    container.innerHTML = "";
    (resumeData.certifications || []).forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Cert ${index + 1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="certifications" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="field full">
                    <label>Certification Name</label>
                    <input type="text" data-section="certifications" data-index="${index}" data-field="title" value="${escapeHTML(item.title || '')}">
                </div>
                <div>
                    <label>Issuer</label>
                    <input type="text" data-section="certifications" data-index="${index}" data-field="issuer" value="${escapeHTML(item.issuer || '')}">
                </div>
                <div>
                    <label>Year</label>
                    <input type="text" data-section="certifications" data-index="${index}" data-field="year" value="${escapeHTML(item.year || '')}">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderAllEditors() {
    renderExperienceEditor();
    renderEducationEditor();
    renderSkillsEditor();
    renderProjectsEditor();
    renderCertificationsEditor();
}

/* =========================================================
   LIVE ATS PREVIEW ENGINE
   ========================================================= */

function applyTemplateAndColor() {
    const resume = document.getElementById("resume");
    if (!resume) return;

    resume.className = "resume";
    resume.classList.add(`template-${resumeData.template || "harvard"}`);
    document.documentElement.style.setProperty("--primary", resumeData.color || "#0f172a");
}

function updatePreview() {
    applyTemplateAndColor();

    // Identity
    const pName = document.getElementById("previewName");
    const pTitle = document.getElementById("previewTitle");
    if (pName) pName.textContent = resumeData.fullName || "Candidate Name";
    if (pTitle) pTitle.textContent = resumeData.jobTitle || "Target Role / Title";

    // Contact
    const contactParts = [];
    if (resumeData.email) contactParts.push(`<span><i class="fa-solid fa-envelope"></i> ${escapeHTML(resumeData.email)}</span>`);
    if (resumeData.phone) contactParts.push(`<span><i class="fa-solid fa-phone"></i> ${escapeHTML(resumeData.phone)}</span>`);
    if (resumeData.location) contactParts.push(`<span><i class="fa-solid fa-location-dot"></i> ${escapeHTML(resumeData.location)}</span>`);
    if (resumeData.linkedin) contactParts.push(`<span><i class="fa-brands fa-linkedin"></i> ${escapeHTML(resumeData.linkedin)}</span>`);
    if (resumeData.github) contactParts.push(`<span><i class="fa-brands fa-github"></i> ${escapeHTML(resumeData.github)}</span>`);
    
    const pContact = document.getElementById("previewContact");
    if (pContact) pContact.innerHTML = contactParts.join("");

    // Summary
    const summaryText = resumeData.summary || "";
    const pSummary = document.getElementById("previewSummary");
    const sSection = document.getElementById("summarySection");
    if (pSummary) pSummary.textContent = summaryText;
    if (sSection) sSection.style.display = summaryText.trim() ? "block" : "none";

    // Work Experience
    const pExp = document.getElementById("previewExperience");
    const expSection = document.getElementById("experienceSection");
    if (pExp && expSection) {
        if (!resumeData.experience || !resumeData.experience.length) {
            expSection.style.display = "none";
        } else {
            expSection.style.display = "block";
            pExp.innerHTML = resumeData.experience.map(exp => {
                const bullets = (exp.bullets || "")
                    .split("\n")
                    .map(b => b.trim())
                    .filter(b => b.length > 0)
                    .map(b => `<li>${escapeHTML(b.replace(/^•\s*/, ''))}</li>`)
                    .join("");

                return `
                    <div class="ats-entry">
                        <div class="ats-entry-header">
                            <strong>${escapeHTML(exp.position || "Position")}</strong>
                            <span>${escapeHTML(exp.start || "")}</span>
                        </div>
                        <div class="ats-entry-sub">
                            <span>${escapeHTML(exp.company || "Company")}${exp.location ? ' · ' + escapeHTML(exp.location) : ''}</span>
                        </div>
                        ${bullets ? `<ul class="ats-bullet-list">${bullets}</ul>` : ""}
                    </div>
                `;
            }).join("");
        }
    }

    // Projects
    const pProjects = document.getElementById("previewProjects");
    const projSection = document.getElementById("projectsSection");
    if (pProjects && projSection) {
        if (!resumeData.projects || !resumeData.projects.length) {
            projSection.style.display = "none";
        } else {
            projSection.style.display = "block";
            pProjects.innerHTML = resumeData.projects.map(proj => {
                const bullets = (proj.bullets || "")
                    .split("\n")
                    .map(b => b.trim())
                    .filter(b => b.length > 0)
                    .map(b => `<li>${escapeHTML(b.replace(/^•\s*/, ''))}</li>`)
                    .join("");

                return `
                    <div class="ats-entry">
                        <div class="ats-entry-header">
                            <strong>${escapeHTML(proj.title || "Project")}</strong>
                            <span>${escapeHTML(proj.link || "")}</span>
                        </div>
                        ${bullets ? `<ul class="ats-bullet-list">${bullets}</ul>` : ""}
                    </div>
                `;
            }).join("");
        }
    }

    // Education
    const pEdu = document.getElementById("previewEducation");
    const eduSection = document.getElementById("educationSection");
    if (pEdu && eduSection) {
        if (!resumeData.education || !resumeData.education.length) {
            eduSection.style.display = "none";
        } else {
            eduSection.style.display = "block";
            pEdu.innerHTML = resumeData.education.map(edu => `
                <div class="ats-entry">
                    <div class="ats-entry-header">
                        <strong>${escapeHTML(edu.degree || "Degree")}</strong>
                        <span>${escapeHTML(edu.year || "")}</span>
                    </div>
                    <div class="ats-entry-sub">
                        <span>${escapeHTML(edu.institution || "University")}</span>
                    </div>
                </div>
            `).join("");
        }
    }

    // Skills
    const pSkills = document.getElementById("previewSkills");
    const skillsSection = document.getElementById("skillsSection");
    if (pSkills && skillsSection) {
        if (!resumeData.skills || !resumeData.skills.length) {
            skillsSection.style.display = "none";
        } else {
            skillsSection.style.display = "block";
            pSkills.innerHTML = resumeData.skills.map(sk => `
                <div class="ats-skill-line">
                    <strong>${escapeHTML(sk.category || "Skills")}:</strong> ${escapeHTML(sk.items || "")}
                </div>
            `).join("");
        }
    }

    // Certifications
    const pCert = document.getElementById("previewCertifications");
    const certSection = document.getElementById("certificationSection");
    if (pCert && certSection) {
        if (!resumeData.certifications || !resumeData.certifications.length) {
            certSection.style.display = "none";
        } else {
            certSection.style.display = "block";
            pCert.innerHTML = resumeData.certifications.map(c => `
                <div class="ats-entry" style="margin-bottom: 4px;">
                    <div class="ats-entry-header">
                        <strong>${escapeHTML(c.title || "Certification")}</strong>
                        <span>${escapeHTML(c.year || "")}</span>
                    </div>
                    <div class="ats-entry-sub">
                        <span>${escapeHTML(c.issuer || "")}</span>
                    </div>
                </div>
            `).join("");
        }
    }
}

/* =========================================================
   EVENT DELEGATION & LISTENERS
   ========================================================= */

document.addEventListener("input", (e) => {
    const target = e.target;
    if (!target) return;

    // Single Inputs
    if (["fullName", "jobTitle", "email", "phone", "location", "linkedin", "github", "summary"].includes(target.id)) {
        resumeData[target.id] = target.value;
        updatePreview();
        saveData();
        return;
    }

    // Array Items
    const section = target.dataset.section;
    const index = target.dataset.index;
    const field = target.dataset.field;

    if (section && index !== undefined && field) {
        const itemIdx = Number(index);
        if (resumeData[section] && resumeData[section][itemIdx]) {
            resumeData[section][itemIdx][field] = target.value;
            updatePreview();
            saveData();
        }
    }
});

document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target) return;

    // Delete item
    const removeBtn = target.closest("button[data-action='remove']");
    if (removeBtn) {
        const section = removeBtn.dataset.section;
        const index = Number(removeBtn.dataset.index);
        if (resumeData[section] && resumeData[section][index] !== undefined) {
            resumeData[section].splice(index, 1);
            renderAllEditors();
            updatePreview();
            saveData();
        }
        return;
    }

    // Color picker
    const colorChoice = target.closest(".color-choice");
    if (colorChoice) {
        resumeData.color = colorChoice.dataset.color;
        $$(".color-choice").forEach(b => b.classList.remove("active"));
        colorChoice.classList.add("active");
        updatePreview();
        saveData();
        return;
    }
});

// Add Item Handlers
document.getElementById("addExperience")?.addEventListener("click", () => {
    resumeData.experience.push({ position: "", company: "", location: "", start: "2023 – Present", bullets: "" });
    renderExperienceEditor();
    updatePreview();
    saveData();
});

document.getElementById("addEducation")?.addEventListener("click", () => {
    resumeData.education.push({ degree: "", institution: "", year: "2023" });
    renderEducationEditor();
    updatePreview();
    saveData();
});

document.getElementById("addSkill")?.addEventListener("click", () => {
    resumeData.skills.push({ category: "Tools", items: "" });
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

// Template Switch
document.getElementById("templateSelect")?.addEventListener("change", (e) => {
    resumeData.template = e.target.value;
    updatePreview();
    saveData();
});

// Reset Sample
document.getElementById("clearBtn")?.addEventListener("click", () => {
    if (confirm("Reset to clean sample template?")) {
        localStorage.removeItem("jobcv-data-v6");
        resumeData = JSON.parse(JSON.stringify(defaultData));
        loadFormData();
        renderAllEditors();
        updatePreview();
    }
});

// Clean Print Trigger
function triggerHighDefPrint() {
    const originalTitle = document.title;
    const cleanName = (resumeData.fullName || "Candidate").replace(/[^a-zA-Z0-9]/g, "_");
    document.title = `${cleanName}_Resume`;

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => window.print());
    } else {
        window.print();
    }

    setTimeout(() => { document.title = originalTitle; }, 1000);
}

document.getElementById("mainPrintBtn")?.addEventListener("click", triggerHighDefPrint);
document.getElementById("previewPrintBtn")?.addEventListener("click", triggerHighDefPrint);

/* =========================================================
   STORAGE & BOOTSTRAP
   ========================================================= */

function saveData() {
    try {
        localStorage.setItem("jobcv-data-v6", JSON.stringify(resumeData));
        const status = document.getElementById("saveStatus");
        if (status) {
            status.innerHTML = `<i class="fa-solid fa-check"></i> Auto-saved`;
            status.style.opacity = "1";
        }
    } catch (e) {}
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

    const tSelect = document.getElementById("templateSelect");
    if (tSelect) tSelect.value = resumeData.template || "harvard";

    $$(".color-choice").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.color === resumeData.color);
    });
}

function initialize() {
    try {
        const saved = localStorage.getItem("jobcv-data-v6");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && Array.isArray(parsed.experience) && parsed.experience.length > 0) {
                resumeData = { ...defaultData, ...parsed };
            } else {
                resumeData = JSON.parse(JSON.stringify(defaultData));
            }
        } else {
            resumeData = JSON.parse(JSON.stringify(defaultData));
        }
    } catch (e) {
        resumeData = JSON.parse(JSON.stringify(defaultData));
    }

    loadFormData();
    renderAllEditors();
    updatePreview();
}

// Start
initialize();
