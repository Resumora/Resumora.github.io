/* =========================================================
   Resumora - High Precision ATS Core Logic & Bulletproof State
   ========================================================= */

const KEY = 'resumora_data_final_v1';

// Default Verified Sample Data
const SAMPLE = {
  tpl: 'harvard',
  color: '#0f172a',
  name: 'John Doe',
  title: 'Senior Systems & Cloud Engineer',
  email: 'candidate@example.com',
  phone: '985*****10',
  loc: 'Chandigarh, India',
  li: 'linkedin.com/in/example',
  gh: 'github.com/example',
  summary: 'Results-driven Systems Engineer with 4+ years of experience managing enterprise hybrid-cloud networks and Linux infrastructure. Proven track record in BGP/OSPF routing, automated configuration audits, and reducing critical incident response times by 35%.',
  exp: [
    {
      role: 'Senior Systems Engineer',
      company: 'Tech Systems Solutions',
      loc: 'Mohali, India',
      start: 'June 2023',
      end: 'Present',
      bullets: 'Architected enterprise SD-WAN routing across 14 branch offices, cutting network latency by 28%.\nManaged multi-vendor firewall rules and automated nightly configuration backups with Ansible.\nCollaborated with DevOps teams to deploy scalable AWS VPCs using Terraform.'
    },
    {
      role: 'Network Support Engineer',
      company: 'Global Infrastructure Ltd',
      loc: 'Noida, India',
      start: 'Aug 2021',
      end: 'May 2023',
      bullets: 'Resolved Level 2 and Level 3 escalations, maintaining 99.8% SLA adherence for high-traffic servers.\nMonitored critical server bandwidth using Wireshark and configured site-to-site IPsec VPN tunnels.'
    }
  ],
  proj: [
    {
      name: 'Automated Network Backup & Compliance Bot',
      tech: 'Python, Ansible, AWS S3',
      desc: 'Developed a Python CLI utility using Netmiko to pull running configurations from 40+ Cisco switches nightly with Slack alerting.'
    }
  ],
  edu: [
    {
      school: 'Punjab Technical University',
      degree: 'B.Tech in Computer Science & Engineering',
      loc: 'Punjab, India',
      year: '2017 – 2021'
    }
  ],
  skills: [
    { cat: 'Networking & Cloud', items: 'Cisco Routing & Switching, BGP, OSPF, AWS (VPC, EC2, S3), IPsec VPN' },
    { cat: 'Automation & Scripting', items: 'Python, Bash, Ansible, Terraform, Git, Linux Administration' }
  ],
  certs: [
    { name: 'Cisco Certified Network Associate (CCNA 200-301)', issuer: 'Cisco Systems', year: '2022' },
    { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2024' }
  ]
};

let D;
try {
  D = JSON.parse(localStorage.getItem(KEY));
} catch (e) {}

if (!D || !Array.isArray(D.exp) || !D.exp.length) {
  D = JSON.parse(JSON.stringify(SAMPLE));
}

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

let tm;
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(D));
  } catch (e) {}
  $('st').textContent = '✓ Auto-saved';
}

function upd() {
  render();
  clearTimeout(tm);
  $('st').textContent = 'Saving…';
  tm = setTimeout(save, 300);
}

/* =========================================================
   LIST EDITORS RENDERING
   ========================================================= */

function renderLists() {
  // Experience
  $('expList').innerHTML = (D.exp || []).map((it, i) => `
    <div class="item">
      <header><span>Position ${i + 1}</span><button type="button" class="x" onclick="delItem('exp', ${i})">✕</button></header>
      <div class="g">
        <div class="f"><label>Job Title</label><input value="${esc(it.role)}" oninput="setItem('exp', ${i}, 'role', this.value)"></div>
        <div class="h"><label>Company</label><input value="${esc(it.company)}" oninput="setItem('exp', ${i}, 'company', this.value)"></div>
        <div class="h"><label>Location</label><input value="${esc(it.loc)}" oninput="setItem('exp', ${i}, 'loc', this.value)"></div>
        <div class="h"><label>Start Date</label><input value="${esc(it.start)}" oninput="setItem('exp', ${i}, 'start', this.value)"></div>
        <div class="h"><label>End Date</label><input value="${esc(it.end)}" oninput="setItem('exp', ${i}, 'end', this.value)"></div>
        <div class="f"><label>Bullet Points (One per line)</label><textarea rows="3" oninput="setItem('exp', ${i}, 'bullets', this.value)">${esc(it.bullets)}</textarea></div>
      </div>
    </div>
  `).join('');

  // Projects
  $('projList').innerHTML = (D.proj || []).map((it, i) => `
    <div class="item">
      <header><span>Project ${i + 1}</span><button type="button" class="x" onclick="delItem('proj', ${i})">✕</button></header>
      <div class="g">
        <div class="f"><label>Project Name</label><input value="${esc(it.name)}" oninput="setItem('proj', ${i}, 'name', this.value)"></div>
        <div class="f"><label>Tech Stack / URL</label><input value="${esc(it.tech)}" oninput="setItem('proj', ${i}, 'tech', this.value)"></div>
        <div class="f"><label>Description</label><textarea rows="2" oninput="setItem('proj', ${i}, 'desc', this.value)">${esc(it.desc)}</textarea></div>
      </div>
    </div>
  `).join('');

  // Education
  $('eduList').innerHTML = (D.edu || []).map((it, i) => `
    <div class="item">
      <header><span>Degree ${i + 1}</span><button type="button" class="x" onclick="delItem('edu', ${i})">✕</button></header>
      <div class="g">
        <div class="f"><label>School / University</label><input value="${esc(it.school)}" oninput="setItem('edu', ${i}, 'school', this.value)"></div>
        <div class="f"><label>Degree</label><input value="${esc(it.degree)}" oninput="setItem('edu', ${i}, 'degree', this.value)"></div>
        <div class="h"><label>Location</label><input value="${esc(it.loc)}" oninput="setItem('edu', ${i}, 'loc', this.value)"></div>
        <div class="h"><label>Years</label><input value="${esc(it.year)}" oninput="setItem('edu', ${i}, 'year', this.value)"></div>
      </div>
    </div>
  `).join('');

  // Skills
  $('skillsList').innerHTML = (D.skills || []).map((it, i) => `
    <div class="item">
      <header><span>Category ${i + 1}</span><button type="button" class="x" onclick="delItem('skills', ${i})">✕</button></header>
      <div class="g">
        <div class="f"><label>Category Name</label><input value="${esc(it.cat)}" oninput="setItem('skills', ${i}, 'cat', this.value)"></div>
        <div class="f"><label>Skills (Comma separated)</label><input value="${esc(it.items)}" oninput="setItem('skills', ${i}, 'items', this.value)"></div>
      </div>
    </div>
  `).join('');

  // Certifications
  $('certsList').innerHTML = (D.certs || []).map((it, i) => `
    <div class="item">
      <header><span>Certification ${i + 1}</span><button type="button" class="x" onclick="delItem('certs', ${i})">✕</button></header>
      <div class="g">
        <div class="f"><label>Certification Name</label><input value="${esc(it.name)}" oninput="setItem('certs', ${i}, 'name', this.value)"></div>
        <div class="h"><label>Issuer</label><input value="${esc(it.issuer)}" oninput="setItem('certs', ${i}, 'issuer', this.value)"></div>
        <div class="h"><label>Year</label><input value="${esc(it.year)}" oninput="setItem('certs', ${i}, 'year', this.value)"></div>
      </div>
    </div>
  `).join('');
}

window.setItem = (sec, i, key, val) => {
  D[sec][i][key] = val;
  upd();
};

window.delItem = (sec, i) => {
  D[sec].splice(i, 1);
  renderLists();
  upd();
};

/* =========================================================
   CANVAS RENDERING
   ========================================================= */

function render() {
  const r = $('resume');
  r.className = 'resume t-' + (D.tpl || 'harvard');
  r.style.setProperty('--p', D.color || '#0f172a');

  const ct = [D.email, D.phone, D.loc, D.li, D.gh]
    .filter(Boolean)
    .map((x) => `<span>${esc(x)}</span>`)
    .join('');

  const sec = (t, b) => (b ? `<section class="sec"><h3 class="st">${t}</h3>${b}</section>` : '');
  const range = (a, b) => [a, b].filter(Boolean).join(' – ');

  const exp = (D.exp || []).map((e) => `
    <div class="en">
      <div class="eh"><b>${esc(e.role)}</b><span>${esc(range(e.start, e.end))}</span></div>
      <div class="es"><span>${esc(e.company)}</span><span>${esc(e.loc)}</span></div>
      ${e.bullets && e.bullets.trim() ? `<ul>${e.bullets.split('\n').filter((l) => l.trim()).map((l) => `<li>${esc(l.trim().replace(/^•\s*/, ''))}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  const proj = (D.proj || []).map((p) => `
    <div class="en">
      <div class="eh"><b>${esc(p.name)}</b><span>${esc(p.tech)}</span></div>
      ${p.desc ? `<div class="tx">${esc(p.desc)}</div>` : ''}
    </div>
  `).join('');

  const edu = (D.edu || []).map((e) => `
    <div class="en">
      <div class="eh"><b>${esc(e.school)}</b><span>${esc(e.year)}</span></div>
      <div class="es"><span>${esc(e.degree)}</span><span>${esc(e.loc)}</span></div>
    </div>
  `).join('');

  const sk = (D.skills || []).map((s) => `
    <div class="sk">${s.cat ? `<b>${esc(s.cat)}:</b> ` : ''}${esc(s.items)}</div>
  `).join('');

  const ce = (D.certs || []).map((c) => `
    <div class="sk"><b>${esc(c.name)}</b>${c.issuer ? ' — ' + esc(c.issuer) : ''}${c.year ? ' (' + esc(c.year) + ')' : ''}</div>
  `).join('');

  r.innerHTML = `
    <header class="hd">
      <h1>${esc(D.name) || 'Candidate Name'}</h1>
      <h2>${esc(D.title)}</h2>
      <div class="ct">${ct}</div>
    </header>
    ${sec('Professional Summary', D.summary && D.summary.trim() ? `<p class="tx">${esc(D.summary)}</p>` : '')}
    ${sec('Work Experience', exp)}
    ${sec('Key Projects', proj)}
    ${sec('Education', edu)}
    ${sec('Technical Skills', sk)}
    ${sec('Certifications', ce)}
  `;
}

/* =========================================================
   EVENTS & LISTENERS
   ========================================================= */

// Direct Field Inputs
['name', 'title', 'email', 'phone', 'loc', 'li', 'gh', 'summary'].forEach((id) => {
  $(id).value = D[id] \vert{}\vert{} '';$(id).addEventListener('input', (e) => {
    D[id] = e.target.value;
    upd();
  });
});

// Template Switch
$('tpl').value = D.tpl \vert{}\vert{} 'harvard';$('tpl').addEventListener('change', (e) => {
  D.tpl = e.target.value;
  upd();
});

// Theme Colors
document.querySelectorAll('.cc').forEach((btn) => {
  if (btn.dataset.c === D.color) btn.classList.add('on');
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cc').forEach((b) => b.classList.remove('on'));
    btn.classList.add('on');
    D.color = btn.dataset.c;
    upd();
  });
});

// Add Item Buttons
$('addExp').onclick = () => { D.exp.push({ role: '', company: '', loc: '', start: '2023', end: 'Present', bullets: '' }); renderLists(); upd(); };
$('addProj').onclick = () => { D.proj.push({ name: '', tech: '', desc: '' }); renderLists(); upd(); };$('addEdu').onclick = () => { D.edu.push({ school: '', degree: '', loc: '', year: '2023' }); renderLists(); upd(); };
$('addSkills').onclick = () => { D.skills.push({ cat: 'Category', items: '' }); renderLists(); upd(); };$('addCerts').onclick = () => { D.certs.push({ name: '', issuer: '', year: '2024' }); renderLists(); upd(); };

// Reset Handler
$('reset').onclick = () => {
  if (confirm('Sample data se reset karna hai? Current changes hat jayenge.')) {
    localStorage.removeItem(KEY);
    D = JSON.parse(JSON.stringify(SAMPLE));
    ['name', 'title', 'email', 'phone', 'loc', 'li', 'gh', 'summary'].forEach((id) => ($(id).value = D[id] \vert{}\vert{} ''));$('tpl').value = D.tpl;
    document.querySelectorAll('.cc').forEach((b) => b.classList.toggle('on', b.dataset.c === D.color));
    renderLists();
    upd();
  }
};

// High-Def Print Dispatcher
$('print').onclick = () => {
  const originalTitle = document.title;
  const cleanName = (D.name || 'Candidate').trim().replace(/[^a-zA-Z0-9]/g, '_');
  document.title = `${cleanName}_Resume`;

  const doPrint = () => {
    try {
      window.print();
    } catch (e) {
      alert('Ctrl+P dabayein aur Save as PDF chunein.');
    }
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(doPrint);
  } else {
    doPrint();
  }
};

// Initial Start
renderLists();
render();
