/* =========================================================
   Resumora - Hybrid Production Core Engine
   ========================================================= */

const KEY = 'resumora_hybrid_v1';

// 100% Clean Sample Data with Masked Number
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

const COLORS = [
  ['#0f172a', 'Slate Black'],
  ['#1e3a8a', 'Navy Blue'],
  ['#0f766e', 'Forest Teal'],
  ['#881337', 'Deep Crimson'],
  ['#581c87', 'Royal Purple'],
  ['#334155', 'Classic Charcoal']
];

const BASIC = [
  ['name', 'Full Name', 1],
  ['title', 'Job Title', 1],
  ['email', 'Email'],
  ['phone', 'Phone Number'],
  ['loc', 'Location', 1],
  ['li', 'LinkedIn'],
  ['gh', 'GitHub / Portfolio']
];

const LISTS = {
  exp: {
    t: 'Work Experience',
    n: 'Position',
    f: [
      ['role', 'Job Title', 1],
      ['company', 'Company'],
      ['loc', 'Location'],
      ['start', 'Start Date'],
      ['end', 'End Date'],
      ['bullets', 'Bullet Points (One per line)', 1, 'ta']
    ]
  },
  proj: {
    t: 'Key Projects',
    n: 'Project',
    f: [
      ['name', 'Project Name'],
      ['tech', 'Tech Stack / URL'],
      ['desc', 'Description', 1, 'ta']
    ]
  },
  edu: {
    t: 'Education',
    n: 'Degree',
    f: [
      ['school', 'School / University', 1],
      ['degree', 'Degree', 1],
      ['loc', 'Location'],
      ['year', 'Years']
    ]
  },
  skills: {
    t: 'Technical Skills',
    n: 'Category',
    f: [
      ['cat', 'Category Name'],
      ['items', 'Skills (Comma separated)', 1]
    ]
  },
  certs: {
    t: 'Certifications',
    n: 'Certification',
    f: [
      ['name', 'Certification Name', 1],
      ['issuer', 'Issuer Organization'],
      ['year', 'Year']
    ]
  }
};

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

function field(k, l, full, ta, v, attr) {
  return `
    <div class="${full ? 'f' : 'h'}">
      <label>${l}</label>
      ${ta ? `<textarea rows="3" ${attr}>${esc(v)}</textarea>` : `<input ${attr} value="${esc(v)}">`}
    </div>
  `;
}

function buildEditor() {
  $('cols').innerHTML = COLORS.map(
    (c) => `<button type="button" class="cc ${D.color === c[0] ? 'on' : ''}" data-c="${c[0]}" title="${c[1]}" style="background:${c[0]}"></button>`
  ).join('');

  $('tpl').value = D.tpl \vert{}\vert{} 'harvard';$('summary').value = D.summary || '';

  $('basic').innerHTML = BASIC.map(
    (b) => field(b[0], b[1], b[2], 0, D[b[0]], `data-k="${b[0]}"`)
  ).join('');

  $('lists').innerHTML = Object.keys(LISTS).map((key) => {
    const L = LISTS[key];
    const items = D[key] || [];
    return `
      <div class="card">
        <h4>${L.t} <button type="button" class="add" data-add="${key}">+ Add</button></h4>
        ${items.map((it, i) => `
          <div class="item">
            <header>
              <span>${L.n}${i + 1}</span>
              <button type="button" class="x" data-del="${key}" data-i="${i}" title="Delete">✕</button>
            </header>
            <div class="g">
              ${L.f.map((f) => field(f[0], f[1], f[2], f[3], it[f[0]], `data-l="${key}" data-i="${i}" data-k="${f[0]}"`)).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

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

// Input Listener
const ed = $('ed');
ed.addEventListener('input', (e) => {
  const t = e.target;
  if (t.id === 'tpl') D.tpl = t.value;
  else if (t.id === 'summary') D.summary = t.value;
  else if (t.dataset.l) D[t.dataset.l][+t.dataset.i][t.dataset.k] = t.value;
  else if (t.dataset.k) D[t.dataset.k] = t.value;
  else return;
  upd();
});

// Click Listener
ed.addEventListener('click', (e) => {
  const t = e.target.closest('button');
  if (!t) return;

  if (t.dataset.c) {
    D.color = t.dataset.c;
    buildEditor();
    upd();
  } else if (t.dataset.add) {
    const o = {};
    LISTS[t.dataset.add].f.forEach((f) => (o[f[0]] = ''));
    D[t.dataset.add].push(o);
    buildEditor();
    upd();
  } else if (t.dataset.del) {
    D[t.dataset.del].splice(+t.dataset.i, 1);
    buildEditor();
    upd();
  }
});

// Reset Handler
$('reset').onclick = () => {
  if (confirm('Sample data se reset karna hai? Aapka current changes hat jayega.')) {
    D = JSON.parse(JSON.stringify(SAMPLE));
    buildEditor();
    upd();
  }
};

// High-Def Print Dispatcher with Font Check & Dynamic File Name
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

// Boot
buildEditor();
render();
