/* =========================================================
   Resumora - High Precision ATS Core Logic
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const escapeHTML = (str = "") => {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

// 100% Generic & ATS Verified Initial Sample
const defaultData = {
    fullName: "John Doe",
    jobTitle: "Senior Systems & Cloud Engineer",
    email: "candidate@example.com",
    phone: "+91 987*****10",
    location: "Chandigarh, India",
    linkedin: "linkedin.com/in/example-profile",
    github: "github.com/example-profile",
    summary: "Results-driven Systems Engineer with 4+ years of experience managing enterprise hybrid-cloud networks and Linux infrastructure. Proven track record in BGP/OSPF routing, automated configuration audits, and reducing critical incident response times by 35%.",
    experience: [
        {
            position: "Senior Systems Engineer",
            company: "Tech Systems Solutions",
            location: "Mohali, India",
            start: "June 2023",
            end: "Present",
            bullets: "Architected enterprise SD-WAN routing across 14 branch offices, cutting network latency by 28%.\nManaged multi-vendor firewall rules and automated nightly configuration backups with Ansible.\nCollaborated with DevOps teams to deploy scalable AWS VPCs using Terraform."
        },
        {
            position: "Network Support Engineer",
            company: "Global Infrastructure Ltd",
            location: "Noida, India",
            start: "Aug 2021",
            end: "May 2023",
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
            location: "Punjab, India",
            year: "2017 – 2021",
            details: "Graduated with 8.4 CGPA. Specialized in Computer Networks and Operating Systems."
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

let resumeData = { ...defaultData };

const setValue = (id, val) => { const el = $(`#${id}`); if (el) el.value = val || ""; };
const getValue = (id) => { const el = $(`#${id}`); return el ? el.value.trim() : ""; };

/* =========================================================
   FORM EDITORS
   ========================================================= */

function renderExperienceEditor() {
    const container = $("#experienceList");
    if (!container) return;
    container.innerHTML = "";
    resumeData.experience.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Position ${index + 1}</strong>
                <button type="button" class="remove-btn" onclick="removeItem('experience', ${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="form-grid">
                <div><label>Job Title</label><input value="${escapeHTML(item.position)}" oninput="updateItem('experience', ${index}, 'position', this.value)"></div>
                <div><label>Company</label><input value="${escapeHTML(item.company)}" oninput="updateItem('experience', ${index}, 'company', this.value)"></div>
                <div><label>Location</label><input value="${escapeHTML(item.location)}" oninput="updateItem('experience', ${index}, 'location', this.value)"></div>
                <div><label>Dates (e.g. 2023 - Present)</label><input value="${escapeHTML(item.start + (item.end ? ' – ' + item.end : ''))}" oninput="updateItem('experience', ${index}, 'start', this.value)"></div>
                <div class="field full"><label>Bullet Points (One per line)</label><textarea rows="3" oninput="updateItem('experience', ${index}, 'bullets', this.value)">${escapeHTML(item.bullets || "")}</textarea></div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderEducationEditor() {
    const container = $("#educationList");
    if (!container) return;
    container.innerHTML = "";
    resumeData.education.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Degree ${index + 1}</strong>
                <button type="button" class="remove-btn" onclick="removeItem('education', ${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="form-grid">
                <div class="field full"><label>Degree</label><input value="${escapeHTML(item.degree)}" oninput="updateItem('education', ${index}, 'degree', this.value)"></div>
                <div><label>School / University</label><input value="${escapeHTML(item.institution)}" oninput="updateItem('education', ${index}, 'institution', this.value)"></div>
                <div><label>Year</label><input value="${escapeHTML(item.year)}" oninput="updateItem('education', ${index}, 'year', this.value)"></div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderSkillsEditor() {
    const container = $("#skillsList");
    if (!container) return;
    container.innerHTML = "";
    resumeData.skills.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Category ${index + 1}</strong>
                <button type="button" class="remove-btn" onclick="removeItem('skills', ${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="form-grid">
                <div><label>Category Name</label><input value="${escapeHTML(item.category)}" oninput="updateItem('skills', ${index}, 'category', this.value)"></div>
                <div><label>Skills (Comma-separated)</label><input value="${escapeHTML(item.items)}" oninput="updateItem('skills', ${index}, 'items', this.value)"></div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderProjectsEditor() {
    const container = $("#projectsList");
    if (!container) return;
    container.innerHTML = "";
    resumeData.projects.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Project ${index + 1}</strong>
                <button type="button" class="remove-btn" onclick="removeItem('projects', ${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="form-grid">
                <div><label>Project Name</label><input value="${escapeHTML(item.title)}" oninput="updateItem('projects', ${index}, 'title', this.value)"></div>
                <div><label>Repo / Live URL</label><input value="${escapeHTML(item.link)}" oninput="updateItem('projects', ${index}, 'link', this.value)"></div>
                <div class="field full"><label>Bullet Points</label><textarea rows="2" oninput="updateItem('projects', ${index}, 'bullets', this.value)">${escapeHTML(item.bullets || "")}</textarea></div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderCertificationsEditor() {
    const container = $("#certificationsList");
    if (!container) return;
    container.innerHTML = "";
    resumeData.certifications.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Cert ${index + 1}</strong>
                <button type="button" class="remove-btn" onclick="removeItem('certifications', ${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="form-grid">
                <div class="field full"><label>Certification Name</label><input value="${escapeHTML(item.title)}" oninput="updateItem('certifications', ${index}, 'title', this.value)"></div>
                <div><label>Issuer</label><input value="${escapeHTML(item.issuer)}" oninput="updateItem('certifications', ${index}, 'issuer', this.value)"></div>
                <div><label>Year</label><input value="${escapeHTML(item.year)}" oninput="updateItem('certifications', ${index}, 'year', this.value)"></div>
            </div>
        `;
        container.appendChild(div);
    });
}

window.updateItem = (section, idx, field, val) => {
    resumeData[section][idx][field] = val;
    updatePreview();
    saveData();
};

window.removeItem = (section, idx) => {
    resumeData[section].splice(idx, 1);
    renderAllEditors();
    updatePreview();
    saveData();
};

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

function updatePreview() {
    // Header
    $("#previewName").textContent = resumeData.fullName || "Your Full Name";
    $("#previewTitle").textContent = resumeData.jobTitle || "";

    const contactParts = [];
    if (resumeData.email) contactParts.push(`<span><i class="fa-solid fa-envelope"></i> ${escapeHTML(resumeData.email)}</span>`);
    if (resumeData.phone) contactParts.push(`<span><i class="fa-solid fa-phone"></i> ${escapeHTML(resumeData.phone)}</span>`);
    if (resumeData.location) contactParts.push(`<span><i class="fa-solid fa-location-dot"></i> ${escapeHTML(resumeData.location)}</span>`);
    if (resumeData.linkedin) contactParts.push(`<span><i class="fa-brands fa-linkedin"></i> ${escapeHTML(resumeData.linkedin)}</span>`);
    if (resumeData.github) contactParts.push(`<span><i class="fa-brands fa-github"></i> ${escapeHTML(resumeData.github)}</span>`);
    $("#previewContact").innerHTML = contactParts.join("");

    // Summary
    const summaryText = resumeData.summary || "";
    $("#previewSummary").textContent = summaryText;
    $("#summarySection").style.display = summaryText.trim() ? "block" : "none";

    // Experience
    const expHTML = resumeData.experience.map(exp => {
        const bullets = (exp.bullets || "").split("\n").filter(b => b.trim()).map(b => `<li>${escapeHTML(b.replace(/^•\s*/, ''))}</li>`).join("");
        return `
            <div class="ats-entry">
                <div class="ats-entry-header">
                    <strong>${escapeHTML(exp.position)}</strong>
                    <span>${escapeHTML(exp.start || "")}</span>
                </div>
                <div class="ats-entry-sub">
                    <span>${escapeHTML(exp.company)} · ${escapeHTML(exp.location || "")}</span>
                </div>
                ${bullets ? `<ul class="ats-bullet-list">${bullets}</ul>` : ""}
            </div>
        `;
    }).join("");
    $("#previewExperience").innerHTML = expHTML;
    $("#experienceSection").style.display = resumeData.experience.length ? "block" : "none";

    // Projects
    const projHTML = resumeData.projects.map(proj => {
        const bullets = (proj.bullets || "").split("\n").filter(b => b.trim()).map(b => `<li>${escapeHTML(b.replace(/^•\s*/, ''))}</li>`).join("");
        return `
            <div class="ats-entry">
                <div class="ats-entry-header">
                    <strong>${escapeHTML(proj.title)}</strong>
                    <span>${escapeHTML(proj.link || "")}</span>
                </div>
                ${bullets ? `<ul class="ats-bullet-list">${bullets}</ul>` : ""}
            </div>
        `;
    }).join("");
    $("#previewProjects").innerHTML = projHTML;
    $("#projectsSection").style.display = resumeData.projects.length ? "block" : "none";

    // Education
    const eduHTML = resumeData.education.map(edu => `
        <div class="ats-entry">
            <div class="ats-entry-header">
                <strong>${escapeHTML(edu.degree)}</strong>
                <span>${escapeHTML(edu.year || "")}</span>
            </div>
            <div class="ats-entry-sub">
                <span>${escapeHTML(edu.institution)}</span>
            </div>
        </div>
    `).join("");
    $("#previewEducation").innerHTML = eduHTML;
    $("#educationSection").style.display = resumeData.education.length ? "block" : "none";

    // Skills
    const skillsHTML = resumeData.skills.map(sk => `
        <div class="ats-skill-line">
            <strong>${escapeHTML(sk.category)}:</strong> ${escapeHTML(sk.items)}
        </div>
    `).join("");
    $("#previewSkills").innerHTML = skillsHTML;
    $("#skillsSection").style.display = resumeData.skills.length ? "block" : "none";

    // Certifications
    const certHTML = resumeData.certifications.map(c => `
        <div class="ats-entry" style="margin-bottom: 4px;">
            <div class="ats-entry-header">
                <strong>${escapeHTML(c.title)}</strong>
                <span>${escapeHTML(c.year || "")}</span>
            </div>
            <div class="ats-entry-sub">
                <span>${escapeHTML(c.issuer || "")}</span>
            </div>
        </div>
    `).join("");
    $("#previewCertifications").innerHTML = certHTML;
    $("#certificationSection").style.display = resumeData.certifications.length ? "block" : "none";
}

/* =========================================================
   CLEAN VECTOR PRINT DISPATCHER
   ========================================================= */

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

$("#mainPrintBtn")?.addEventListener("click", triggerHighDefPrint);
$("#previewPrintBtn")?.addEventListener("click", triggerHighDefPrint);

/* Global Listeners */
["fullName", "jobTitle", "email", "phone", "location", "linkedin", "github", "summary"].forEach(id => {
    $(`#${id}`)?.addEventListener("input", (e) => {
        resumeData[id] = e.target.value;
        updatePreview();
        saveData();
    });
});

$("#addExperience")?.addEventListener("click", () => {
    resumeData.experience.push({ position: "", company: "", location: "", start: "2023", end: "Present", bullets: "" });
    renderExperienceEditor();
    updatePreview();
});

$("#addEducation")?.addEventListener("click", () => {
    resumeData.education.push({ degree: "", institution: "", year: "2023" });
    renderEducationEditor();
    updatePreview();
});

$("#addSkill")?.addEventListener("click", () => {
    resumeData.skills.push({ category: "Tools", items: "" });
    renderSkillsEditor();
    updatePreview();
});

$("#addProject")?.addEventListener("click", () => {
    resumeData.projects.push({ title: "", link: "", bullets: "" });
    renderProjectsEditor();
    updatePreview();
});

$("#addCertification")?.addEventListener("click", () => {
    resumeData.certifications.push({ title: "", issuer: "", year: "2024" });
    renderCertificationsEditor();
    updatePreview();
});

$("#clearBtn")?.addEventListener("click", () => {
    if (confirm("Reset to clean sample template?")) {
        localStorage.removeItem("jobcv-data-v2");
        resumeData = JSON.parse(JSON.stringify(defaultData));
        loadFormData();
        renderAllEditors();
        updatePreview();
    }
});

function saveData() {
    try {
        localStorage.setItem("jobcv-data-v2", JSON.stringify(resumeData));
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
}

function initialize() {
    try {
        const saved = localStorage.getItem("jobcv-data-v2");
        if (saved) {
            resumeData = { ...defaultData, ...JSON.parse(saved) };
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

initialize();
