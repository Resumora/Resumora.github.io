/* =========================================================
   Resumora - Resume Engine (Clean Native Print / Save PDF)
   ========================================================= */

const $ = (selector) => document.querySelector(selector); const $$ = (selector) => [...document.querySelectorAll(selector)];

const escapeHTML = (value = "") => {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

// Default Realistic Pre-filled Demo Data
const defaultData = {
    fullName: "John Doe",
    jobTitle: "Senior Network & Systems Engineer",
    email: "example@example.com",
    phone: "+91 **** 43210",
    location: "Chandigarh, India",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/e.g",
    github: "https://github.com/e.g",
    summary: "Results-driven Network and Systems Engineer with 4+ years of experience designing, configuring, and optimizing enterprise IT infrastructure. Proven track record in BGP/OSPF routing, cloud network migration, and reducing downtime by 35%.",
    photo: "",
    experience: [
        {
            position: "Senior Network Engineer",
            company: "Infosys Ltd",
            location: "Mohali, India",
            start: "June 2023",
            end: "Present",
            description: "• Architected and deployed enterprise SD-WAN across 14 remote sites, cutting operational latency by 28%.\n• Managed multi-vendor routing and switching environments (Cisco Catalyst, Nexus, Fortinet firewalls).\n• Automated weekly network configuration audits using Python and Ansible scripts."
        },
        {
            position: "Network Support Engineer",
            company: "Wipro Technologies",
            location: "Noida, India",
            start: "Aug 2021",
            end: "May 2023",
            description: "• Resolved Level 2/3 network escalations, maintaining 99.8% SLA compliance for global client networks.\n• Configured VLANs, ACLs, site-to-site IPsec VPNs, and monitored network bandwidth using Wireshark and PRTG."
        }
    ],
    education: [
        {
            degree: "B.Tech in Computer Science & Engineering",
            school: "Punjab Technical University",
            location: "Punjab, India",
            start: "2017",
            end: "2021",
            description: "Graduated with 8.4 CGPA. Specialized in Computer Networks and Operating Systems."
        }
    ],
    skills: [
        { name: "Cisco Routing & Switching", level: "Expert" },
        { name: "BGP / OSPF / EIGRP", level: "Expert" },
        { name: "Firewall (Fortinet / Palo Alto)", level: "Advanced" },
        { name: "Python Network Automation", level: "Intermediate" },
        { name: "Linux Administration", level: "Advanced" },
        { name: "AWS Cloud Networking", level: "Intermediate" }
    ],
    certifications: [
        { name: "Cisco Certified Network Associate (CCNA 200-301)", issuer: "Cisco Systems", year: "2022" },
        { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" }
    ],
    projects: [
        {
            name: "Automated Network Backup & Compliance Bot",
            link: "https://github.com/rohsharma/net-backup-tool",
            description: "Developed a Python tool utilizing Netmiko and Paramiko to backup running configurations from 40+ Cisco switches nightly to a secure AWS S3 bucket."
        }
    ],
    languages: [
        { name: "English", level: "Professional" },
        { name: "Hindi", level: "Native" },
        { name: "Punjabi", level: "Conversational" }
    ],
    achievements: "• Awarded 'Star Performer of the Quarter' twice at Infosys for seamless datacenter migration with zero downtime.",
    interests: "Open-Source Networking, Homelab Automation, Chess, Hiking",
    template: "modern",
    color: "#2563eb"
};

let resumeData = { ...defaultData };

const createExperience = () => ({ position: "", company: "", location: "", start: "", end: "", description: "" });
const createEducation = () => ({ degree: "", school: "", location: "", start: "", end: "", description: "" });
const createSkill = () => ({ name: "", level: "Intermediate" });
const createCertification = () => ({ name: "", issuer: "", year: "" });
const createProject = () => ({ name: "", link: "", description: "" });
const createLanguage = () => ({ name: "", level: "Professional" });

const setValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value || "";
};

const getValue = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
};

const toggleSection = (selector, visible) => {
    const el = $(selector);
    if (el) el.style.display = visible ? "" : "none";
};

/* =========================================================
   FORM EDITORS
   ========================================================= */

function renderExperienceEditor() {
    const container = $("#experienceList");
    if (!container) return;
    container.innerHTML = "";
    if (!resumeData.experience.length) {
        container.innerHTML = `<p style="color:#64748b; font-size:12px; font-style:italic;">No work experience added yet.</p>`;
        return;
    }

    resumeData.experience.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Experience ${index + 1}</strong>
                <button type="button" class="remove-btn" data-remove-experience="${index}" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="dynamic-grid">
                <div>
                    <label>Job Title</label>
                    <input data-experience="${index}" data-field="position" value="${escapeHTML(item.position)}" placeholder="e.g. Network Engineer">
                </div>
                <div>
                    <label>Company</label>
                    <input data-experience="${index}" data-field="company" value="${escapeHTML(item.company)}" placeholder="e.g. Infosys">
                </div>
                <div>
                    <label>Location</label>
                    <input data-experience="${index}" data-field="location" value="${escapeHTML(item.location)}" placeholder="e.g. Mohali, India">
                </div>
                <div>
                    <label>Start Date</label>
                    <input data-experience="${index}" data-field="start" value="${escapeHTML(item.start)}" placeholder="e.g. June 2023">
                </div>
                <div>
                    <label>End Date</label>
                    <input data-experience="${index}" data-field="end" value="${escapeHTML(item.end)}" placeholder="e.g. Present">
                </div>
                <div class="dynamic-full">
                    <label>Responsibilities & Bullet Points</label>
                    <textarea data-experience="${index}" data-field="description" placeholder="• Bullet points...">${escapeHTML(item.description)}</textarea>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderEducationEditor() {
    const container = $("#educationList");
    if (!container) return;
    container.innerHTML = "";
    if (!resumeData.education.length) {
        container.innerHTML = `<p style="color:#64748b; font-size:12px; font-style:italic;">No education added yet.</p>`;
        return;
    }

    resumeData.education.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Education ${index + 1}</strong>
                <button type="button" class="remove-btn" data-remove-education="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="dynamic-grid">
                <div>
                    <label>Degree / Qualification</label>
                    <input data-education="${index}" data-field="degree" value="${escapeHTML(item.degree)}" placeholder="e.g. B.Tech Computer Science">
                </div>
                <div>
                    <label>University / School</label>
                    <input data-education="${index}" data-field="school" value="${escapeHTML(item.school)}" placeholder="e.g. Punjab Technical University">
                </div>
                <div>
                    <label>Location</label>
                    <input data-education="${index}" data-field="location" value="${escapeHTML(item.location)}" placeholder="e.g. Punjab, India">
                </div>
                <div>
                    <label>Start Year</label>
                    <input data-education="${index}" data-field="start" value="${escapeHTML(item.start)}" placeholder="e.g. 2017">
                </div>
                <div>
                    <label>End Year</label>
                    <input data-education="${index}" data-field="end" value="${escapeHTML(item.end)}" placeholder="e.g. 2021">
                </div>
                <div class="dynamic-full">
                    <label>Details</label>
                    <textarea data-education="${index}" data-field="description" placeholder="CGPA, major subjects...">${escapeHTML(item.description)}</textarea>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderSkillsEditor() {
    const container = $("#skillsList");
    if (!container) return;
    container.innerHTML = "";
    if (!resumeData.skills.length) {
        container.innerHTML = `<p style="color:#64748b; font-size:12px; font-style:italic;">No skills added yet.</p>`;
        return;
    }

    resumeData.skills.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-grid">
                <div>
                    <label>Skill Name</label>
                    <input data-skill="${index}" data-field="name" value="${escapeHTML(item.name)}" placeholder="e.g. Linux Administration">
                </div>
                <div>
                    <label>Level</label>
                    <select data-skill="${index}" data-field="level">
                        <option ${item.level === "Beginner" ? "selected" : ""}>Beginner</option>
                        <option ${item.level === "Intermediate" ? "selected" : ""}>Intermediate</option>
                        <option ${item.level === "Advanced" ? "selected" : ""}>Advanced</option>
                        <option ${item.level === "Expert" ? "selected" : ""}>Expert</option>
                    </select>
                </div>
            </div>
            <div style="text-align:right; margin-top:8px;">
                <button type="button" class="remove-btn" data-remove-skill="${index}" style="margin-left:auto;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderCertificationEditor() {
    const container = $("#certificationsList");
    if (!container) return;
    container.innerHTML = "";
    if (!resumeData.certifications.length) {
        container.innerHTML = `<p style="color:#64748b; font-size:12px; font-style:italic;">No certifications added yet.</p>`;
        return;
    }

    resumeData.certifications.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Certification ${index + 1}</strong>
                <button type="button" class="remove-btn" data-remove-certification="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="dynamic-grid">
                <div>
                    <label>Certification Name</label>
                    <input data-certification="${index}" data-field="name" value="${escapeHTML(item.name)}" placeholder="e.g. Cisco CCNA">
                </div>
                <div>
                    <label>Issuer Organization</label>
                    <input data-certification="${index}" data-field="issuer" value="${escapeHTML(item.issuer)}" placeholder="e.g. Cisco Systems">
                </div>
                <div>
                    <label>Year</label>
                    <input data-certification="${index}" data-field="year" value="${escapeHTML(item.year)}" placeholder="e.g. 2022">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderProjectEditor() {
    const container = $("#projectsList");
    if (!container) return;
    container.innerHTML = "";
    if (!resumeData.projects.length) {
        container.innerHTML = `<p style="color:#64748b; font-size:12px; font-style:italic;">No projects added yet.</p>`;
        return;
    }

    resumeData.projects.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Project ${index + 1}</strong>
                <button type="button" class="remove-btn" data-remove-project="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="dynamic-grid">
                <div>
                    <label>Project Title</label>
                    <input data-project="${index}" data-field="name" value="${escapeHTML(item.name)}" placeholder="e.g. Automated Network Backup">
                </div>
                <div>
                    <label>Link / Repo</label>
                    <input data-project="${index}" data-field="link" value="${escapeHTML(item.link)}" placeholder="https://github.com/...">
                </div>
                <div class="dynamic-full">
                    <label>Description</label>
                    <textarea data-project="${index}" data-field="description" placeholder="Project achievements...">${escapeHTML(item.description)}</textarea>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderLanguageEditor() {
    const container = $("#languagesList");
    if (!container) return;
    container.innerHTML = "";
    if (!resumeData.languages.length) {
        container.innerHTML = `<p style="color:#64748b; font-size:12px; font-style:italic;">No languages added yet.</p>`;
        return;
    }

    resumeData.languages.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-grid">
                <div>
                    <label>Language</label>
                    <input data-language="${index}" data-field="name" value="${escapeHTML(item.name)}" placeholder="e.g. English">
                </div>
                <div>
                    <label>Proficiency</label>
                    <select data-language="${index}" data-field="level">
                        <option ${item.level === "Basic" ? "selected" : ""}>Basic</option>
                        <option ${item.level === "Conversational" ? "selected" : ""}>Conversational</option>
                        <option ${item.level === "Professional" ? "selected" : ""}>Professional</option>
                        <option ${item.level === "Native" ? "selected" : ""}>Native</option>
                    </select>
                </div>
            </div>
            <div style="text-align:right; margin-top:8px;">
                <button type="button" class="remove-btn" data-remove-language="${index}" style="margin-left:auto;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderEditors() {
    renderExperienceEditor();
    renderEducationEditor();
    renderSkillsEditor();
    renderCertificationEditor();
    renderProjectEditor();
    renderLanguageEditor();
}

/* =========================================================
   PREVIEW UPDATE
   ========================================================= */

function updateBasicPreview() {
    const pName = $("#previewName");
    const pTitle = $("#previewTitle");
    if (pName) pName.textContent = resumeData.fullName || "";
    if (pTitle) {
        pTitle.textContent = resumeData.jobTitle || "";
        pTitle.style.display = resumeData.jobTitle ? "block" : "none";
    }

    let contactHTML = "";
    if (resumeData.email) contactHTML += `<span><i class="fa-solid fa-envelope"></i> ${escapeHTML(resumeData.email)}</span>`;
    if (resumeData.phone) contactHTML += `<span><i class="fa-solid fa-phone"></i> ${escapeHTML(resumeData.phone)}</span>`;
    if (resumeData.location) contactHTML += `<span><i class="fa-solid fa-location-dot"></i> ${escapeHTML(resumeData.location)}</span>`;

    const pContact = $("#previewContact");
    const sContact = $("#sidebarContact");
    if (pContact) {
        pContact.innerHTML = contactHTML;
        pContact.style.display = contactHTML ? "flex" : "none";
    }
    if (sContact) {
        sContact.innerHTML = contactHTML;
        sContact.style.display = contactHTML ? "flex" : "none";
    }

    let linksHTML = "";
    if (resumeData.website) linksHTML += `<span><i class="fa-solid fa-globe"></i> Website</span>`;
    if (resumeData.linkedin) linksHTML += `<span><i class="fa-brands fa-linkedin"></i> LinkedIn</span>`;
    if (resumeData.github) linksHTML += `<span><i class="fa-brands fa-github"></i> GitHub</span>`;

    const pLinks = $("#previewLinks");
    const sLinks = $("#sidebarLinks");
    if (pLinks) {
        pLinks.innerHTML = linksHTML;
        pLinks.style.display = linksHTML ? "flex" : "none";
    }
    if (sLinks) {
        sLinks.innerHTML = linksHTML;
        sLinks.style.display = linksHTML ? "flex" : "none";
    }

    const pSum = $("#previewSummary");
    const pAch = $("#previewAchievements");
    const pInt = $("#previewInterests");

    if (pSum) pSum.textContent = resumeData.summary || "";
    if (pAch) {
        const rawAch = resumeData.achievements || "";
        const lines = rawAch.split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => line.startsWith("•") || line.startsWith("-") ? line : `• ${line}`);
        
        pAch.textContent = lines.join("\n");
    }
    if (pInt) pInt.textContent = resumeData.interests || "";

    toggleSection("#summarySection", Boolean(resumeData.summary && resumeData.summary.trim()));
    toggleSection("#achievementSection", Boolean(resumeData.achievements && resumeData.achievements.trim()));
    toggleSection("#interestsSection", Boolean(resumeData.interests && resumeData.interests.trim()));
}

function updateExperiencePreview() {
    const container = $("#previewExperience");
    if (!container) return;
    const items = (resumeData.experience || []).filter(item => 
        (item.position && item.position.trim()) || 
        (item.company && item.company.trim()) || 
        (item.description && item.description.trim())
    );

    if (!items.length) {
        container.innerHTML = "";
        toggleSection("#experienceSection", false);
        return;
    }

    toggleSection("#experienceSection", true);
    container.innerHTML = items.map(item => `
        <div class="resume-entry">
            <div class="resume-entry-header">
                <div>
                    <h4>${escapeHTML(item.position || "")}</h4>
                    <div class="company">${escapeHTML(item.company || "")}${item.location ? " · " + escapeHTML(item.location) : ""}</div>
                </div>
                <div class="date">${escapeHTML(item.start || "")}${item.start && item.end ? " – " : ""}${escapeHTML(item.end || "")}</div>
            </div>
            ${item.description ? `<p class="resume-entry-description">${escapeHTML(item.description)}</p>` : ""}
        </div>
    `).join("");
}

function updateEducationPreview() {
    const container = $("#previewEducation");
    if (!container) return;
    const items = (resumeData.education || []).filter(item => 
        (item.degree && item.degree.trim()) || 
        (item.school && item.school.trim())
    );

    if (!items.length) {
        container.innerHTML = "";
        toggleSection("#educationSection", false);
        return;
    }

    toggleSection("#educationSection", true);
    container.innerHTML = items.map(item => `
        <div class="resume-entry">
            <div class="resume-entry-header">
                <div>
                    <h4>${escapeHTML(item.degree || "")}</h4>
                    <div class="company">${escapeHTML(item.school || "")}${item.location ? " · " + escapeHTML(item.location) : ""}</div>
                </div>
                <div class="date">${escapeHTML(item.start || "")}${item.start && item.end ? " – " : ""}${escapeHTML(item.end || "")}</div>
            </div>
            ${item.description ? `<p class="resume-entry-description">${escapeHTML(item.description)}</p>` : ""}
        </div>
    `).join("");
}

function updateSkillsPreview() {
    const container = $("#previewSkills");
    const sidebarContainer = $("#sidebarSkills");
    const items = (resumeData.skills || []).filter(item => item.name && item.name.trim());

    if (!items.length) {
        toggleSection("#skillsSection", false);
        toggleSection("#sidebarSkillsBlock", false);
        if (container) container.innerHTML = "";
        if (sidebarContainer) sidebarContainer.innerHTML = "";
        return;
    }

    toggleSection("#skillsSection", true);
    toggleSection("#sidebarSkillsBlock", true);
    const tagsHTML = items.map(item => `<span class="skill-tag">${escapeHTML(item.name)}</span>`).join("");
    if (container) container.innerHTML = tagsHTML;
    if (sidebarContainer) sidebarContainer.innerHTML = tagsHTML;
}

function updateCertificationPreview() {
    const container = $("#previewCertifications");
    if (!container) return;
    const items = (resumeData.certifications || []).filter(item => 
        (item.name && item.name.trim()) || 
        (item.issuer && item.issuer.trim())
    );

    if (!items.length) {
        container.innerHTML = "";
        toggleSection("#certificationSection", false);
        return;
    }

    toggleSection("#certificationSection", true);
    container.innerHTML = items.map(item => `
        <div class="cert-entry">
            <strong>${escapeHTML(item.name || "")}</strong>
            <span>${escapeHTML(item.issuer || "")}${item.year ? " · " + escapeHTML(item.year) : ""}</span>
        </div>
    `).join("");
}

function updateProjectPreview() {
    const container = $("#previewProjects");
    if (!container) return;
    const items = (resumeData.projects || []).filter(item => 
        (item.name && item.name.trim()) || 
        (item.description && item.description.trim())
    );

    if (!items.length) {
        container.innerHTML = "";
        toggleSection("#projectsSection", false);
        return;
    }

    toggleSection("#projectsSection", true);
    container.innerHTML = items.map(item => `
        <div class="project-entry">
            <strong>${escapeHTML(item.name || "")}</strong>
            ${item.link ? `<span>${escapeHTML(item.link)}</span>` : ""}
            ${item.description ? `<p class="resume-entry-description">${escapeHTML(item.description)}</p>` : ""}
        </div>
    `).join("");
}

function updateLanguagePreview() {
    const container = $("#previewLanguages");
    const sidebarContainer = $("#sidebarLanguages");
    const items = (resumeData.languages || []).filter(item => item.name && item.name.trim());

    if (!items.length) {
        toggleSection("#languagesSection", false);
        toggleSection("#sidebarLanguagesBlock", false);
        if (container) container.innerHTML = "";
        if (sidebarContainer) sidebarContainer.innerHTML = "";
        return;
    }

    toggleSection("#languagesSection", true);
    toggleSection("#sidebarLanguagesBlock", true);

    const langHTML = items.map(item => `
        <div class="language-entry">
            <strong>${escapeHTML(item.name)}</strong>
            <span>${escapeHTML(item.level || "")}</span>
        </div>
    `).join("");

    if (container) container.innerHTML = langHTML;
    if (sidebarContainer) sidebarContainer.innerHTML = langHTML;
}

function showPhoto() {
    const preview = $("#photoPreview");
    const headerPhoto = $("#headerResumePhoto");
    const sidebarPhoto = $("#resumePhoto");
    const removeBtn = $("#removePhotoBtn");

    if (resumeData.photo) {
        const imgTag = `<img src="${resumeData.photo}" alt="Profile">`;
        if (preview) preview.innerHTML = imgTag;
        if (headerPhoto) {
            headerPhoto.innerHTML = imgTag;
            headerPhoto.style.display = "flex";
        }
        if (sidebarPhoto) {
            sidebarPhoto.innerHTML = imgTag;
            sidebarPhoto.style.display = "flex";
        }
        if (removeBtn) removeBtn.style.display = "inline-flex";
    } else {
        if (preview) preview.innerHTML = `<i class="fa-solid fa-user"></i>`;
        if (headerPhoto) {
            headerPhoto.innerHTML = "";
            headerPhoto.style.display = "none";
        }
        if (sidebarPhoto) {
            sidebarPhoto.innerHTML = "";
            sidebarPhoto.style.display = "none";
        }
        if (removeBtn) removeBtn.style.display = "none";
    }
}

function applyTemplate() {
    const resume = $("#resume");
    if (!resume) return;

    resume.classList.remove(
        "modern-template",
        "professional-template",
        "minimal-template",
        "sidebar-template",
        "executive-template",
        "tech-template",
        "elegant-template"
    );

    const activeTemplate = resumeData.template || "modern";
    resume.classList.add(`${activeTemplate}-template`);
}

function applyColor() {
    document.documentElement.style.setProperty("--primary", resumeData.color || "#2563eb");
}

function updatePreview() {
    updateBasicPreview();
    updateExperiencePreview();
    updateEducationPreview();
    updateSkillsPreview();
    updateCertificationPreview();
    updateProjectPreview();
    updateLanguagePreview();
    showPhoto();
    applyTemplate();
    applyColor();
    saveData();
}

/* =========================================================
   INPUT EVENTS
   ========================================================= */

function collectBasicData() {
    resumeData.fullName = getValue("fullName");
    resumeData.jobTitle = getValue("jobTitle");
    resumeData.email = getValue("email");
    resumeData.phone = getValue("phone");
    resumeData.location = getValue("location");
    resumeData.website = getValue("website");
    resumeData.linkedin = getValue("linkedin");
    resumeData.github = getValue("github");
    resumeData.summary = getValue("summary");
    resumeData.achievements = getValue("achievements");
    resumeData.interests = getValue("interests");
}

function handleInputEvent(event) {
    const target = event.target;
    if (!target) return;

    if (target.dataset.experience !== undefined && resumeData.experience[Number(target.dataset.experience)]) {
        resumeData.experience[Number(target.dataset.experience)][target.dataset.field] = target.value;
    } else if (target.dataset.education !== undefined && resumeData.education[Number(target.dataset.education)]) {
        resumeData.education[Number(target.dataset.education)][target.dataset.field] = target.value;
    } else if (target.dataset.skill !== undefined && resumeData.skills[Number(target.dataset.skill)]) {
        resumeData.skills[Number(target.dataset.skill)][target.dataset.field] = target.value;
    } else if (target.dataset.certification !== undefined && resumeData.certifications[Number(target.dataset.certification)]) {
        resumeData.certifications[Number(target.dataset.certification)][target.dataset.field] = target.value;
    } else if (target.dataset.project !== undefined && resumeData.projects[Number(target.dataset.project)]) {
        resumeData.projects[Number(target.dataset.project)][target.dataset.field] = target.value;
    } else if (target.dataset.language !== undefined && resumeData.languages[Number(target.dataset.language)]) {
        resumeData.languages[Number(target.dataset.language)][target.dataset.field] = target.value;
    }

    collectBasicData();
    updatePreview();
}

document.addEventListener("input", handleInputEvent);
document.addEventListener("change", handleInputEvent);

// Summary count
const summaryField = $("#summary");
if (summaryField) {
    summaryField.addEventListener("input", (e) => {
        const count = $("#summaryCount");
        if (count) count.textContent = `${e.target.value.length} / 600`;
    });
}

// Photo Upload
const photoInput = $("#photoInput");
if (photoInput) {
    photoInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            resumeData.photo = e.target.result;
            showPhoto();
            saveData();
        };
        reader.readAsDataURL(file);
    });
}

// Remove photo
const removePhotoBtn = $("#removePhotoBtn");
if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", () => {
        resumeData.photo = "";
        const photoInputEl = $("#photoInput");
        if (photoInputEl) photoInputEl.value = "";
        showPhoto();
        saveData();
    });
}

/* =========================================================
   BUTTON ACTIONS (CLEAN PRINT & SAVE TO PDF)
   ========================================================= */

// Reset Button
const clearBtn = $("#clearBtn");
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        if (confirm("Reset resume to sample template data?")) {
            localStorage.removeItem("jobcv-data");
            resumeData = JSON.parse(JSON.stringify(defaultData));
            loadFormData();
            renderEditors();
            updatePreview();
        }
    });
}

// Topbar Main Print Button
const mainPrintBtn = $("#mainPrintBtn");
if (mainPrintBtn) {
    mainPrintBtn.addEventListener("click", () => {
        window.print();
    });
}

// Canvas Toolbar Quick Print Button
const previewPrintBtn = $("#previewPrintBtn");
if (previewPrintBtn) {
    previewPrintBtn.addEventListener("click", () => {
        window.print();
    });
}

// Add Item Handlers
$("#addExperience")?.addEventListener("click", () => {
    resumeData.experience.push(createExperience());
    renderExperienceEditor();
    updatePreview();
});

$("#addEducation")?.addEventListener("click", () => {
    resumeData.education.push(createEducation());
    renderEducationEditor();
    updatePreview();
});

$("#addSkill")?.addEventListener("click", () => {
    resumeData.skills.push(createSkill());
    renderSkillsEditor();
    updatePreview();
});

$("#addCertification")?.addEventListener("click", () => {
    resumeData.certifications.push(createCertification());
    renderCertificationEditor();
    updatePreview();
});

$("#addProject")?.addEventListener("click", () => {
    resumeData.projects.push(createProject());
    renderProjectEditor();
    updatePreview();
});

$("#addLanguage")?.addEventListener("click", () => {
    resumeData.languages.push(createLanguage());
    renderLanguageEditor();
    updatePreview();
});

// Remove Item Handlers
document.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;

    if (btn.dataset.removeExperience !== undefined) {
        resumeData.experience.splice(Number(btn.dataset.removeExperience), 1);
        renderExperienceEditor();
        updatePreview();
    } else if (btn.dataset.removeEducation !== undefined) {
        resumeData.education.splice(Number(btn.dataset.removeEducation), 1);
        renderEducationEditor();
        updatePreview();
    } else if (btn.dataset.removeSkill !== undefined) {
        resumeData.skills.splice(Number(btn.dataset.removeSkill), 1);
        renderSkillsEditor();
        updatePreview();
    } else if (btn.dataset.removeCertification !== undefined) {
        resumeData.certifications.splice(Number(btn.dataset.removeCertification), 1);
        renderCertificationEditor();
        updatePreview();
    } else if (btn.dataset.removeProject !== undefined) {
        resumeData.projects.splice(Number(btn.dataset.removeProject), 1);
        renderProjectEditor();
        updatePreview();
    } else if (btn.dataset.removeLanguage !== undefined) {
        resumeData.languages.splice(Number(btn.dataset.removeLanguage), 1);
        renderLanguageEditor();
        updatePreview();
    }
});

// Template Switcher
const templateSelect = $("#templateSelect");
if (templateSelect) {
    templateSelect.addEventListener("change", (e) => {
        resumeData.template = e.target.value;
        applyTemplate();
        updatePreview();
        saveData();
    });
}

// Color Picker
$$(".color-choice").forEach(btn => {     btn.addEventListener("click", () => {         resumeData.color = btn.dataset.color;         $$
(".color-choice").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyColor();
        saveData();
    });
});

/* =========================================================
   INITIALIZATION & STORAGE
   ========================================================= */

function saveData() {
    try {
        localStorage.setItem("jobcv-data", JSON.stringify(resumeData));
        const status = $("#saveStatus");
        if (status) {
            status.innerHTML = `<i class="fa-solid fa-check"></i> Auto-saved`;
            status.style.opacity = "1";
        }
    } catch (err) {
        console.warn("Storage quota warning:", err);
    }
}

function loadFormData() {
    setValue("fullName", resumeData.fullName);
    setValue("jobTitle", resumeData.jobTitle);
    setValue("email", resumeData.email);
    setValue("phone", resumeData.phone);
    setValue("location", resumeData.location);
    setValue("website", resumeData.website);
    setValue("linkedin", resumeData.linkedin);
    setValue("github", resumeData.github);
    setValue("summary", resumeData.summary);
    setValue("achievements", resumeData.achievements);
    setValue("interests", resumeData.interests);

    if (templateSelect) templateSelect.value = resumeData.template || "modern";
    $$(".color-choice").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.color === resumeData.color);
    });

    const summaryCount = $("#summaryCount");
    if (summaryCount) summaryCount.textContent = `${(resumeData.summary || "").length} / 600`;
}

function initialize() {
    try {
        const saved = localStorage.getItem("jobcv-data");
        if (saved) {
            resumeData = { ...defaultData, ...JSON.parse(saved) };
        } else {
            resumeData = JSON.parse(JSON.stringify(defaultData));
        }
    } catch (e) {
        resumeData = JSON.parse(JSON.stringify(defaultData));
    }

    loadFormData();
    renderEditors();
    updatePreview();
}

initialize();
