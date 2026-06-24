'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Cloud,
  Download,
  ExternalLink,
  Layers,
  Mail,
  MapPin,
  Network,
  Phone,
  ServerCog,
  ShieldCheck,
  Workflow
} from 'lucide-react';

const email = process.env.NEXT_PUBLIC_EMAIL || 'your.email@example.com';
const phone = process.env.NEXT_PUBLIC_PHONE || '+1 (XXX) XXX-XXXX';
const location = process.env.NEXT_PUBLIC_LOCATION || 'United States';
const linkedIn = process.env.NEXT_PUBLIC_LINKEDIN || '#';
const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || '/resume/Gowtham-Resume.pdf';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const skills = [
  { name: 'Enterprise Routing', value: 'BGP / OSPF / EIGRP', icon: Network },
  { name: 'Cloud Networking', value: 'AWS TGW / Direct Connect / Azure ExpressRoute', icon: Cloud },
  { name: 'Security Engineering', value: 'Palo Alto / ASA / FortiGate / VPN', icon: ShieldCheck },
  { name: 'Automation', value: 'Python / Ansible / REST APIs', icon: Workflow },
  { name: 'Application Delivery', value: 'F5 BIG-IP LTM/GTM', icon: ServerCog },
  { name: 'Monitoring', value: 'SolarWinds / NetFlow / Wireshark', icon: Activity }
];

const experience = [
  ['2024 — Present', 'Comerica Bank', 'Senior Network Engineer', 'Designed secure banking network platforms with Cisco Nexus/Catalyst, AWS hybrid connectivity, Palo Alto, F5, automation, and HA architecture.'],
  ['2022 — 2024', 'Zurich Insurance Group', 'Network Engineer', 'Managed enterprise routing, Palo Alto and ASA firewalls, Azure ExpressRoute, F5 load balancing, SolarWinds, and incident/change operations.'],
  ['2021 — 2022', 'Rockwell Automation', 'Network Engineer', 'Supported industrial network modernization with Cisco, Palo Alto, Azure hybrid connectivity, segmentation, DR readiness, and automation.'],
  ['2020 — 2021', 'Best Buy', 'Network Engineer', 'Supported retail-scale networks, AWS VPC, Direct Connect, Route 53, F5, monitoring, and secure segmentation for distributed environments.'],
  ['2016 — 2019', 'Interra Software', 'Junior Network Engineer', 'Built foundations in routing, switching, Cisco ASA, IPSec VPN, DNS/DHCP, Wireshark, SolarWinds, and ITIL support.']
];

const projects = [
  { title: 'Hybrid Cloud Connectivity Blueprint', text: 'AWS Transit Gateway, Direct Connect, Site-to-Site VPN, Azure VNet, ExpressRoute, private routing, and failover-ready design.' },
  { title: 'Network Automation Runbook', text: 'Python and Ansible workflows for configuration backups, validation, compliance checks, and repeatable provisioning.' },
  { title: 'Secure Enterprise Segmentation', text: 'VLAN, VRF, ACL, firewall zone, and micro-segmentation strategy for isolating critical enterprise workloads.' }
];

function ButtonLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      className={`active-btn inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${primary ? 'bg-forest text-linen' : 'border border-forest/20 bg-white/50 text-forest'}`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-linen text-forest">
      <section className="relative bg-grid">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(131,147,127,.45),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(80,97,72,.22),transparent_30%)]" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#top" className="text-lg font-black tracking-tight">Gowtham<span className="text-moss">.</span></a>
          <div className="hidden items-center gap-2 rounded-full border border-forest/10 bg-white/45 p-1 md:flex">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="active-btn rounded-full px-4 py-2 text-sm font-semibold hover:bg-white/70">{item}</a>
            ))}
          </div>
          <ButtonLink href="/admin">Admin <ArrowRight size={16} /></ButtonLink>
        </nav>

        <div id="top" className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" transition={{ duration: .7 }} variants={fadeUp}>
            <div className="selection-pill mb-5 inline-flex rounded-full px-4 py-2 text-sm font-bold text-linen shadow-soft">Senior Network Engineer • 10+ Years</div>
            <h1 className="max-w-4xl text-5xl font-black leading-[.98] tracking-tight md:text-7xl">Secure, scalable enterprise networks with executive-level polish.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-forest/75">I design, modernize, automate, and secure enterprise network infrastructure across banking, insurance, retail, and manufacturing environments.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={resumeUrl} primary><Download size={18} /> Download Resume</ButtonLink>
              <ButtonLink href="#contact"><Mail size={18} /> Contact Me</ButtonLink>
              <ButtonLink href={linkedIn}><ExternalLink size={18} /> LinkedIn</ButtonLink>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[['35%', 'Latency improvement'], ['30%', 'Manual effort reduced'], ['25%', 'Downtime reduced']].map(([num, label]) => (
                <div key={label} className="glass rounded-3xl p-5 shadow-soft">
                  <div className="text-3xl font-black">{num}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-forest/60">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative">
            <div className="glass rounded-[2.2rem] p-6 shadow-soft">
              <div className="rounded-[1.7rem] bg-forest p-6 text-linen">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-linen/60">Network Command View</p>
                    <h2 className="text-2xl font-black">Enterprise Fabric</h2>
                  </div>
                  <Network className="text-sage" size={36} />
                </div>
                <div className="space-y-4">
                  {['Core Routing', 'Cloud Edge', 'Security Perimeter', 'Automation Control'].map((item, i) => (
                    <motion.div key={item} initial={{ width: '40%' }} animate={{ width: `${88 - i * 8}%` }} transition={{ duration: 1, delay: .4 + i * .12 }} className="rounded-full bg-linen/12 p-3">
                      <div className="flex items-center justify-between text-sm font-semibold"><span>{item}</span><span>{98 - i * 4}%</span></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: .6 }} variants={fadeUp} className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="font-bold uppercase tracking-[.25em] text-moss">About</p><h2 className="mt-3 text-4xl font-black">Built for high-availability environments.</h2></div>
          <p className="text-lg leading-9 text-forest/75">Senior Network Engineer with hands-on experience across Cisco IOS-XE, NX-OS, Juniper, AWS, Azure, Palo Alto, Cisco ASA, Fortinet, F5 BIG-IP, VPN, SD-WAN, monitoring, automation, incident response, and change management.</p>
        </motion.div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="font-bold uppercase tracking-[.25em] text-moss">Capabilities</p><h2 className="mt-3 text-4xl font-black">Core technical strengths</h2></div></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ name, value, icon: Icon }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className="card-hover rounded-[2rem] border border-white/60 bg-white/50 p-6 shadow-soft">
              <Icon className="mb-5 text-moss" size={34} />
              <h3 className="text-xl font-black">{name}</h3>
              <p className="mt-3 leading-7 text-forest/70">{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-6 py-20">
        <p className="font-bold uppercase tracking-[.25em] text-moss">Experience</p>
        <h2 className="mt-3 text-4xl font-black">Enterprise career timeline</h2>
        <div className="mt-10 space-y-5">
          {experience.map(([date, company, role, text], i) => (
            <motion.article key={company} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .04 }} className="card-hover grid gap-5 rounded-[2rem] border border-white/60 bg-white/55 p-6 shadow-soft md:grid-cols-[190px_1fr]">
              <div className="flex items-center gap-3 font-bold text-moss"><CalendarDays size={18} /> {date}</div>
              <div><h3 className="text-2xl font-black">{company}</h3><p className="mt-1 font-bold text-forest/70">{role}</p><p className="mt-3 leading-7 text-forest/70">{text}</p></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-12">
        <p className="font-bold uppercase tracking-[.25em] text-moss">Projects</p>
        <h2 className="mt-3 text-4xl font-black">Portfolio-ready architecture stories</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="card-hover rounded-[2rem] bg-forest p-6 text-linen shadow-soft">
              <Layers className="mb-5 text-sage" />
              <h3 className="text-xl font-black">{project.title}</h3>
              <p className="mt-4 leading-7 text-linen/75">{project.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 rounded-[2.5rem] bg-white/55 p-8 shadow-soft lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="font-bold uppercase tracking-[.25em] text-moss">Contact</p>
            <h2 className="mt-3 text-4xl font-black">Best way to reach me</h2>
            <p className="mt-5 max-w-2xl leading-8 text-forest/70">For a professional portfolio, the best contact flow is: direct email for recruiters, LinkedIn for hiring managers, and a simple contact form after you add EmailJS or Resend credentials.</p>
            <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href={`mailto:${email}`} primary><Mail size={18} /> Email Me</ButtonLink><ButtonLink href={linkedIn}><ExternalLink size={18} /> LinkedIn</ButtonLink></div>
          </div>
          <div className="space-y-4 rounded-[2rem] bg-linen p-6">
            <p className="flex items-center gap-3"><Mail size={18} /> {email}</p>
            <p className="flex items-center gap-3"><Phone size={18} /> {phone}</p>
            <p className="flex items-center gap-3"><MapPin size={18} /> {location}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
