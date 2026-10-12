const $=e=>document.querySelector(e),$$=e=>[...document.querySelectorAll(e)],escapeHTML=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),defaultData={fullName:"John Doe",jobTitle:"Senior Systems & Cloud Engineer",email:"candidate@example.com",phone:"985*****10",location:"Chandigarh, India",linkedin:"linkedin.com/in/example",github:"github.com/example",summary:"Results-driven Systems Engineer with 4+ years of experience managing enterprise hybrid-cloud networks and Linux infrastructure. Proven track record in BGP/OSPF routing, automated configuration audits, and reducing critical incident response times by 35%.",template:"harvard",color:"#0f172a",experience:[{position:"Senior Systems Engineer",company:"Tech Systems Solutions",location:"Mohali, India",start:"June 2023 – Present",bullets:"Architected enterprise SD-WAN routing across 14 branch offices, cutting network latency by 28%.\nManaged multi-vendor firewall rules and automated nightly configuration backups with Ansible.\nCollaborated with DevOps teams to deploy scalable AWS VPCs using Terraform."},{position:"Network Support Engineer",company:"Global Infrastructure Ltd",location:"Noida, India",start:"Aug 2021 – May 2023",bullets:"Resolved Level 2 and Level 3 escalations, maintaining 99.8% SLA adherence for high-traffic servers.\nMonitored critical server bandwidth using Wireshark and configured site-to-site IPsec VPN tunnels."}],projects:[{title:"Automated Network Backup & Compliance Engine",link:"github.com/example/network-backup-bot",bullets:"Developed a Python CLI utility using Netmiko to pull running configurations from 40+ Cisco switches nightly.\nEncrypted and transferred backups to AWS S3 with automated Slack failure alerting."}],education:[{degree:"B.Tech in Computer Science & Engineering",institution:"Punjab Technical University",year:"2017 – 2021"}],skills:[{category:"Networking & Cloud",items:"Cisco Routing & Switching, BGP, OSPF, AWS (VPC, EC2, S3), IPsec VPN"},{category:"Automation & Scripting",items:"Python, Bash, Ansible, Terraform, Git, Linux Administration"},{category:"Security & Monitoring",items:"Palo Alto Firewalls, Fortinet, Wireshark, PRTG Network Monitor"}],certifications:[{title:"Cisco Certified Network Associate (CCNA 200-301)",issuer:"Cisco Systems",year:"2022"},{title:"AWS Certified Solutions Architect – Associate",issuer:"Amazon Web Services",year:"2024"}]};let resumeData=JSON.parse(JSON.stringify(defaultData));const setValue=(e,t)=>{let a=document.getElementById(e);a&&(a.value=t||"")};function renderExperienceEditor(){let e=document.getElementById("experienceList");e&&(e.innerHTML="",(resumeData.experience||[]).forEach((t,a)=>{let i=document.createElement("div");i.className="dynamic-item",i.innerHTML=`
            <div class="dynamic-item-header">
                <strong>Position ${a+1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="experience" data-index="${a}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div>
                    <label>Job Title</label>
                    <input type="text" data-section="experience" data-index="${a}" data-field="position" value="${escapeHTML(t.position||"")}">
                </div>
                <div>
                    <label>Company</label>
                    <input type="text" data-section="experience" data-index="${a}" data-field="company" value="${escapeHTML(t.company||"")}">
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" data-section="experience" data-index="${a}" data-field="location" value="${escapeHTML(t.location||"")}">
                </div>
                <div>
                    <label>Dates (e.g. 2023 – Present)</label>
                    <input type="text" data-section="experience" data-index="${a}" data-field="start" value="${escapeHTML(t.start||"")}">
                </div>
                <div class="field full">
                    <label>Bullet Points (One per line)</label>
                    <textarea rows="3" data-section="experience" data-index="${a}" data-field="bullets">${escapeHTML(t.bullets||"")}</textarea>
                </div>
            </div>
        `,e.appendChild(i)}))}function renderEducationEditor(){let e=document.getElementById("educationList");e&&(e.innerHTML="",(resumeData.education||[]).forEach((t,a)=>{let i=document.createElement("div");i.className="dynamic-item",i.innerHTML=`
            <div class="dynamic-item-header">
                <strong>Degree ${a+1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="education" data-index="${a}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="field full">
                    <label>Degree</label>
                    <input type="text" data-section="education" data-index="${a}" data-field="degree" value="${escapeHTML(t.degree||"")}">
                </div>
                <div>
                    <label>School / University</label>
                    <input type="text" data-section="education" data-index="${a}" data-field="institution" value="${escapeHTML(t.institution||"")}">
                </div>
                <div>
                    <label>Year</label>
                    <input type="text" data-section="education" data-index="${a}" data-field="year" value="${escapeHTML(t.year||"")}">
                </div>
            </div>
        `,e.appendChild(i)}))}function renderSkillsEditor(){let e=document.getElementById("skillsList");e&&(e.innerHTML="",(resumeData.skills||[]).forEach((t,a)=>{let i=document.createElement("div");i.className="dynamic-item",i.innerHTML=`
            <div class="dynamic-item-header">
                <strong>Category ${a+1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="skills" data-index="${a}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div>
                    <label>Category Name</label>
                    <input type="text" data-section="skills" data-index="${a}" data-field="category" value="${escapeHTML(t.category||"")}">
                </div>
                <div>
                    <label>Skills (Comma-separated)</label>
                    <input type="text" data-section="skills" data-index="${a}" data-field="items" value="${escapeHTML(t.items||"")}">
                </div>
            </div>
        `,e.appendChild(i)}))}function renderProjectsEditor(){let e=document.getElementById("projectsList");e&&(e.innerHTML="",(resumeData.projects||[]).forEach((t,a)=>{let i=document.createElement("div");i.className="dynamic-item",i.innerHTML=`
            <div class="dynamic-item-header">
                <strong>Project ${a+1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="projects" data-index="${a}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div>
                    <label>Project Name</label>
                    <input type="text" data-section="projects" data-index="${a}" data-field="title" value="${escapeHTML(t.title||"")}">
                </div>
                <div>
                    <label>Repo / Live URL</label>
                    <input type="text" data-section="projects" data-index="${a}" data-field="link" value="${escapeHTML(t.link||"")}">
                </div>
                <div class="field full">
                    <label>Bullet Points</label>
                    <textarea rows="2" data-section="projects" data-index="${a}" data-field="bullets">${escapeHTML(t.bullets||"")}</textarea>
                </div>
            </div>
        `,e.appendChild(i)}))}function renderCertificationsEditor(){let e=document.getElementById("certificationsList");e&&(e.innerHTML="",(resumeData.certifications||[]).forEach((t,a)=>{let i=document.createElement("div");i.className="dynamic-item",i.innerHTML=`
            <div class="dynamic-item-header">
                <strong>Cert ${a+1}</strong>
                <button type="button" class="remove-btn" data-action="remove" data-section="certifications" data-index="${a}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="field full">
                    <label>Certification Name</label>
                    <input type="text" data-section="certifications" data-index="${a}" data-field="title" value="${escapeHTML(t.title||"")}">
                </div>
                <div>
                    <label>Issuer</label>
                    <input type="text" data-section="certifications" data-index="${a}" data-field="issuer" value="${escapeHTML(t.issuer||"")}">
                </div>
                <div>
                    <label>Year</label>
                    <input type="text" data-section="certifications" data-index="${a}" data-field="year" value="${escapeHTML(t.year||"")}">
                </div>
            </div>
        `,e.appendChild(i)}))}function renderAllEditors(){renderExperienceEditor(),renderEducationEditor(),renderSkillsEditor(),renderProjectsEditor(),renderCertificationsEditor()}function applyTemplateAndColor(){let e=document.getElementById("resume");e&&(e.className="resume",e.classList.add(`template-${resumeData.template||"harvard"}`),document.documentElement.style.setProperty("--primary",resumeData.color||"#0f172a"))}function updatePreview(){applyTemplateAndColor();let e=document.getElementById("previewName"),t=document.getElementById("previewTitle");e&&(e.textContent=resumeData.fullName||"Candidate Name"),t&&(t.textContent=resumeData.jobTitle||"Target Role / Title");let a=[];resumeData.email&&a.push(`<span><i class="fa-solid fa-envelope"></i> ${escapeHTML(resumeData.email)}</span>`),resumeData.phone&&a.push(`<span><i class="fa-solid fa-phone"></i> ${escapeHTML(resumeData.phone)}</span>`),resumeData.location&&a.push(`<span><i class="fa-solid fa-location-dot"></i> ${escapeHTML(resumeData.location)}</span>`),resumeData.linkedin&&a.push(`<span><i class="fa-brands fa-linkedin"></i> ${escapeHTML(resumeData.linkedin)}</span>`),resumeData.github&&a.push(`<span><i class="fa-brands fa-github"></i> ${escapeHTML(resumeData.github)}</span>`);let i=document.getElementById("previewContact");i&&(i.innerHTML=a.join(""));let s=resumeData.summary||"",n=document.getElementById("previewSummary"),l=document.getElementById("summarySection");n&&(n.textContent=s),l&&(l.style.display=s.trim()?"block":"none");let r=document.getElementById("previewExperience"),d=document.getElementById("experienceSection");r&&d&&(resumeData.experience&&resumeData.experience.length?(d.style.display="block",r.innerHTML=resumeData.experience.map(e=>{let t=(e.bullets||"").split("\n").map(e=>e.trim()).filter(e=>e.length>0).map(e=>`<li>${escapeHTML(e.replace(/^•\s*/,""))}</li>`).join("");return`
                    <div class="ats-entry">
                        <div class="ats-entry-header">
                            <strong>${escapeHTML(e.position||"Position")}</strong>
                            <span>${escapeHTML(e.start||"")}</span>
                        </div>
                        <div class="ats-entry-sub">
                            <span>${escapeHTML(e.company||"Company")}${e.location?" \xb7 "+escapeHTML(e.location):""}</span>
                        </div>
                        ${t?`<ul class="ats-bullet-list">${t}</ul>`:""}
                    </div>
                `}).join("")):d.style.display="none");let o=document.getElementById("previewProjects"),c=document.getElementById("projectsSection");o&&c&&(resumeData.projects&&resumeData.projects.length?(c.style.display="block",o.innerHTML=resumeData.projects.map(e=>{let t=(e.bullets||"").split("\n").map(e=>e.trim()).filter(e=>e.length>0).map(e=>`<li>${escapeHTML(e.replace(/^•\s*/,""))}</li>`).join("");return`
                    <div class="ats-entry">
                        <div class="ats-entry-header">
                            <strong>${escapeHTML(e.title||"Project")}</strong>
                            <span>${escapeHTML(e.link||"")}</span>
                        </div>
                        ${t?`<ul class="ats-bullet-list">${t}</ul>`:""}
                    </div>
                `}).join("")):c.style.display="none");let u=document.getElementById("previewEducation"),p=document.getElementById("educationSection");u&&p&&(resumeData.education&&resumeData.education.length?(p.style.display="block",u.innerHTML=resumeData.education.map(e=>`
                <div class="ats-entry">
                    <div class="ats-entry-header">
                        <strong>${escapeHTML(e.degree||"Degree")}</strong>
                        <span>${escapeHTML(e.year||"")}</span>
                    </div>
                    <div class="ats-entry-sub">
                        <span>${escapeHTML(e.institution||"University")}</span>
                    </div>
                </div>
            `).join("")):p.style.display="none");let m=document.getElementById("previewSkills"),v=document.getElementById("skillsSection");m&&v&&(resumeData.skills&&resumeData.skills.length?(v.style.display="block",m.innerHTML=resumeData.skills.map(e=>`
                <div class="ats-skill-line">
                    <strong>${escapeHTML(e.category||"Skills")}:</strong> ${escapeHTML(e.items||"")}
                </div>
            `).join("")):v.style.display="none");let y=document.getElementById("previewCertifications"),g=document.getElementById("certificationSection");y&&g&&(resumeData.certifications&&resumeData.certifications.length?(g.style.display="block",y.innerHTML=resumeData.certifications.map(e=>`
                <div class="ats-entry" style="margin-bottom: 4px;">
                    <div class="ats-entry-header">
                        <strong>${escapeHTML(e.title||"Certification")}</strong>
                        <span>${escapeHTML(e.year||"")}</span>
                    </div>
                    <div class="ats-entry-sub">
                        <span>${escapeHTML(e.issuer||"")}</span>
                    </div>
                </div>
            `).join("")):g.style.display="none")}function triggerHighDefPrint(){let e=document.title,t=(resumeData.fullName||"Candidate").replace(/[^a-zA-Z0-9]/g,"_");document.title=`${t}_Resume`,document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>window.print()):window.print(),setTimeout(()=>{document.title=e},1e3)}function saveData(){try{localStorage.setItem("jobcv-data-v6",JSON.stringify(resumeData));let e=document.getElementById("saveStatus");e&&(e.innerHTML='<i class="fa-solid fa-check"></i> Auto-saved',e.style.opacity="1")}catch(t){}}function loadFormData(){setValue("fullName",resumeData.fullName),setValue("jobTitle",resumeData.jobTitle),setValue("email",resumeData.email),setValue("phone",resumeData.phone),setValue("location",resumeData.location),setValue("linkedin",resumeData.linkedin),setValue("github",resumeData.github),setValue("summary",resumeData.summary);let e=document.getElementById("templateSelect");e&&(e.value=resumeData.template||"harvard"),$$(".color-choice").forEach(e=>{e.classList.toggle("active",e.dataset.color===resumeData.color)})}function initialize(){try{let e=localStorage.getItem("jobcv-data-v6");if(e){let t=JSON.parse(e);resumeData=t&&Array.isArray(t.experience)&&t.experience.length>0?{...defaultData,...t}:JSON.parse(JSON.stringify(defaultData))}else resumeData=JSON.parse(JSON.stringify(defaultData))}catch(a){resumeData=JSON.parse(JSON.stringify(defaultData))}loadFormData(),renderAllEditors(),updatePreview()}document.addEventListener("input",e=>{let t=e.target;if(!t)return;if(["fullName","jobTitle","email","phone","location","linkedin","github","summary"].includes(t.id)){resumeData[t.id]=t.value,updatePreview(),saveData();return}let a=t.dataset.section,i=t.dataset.index,s=t.dataset.field;if(a&&void 0!==i&&s){let n=Number(i);resumeData[a]&&resumeData[a][n]&&(resumeData[a][n][s]=t.value,updatePreview(),saveData())}}),document.addEventListener("click",e=>{let t=e.target;if(!t)return;let a=t.closest("button[data-action='remove']");if(a){let i=a.dataset.section,s=Number(a.dataset.index);resumeData[i]&&void 0!==resumeData[i][s]&&(resumeData[i].splice(s,1),renderAllEditors(),updatePreview(),saveData());return}let n=t.closest(".color-choice");if(n){resumeData.color=n.dataset.color,$$(".color-choice").forEach(e=>e.classList.remove("active")),n.classList.add("active"),updatePreview(),saveData();return}}),document.getElementById("addExperience")?.addEventListener("click",()=>{resumeData.experience.push({position:"",company:"",location:"",start:"2023 – Present",bullets:""}),renderExperienceEditor(),updatePreview(),saveData()}),document.getElementById("addEducation")?.addEventListener("click",()=>{resumeData.education.push({degree:"",institution:"",year:"2023"}),renderEducationEditor(),updatePreview(),saveData()}),document.getElementById("addSkill")?.addEventListener("click",()=>{resumeData.skills.push({category:"Tools",items:""}),renderSkillsEditor(),updatePreview(),saveData()}),document.getElementById("addProject")?.addEventListener("click",()=>{resumeData.projects.push({title:"",link:"",bullets:""}),renderProjectsEditor(),updatePreview(),saveData()}),document.getElementById("addCertification")?.addEventListener("click",()=>{resumeData.certifications.push({title:"",issuer:"",year:"2024"}),renderCertificationsEditor(),updatePreview(),saveData()}),document.getElementById("templateSelect")?.addEventListener("change",e=>{resumeData.template=e.target.value,updatePreview(),saveData()}),document.getElementById("clearBtn")?.addEventListener("click",()=>{confirm("Reset to clean sample template?")&&(localStorage.removeItem("jobcv-data-v6"),resumeData=JSON.parse(JSON.stringify(defaultData)),loadFormData(),renderAllEditors(),updatePreview())}),document.getElementById("mainPrintBtn")?.addEventListener("click",triggerHighDefPrint),document.getElementById("previewPrintBtn")?.addEventListener("click",triggerHighDefPrint),initialize();
