import React, { useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Clock, CreditCard, FileText, Mail, MapPin, Menu, Phone, Play, Printer, X } from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";
import logo from "./assets/ae-logo.png";

// ------------------------------------------------------------ Content (from aeweldshop.com)
const COMPANY = "A&E Technologies, LLC";
const ABBR = "aet";
const END_DATE = "2026-11-25T23:59:59-07:00";
const ORIGINAL = "http://aeweldshop.com/";

const PHONE = "(303) 278-1980";
const PHONE_TEL = "+13032781980";
const FAX = "(303) 278-7454";
const EMAIL = "info@aeweldshop.com";
const METAL_EMAIL = "TKilworth@qwestoffice.net";
const ADDRESS = ["14252 W 44th Avenue #A", "Golden, CO 80403"];
const HOURS = "7:30am – 4:00pm, Monday – Friday";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=A%26E+Technologies+14252+W+44th+Ave+Golden+CO+80403";
const MAP_EMBED = "https://www.google.com/maps?q=14252+W+44th+Ave,+Golden,+CO+80403&output=embed";
const GOOGLE_REVIEWS = "https://www.google.com/search?q=A%26E+Technologies+LLC+Golden+CO+reviews";
const DREAM_CHASER_VIDEO = "https://www.youtube.com/watch?v=jgfO6D-dNx8";

const photo = (file) => new URL(`./assets/photos/${file}`, import.meta.url).href;

const NAV = [
  ["Capabilities", "#capabilities"],
  ["Projects", "#projects"],
  ["Metal for sale", "#metal"],
  ["About", "#about"],
  ["Careers", "#careers"],
  ["Contact", "#contact"],
];

const SERVICES = [
  {
    code: "P-01", name: "Welding", photo: "welding-golden-colorado.jpg",
    text: "Welding is the heart of what we do. AWS-certified welders handle steel, aluminum and stainless steel projects, on budget and on time.",
    specs: ["TIG", "MIG", "Spot", "Spray arc"],
  },
  {
    code: "P-02", name: "Flame & plasma cutting", photo: "service-flamecutterbig.jpg",
    text: "Computer-controlled (CNC) flame and plasma cutters for one-off parts or larger quantities, with consistent, accurate cuts.",
    specs: ['Flame: steel to 4"', 'Plasma: alum./steel to 2"', "10 × 10 ft beds"],
  },
  {
    code: "P-03", name: "Metal fabrication", photo: "metalfabbig.jpg",
    text: "Plate and sheet bending, forming, shearing, punching, drilling and saw cutting, on CNC and precision manual machines.",
    specs: ['Shear ¼" × 12 ft', "Common & specialty alloys"],
  },
  {
    code: "P-04", name: "Machining & milling", photo: "services-machining-milling.jpg",
    text: "Precision milling and turning from prototype to production scale, on CNC milling equipment and precision manual machines.",
    specs: ["CNC milling", "Turning", "Prototype → production"],
  },
  {
    code: "P-05", name: "Structural work", photo: "project-tubeframe.jpg",
    text: "Tube frames, platforms, stairs and custom structural components for business, industrial and manufacturing applications.",
    specs: ["Tube frames", "Platforms", "Stairs"],
  },
  {
    code: "P-06", name: "Manufacturing services", photo: "cnc-punchbig.jpg",
    text: "Punching, shearing, sawing, drilling, plasma and flame cutting and machining, so parts fit and work the first time, one part or dozens.",
    specs: ["Punch", "Shear", "Saw", "Drill"],
  },
  {
    code: "P-07", name: "Architectural metal", photo: "architectural-metal.jpg",
    text: "Custom railings, steel decks, wine racks, metal countertops and more for your home or business, built the way you picture it.",
    specs: ["Railings", "Steel decks", "Countertops"],
  },
];

const CAPACITY = [
  ["CNC flame cutting", "Steel plate", '4"', "10 × 10 ft"],
  ["CNC plasma cutting", "Aluminum or steel", '2"', "10 × 10 ft"],
  ["Shearing", "Carbon steel plate", '¼"', "12 ft"],
];

const PROJECTS = [
  ["project-hydraulic-tankbig.jpg", "Aluminum hydraulic tank", "Exacting craftsmanship, great weld lines and superior attention to detail."],
  ["project-tubeframebig.jpg", "Industrial tube frame", "Jobs large and small for the manufacturing industry, with the same consistent quality."],
  ["project-fairleadsupportbig.jpg", "Fairlead support", "Quality machine work. Bring us your idea and your plan."],
  ["project-truckbedbig.jpg", "Truck bed project", "We can modify existing equipment to handle many needs."],
  ["project-teebrace-big.jpg", "Tee brace", "If you need a brace, chances are we can make it to fit your requirements."],
  ["project-structuralweldingbig.jpg", "Wall panel for tube frame", "Structural welding for the manufacturing industry."],
  ["project-trianglebig.jpg", "Triangle base", "Clean cuts, accurate drilling, perfect bends."],
  ["project-unbrellabig.jpg", "Heavy-duty umbrella bracket", "A unique part, a special shape or size: that's part of what we do."],
  ["project-pumphousingbig.jpg", "Industrial coupling housing", "Formed shapes with stylish metal work and quality welding."],
  ["project-turnbucklebig.jpg", "Turnbuckles", "Machine work with parts tailored to your specifications."],
  ["project-railroadbracebig.jpg", "Railroad brace", "Industry-specific parts for the transportation sector."],
  ["project-tubeextensionbig.jpg", "Tube extensions", "Parts that aren't on the shelf, with spot-on drilling and quality welding."],
  ["project-cylinder-lugs-small.jpg", "Cylinder lugs", "Parts that may not be readily available, made to fit your requirements."],
  ["project-standsmall.jpg", "Retail mannequin stand", "Practical parts made with care: an elegant stand for a retail display."],
];

const INDUSTRIES = ["Aerospace", "Manufacturing", "Transportation", "Automation", "Communications", "Construction", "Food service", "Government", "Merchandising", "Railroad", "Oil & gas"];

const PROCESSES = ["Welding", "Flame / plasma cutting", "Fabrication", "Machining", "Structural", "Architectural", "Repair / modify", "Buy metal stock"];
const MATERIALS = ["Carbon steel", "Stainless steel", "Aluminum", "Hot rolled", "Cold rolled", "Other / not sure"];
const QUANTITIES = ["One-off / repair", "Prototype", "2 – 10 parts", "11 – 100 parts", "Production run"];

const STOCK = {
  materials: ["Hot rolled", "Cold rolled", "Stainless steel", "Aluminum"],
  shapes: ["Tube", "Bar", "Sheet", "Plate", "Structural"],
};

const PARTNERS = [
  ["Welding & Joining Management Group", "Dr. Jessie Grantham: a pre-eminent resource in the management of materials joining.", "http://www.wjmg.com/"],
  ["General Air", "The largest independent gas and welding distributor in Colorado.", "http://www.generalair.com/"],
  ["Hanson & Co. CPAs", "Working with Denver-area individuals and privately held businesses for 40+ years.", "http://www.hanson-cpa.com/"],
  ["Union Bearing", "Quality power transmission components for industrial applications.", "http://www.goldenindustrial.com/"],
];

const PERKS = ["One-on-one training and coaching", "Industry state-of-the-art equipment", "Supportive, team-oriented shop", "Culture of safety", "Payroll direct deposit", "Convenient Denver metro location"];

// ------------------------------------------------------------ Motifs
function WeldBead({ tone = "light" }) {
  const id = `bead-${tone}`;
  return (
    <div className={`weld-bead weld-bead--${tone}`} aria-hidden="true">
      <svg width="100%" height="26">
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b4552" />
            <stop offset=".32" stopColor="#b9c2cc" />
            <stop offset=".5" stopColor="#eef1f4" />
            <stop offset=".68" stopColor="#a3adb8" />
            <stop offset="1" stopColor="#2f3842" />
          </linearGradient>
          <linearGradient id={`${id}-heat`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff7a1a" stopOpacity="0" />
            <stop offset=".25" stopColor="#ffb347" stopOpacity=".55" />
            <stop offset=".55" stopColor="#2488fe" stopOpacity=".45" />
            <stop offset=".85" stopColor="#ffb347" stopOpacity=".4" />
            <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
          </linearGradient>
          <pattern id={`${id}-ripple`} width="12" height="26" patternUnits="userSpaceOnUse">
            <path d="M2 5 Q 11 13 2 21" fill="none" stroke="#1d242c" strokeOpacity=".42" strokeWidth="1.3" />
            <path d="M4 7 Q 10 13 4 19" fill="none" stroke="#ffffff" strokeOpacity=".5" strokeWidth=".8" />
          </pattern>
        </defs>
        <rect x="0" y="1" width="100%" height="24" rx="12" fill={`url(#${id}-heat)`} />
        <rect x="0" y="5" width="100%" height="16" rx="8" fill={`url(#${id}-fill)`} />
        <rect x="0" y="5" width="100%" height="16" fill={`url(#${id}-ripple)`} />
      </svg>
    </div>
  );
}

function Sparks({ count = 14 }) {
  return (
    <span className="sparks" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} style={{ "--a": `${-150 + i * 23}deg`, "--d": `${(i % 5) * 0.23}s`, "--l": `${46 + (i * 17) % 60}px` }} />
      ))}
    </span>
  );
}

function Eyebrow({ children, dark }) {
  return <span className={`eyebrow${dark ? " eyebrow--dark" : ""}`}>{children}</span>;
}

// ------------------------------------------------------------ Header
function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  return (
    <>
      <div className="utility">
        <div className="wrap utility-row">
          <span><Clock size={14} /> {HOURS}</span>
          <span className="utility-mid">No minimum shop charge · Walk-ins welcome</span>
          <a href={`tel:${PHONE_TEL}`}><Phone size={14} /> {PHONE}</a>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap header-row">
          <a className="brand" href="#top" aria-label="A&E Technologies home">
            <img src={logo} alt="A&E Technologies, LLC" width="288" height="37" />
            <span className="brand-sub">Weld · Fab · CNC — Golden, Colorado</span>
          </a>
          <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
            {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a className="btn btn--spark nav-cta" href="#quote" onClick={() => setOpen(false)}>Request a quote</a>
          </nav>
          <button type="button" className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </>
  );
}

// ------------------------------------------------------------ Hero (shop drawing)
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Eyebrow dark>Welding · Fabrication · CNC machining · Golden, CO</Eyebrow>
          <h1>Big enough to serve you. <span>Small enough to know you.</span></h1>
          <p className="hero-lede">AWS-certified welders, CNC flame and plasma cutting, fabrication and machining at 14252 W 44th Avenue in Golden. Jobs big and small, from aerospace frames to a frying pan handle.</p>
          <div className="hero-ctas">
            <a className="btn btn--spark" href="#quote">Request a free quote <ArrowRight size={18} /></a>
            <a className="btn btn--ghost" href={`tel:${PHONE_TEL}`}><Phone size={18} /> {PHONE}</a>
          </div>
          <ul className="hero-notes">
            <li>No-cost consultation and job estimates</li>
            <li>No minimum shop charge</li>
            <li>Walk-in customers always welcome</li>
          </ul>
        </div>

        <figure className="hero-sheet">
          <div className="dim dim--top" aria-hidden="true"><span>TIG · MIG · SPOT · SPRAY ARC</span></div>
          <div className="dim dim--side" aria-hidden="true"><span>STEEL · ALUM · STAINLESS</span></div>
          <div className="hero-photo">
            <img src={photo("welding_golden-colorado.jpg")} alt="Welding sparks at the A&E Technologies shop" />
            <Sparks />
            <span className="callout callout--1" aria-hidden="true">1</span>
            <span className="callout callout--2" aria-hidden="true">2</span>
          </div>
          <figcaption className="title-block">
            <div className="tb-cell tb-wide"><small>Shop</small><strong>A&amp;E Technologies, LLC</strong></div>
            <div className="tb-cell"><small>Dwg no.</small><strong>AE-001</strong></div>
            <div className="tb-cell"><small>1 · Welders</small><strong>AWS certified</strong></div>
            <div className="tb-cell"><small>2 · Min. charge</small><strong>None</strong></div>
            <div className="tb-cell"><small>Hours</small><strong>7:30–4:00 M–F</strong></div>
            <div className="tb-cell tb-wide"><small>Location</small><strong>14252 W 44th Ave #A, Golden CO</strong></div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function SpecStrip() {
  const items = [
    ['4"', "steel plate on the CNC flame cutter"],
    ['2"', "aluminum or steel on the CNC plasma"],
    ["10×10", "ft cutting beds"],
    ['¼"×12′', "carbon steel shear"],
    ["AWS", "certified welders"],
  ];
  return (
    <div className="spec-strip">
      <div className="wrap spec-row">
        {items.map(([big, small]) => (
          <div className="spec" key={big}><strong>{big}</strong><span>{small}</span></div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------ Capabilities
function Capabilities() {
  return (
    <section className="section capabilities" id="capabilities">
      <div className="wrap cap-grid">
        <div className="cap-intro">
          <Eyebrow>Capabilities · 7 processes</Eyebrow>
          <h2>More than a weld shop. A <em>solution</em> shop.</h2>
          <p>Steel, aluminum and stainless, prototype to production, one part or dozens. CNC equipment plus precision manual machines, run by experienced welders, machinists and fabricators.</p>
          <a className="btn btn--steel" href="#quote">Describe your job <ArrowRight size={18} /></a>
          <div className="cap-quote">"We'll keep the torch on for you."</div>
        </div>
        <ol className="cap-list">
          {SERVICES.map((s) => (
            <li className="cap-card" key={s.code}>
              <img src={photo(s.photo)} alt={s.name} loading="lazy" />
              <div className="cap-body">
                <span className="cap-code">{s.code}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <div className="chips">{s.specs.map((x) => <span key={x}>{x}</span>)}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CapacityChart() {
  return (
    <section className="capacity" aria-labelledby="capacity-title">
      <div className="wrap">
        <div className="capacity-head">
          <Eyebrow dark>Shop capacity chart</Eyebrow>
          <h2 id="capacity-title">Will it fit on our tables? Check here first.</h2>
        </div>
        <div className="capacity-table" role="table" aria-label="Cutting and shearing capacity">
          <div className="ct-row ct-head" role="row">
            <span role="columnheader">Process</span><span role="columnheader">Material</span><span role="columnheader">Max thickness</span><span role="columnheader">Max size</span>
          </div>
          {CAPACITY.map((row) => (
            <div className="ct-row" role="row" key={row[0]}>
              {row.map((cell, i) => <span role="cell" key={i} data-label={["Process", "Material", "Max thickness", "Max size"][i]}>{cell}</span>)}
            </div>
          ))}
        </div>
        <p className="capacity-note">Welding: TIG, MIG, spot and spray arc on steel, aluminum and stainless, jobs large or small. Bigger or unusual job? Call {PHONE} and talk it through.</p>
      </div>
    </section>
  );
}

function DreamChaser() {
  return (
    <section className="dream" aria-labelledby="dream-title">
      <div className="wrap dream-grid">
        <div className="dream-photo">
          <img src={photo("project-spaceshuttlebig.jpg")} alt="Dream Chaser spacecraft on its A&E-built transport frame" loading="lazy" />
          <span className="dream-tag">Featured project</span>
        </div>
        <div className="dream-copy">
          <Eyebrow>Aerospace</Eyebrow>
          <h2 id="dream-title">Doing our part to keep America in space.</h2>
          <p>A&amp;E built the test flight support hanger, transport frame and tongue for the Dream Chaser space project: quality welding and fabrication from a shop on W 44th Avenue.</p>
          <a className="btn btn--steel" href={DREAM_CHASER_VIDEO} target="_blank" rel="noopener noreferrer"><Play size={18} /> Watch the components in action</a>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------ Projects gallery
function Projects() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const step = useCallback((d) => setActive((i) => (i + d + PROJECTS.length) % PROJECTS.length), []);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [active, close, step]);

  return (
    <section className="section projects" id="projects">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow>From the shop floor · {PROJECTS.length} parts</Eyebrow>
            <h2>Parts you can't buy off the shelf.</h2>
          </div>
          <p>Tanks, frames, braces, brackets and housings made in Golden. Tap any part for a closer look.</p>
        </div>
        <ul className="gallery">
          {PROJECTS.map(([file, title], i) => (
            <li key={file} className={i === 0 || i === 3 ? "is-wide" : ""}>
              <button type="button" onClick={() => setActive(i)} aria-label={`View ${title}`}>
                <img src={photo(file)} alt={title} loading="lazy" />
                <span className="part-no">No. {String(i + 1).padStart(2, "0")}</span>
                <span className="part-name">{title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={PROJECTS[active][1]} onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <button type="button" className="lb-close" onClick={close} aria-label="Close"><X size={26} /></button>
          <button type="button" className="lb-nav lb-prev" onClick={() => step(-1)} aria-label="Previous part"><ChevronLeft size={30} /></button>
          <figure>
            <img src={photo(PROJECTS[active][0])} alt={PROJECTS[active][1]} />
            <figcaption><strong>No. {String(active + 1).padStart(2, "0")} · {PROJECTS[active][1]}</strong><span>{PROJECTS[active][2]}</span></figcaption>
          </figure>
          <button type="button" className="lb-nav lb-next" onClick={() => step(1)} aria-label="Next part"><ChevronRight size={30} /></button>
        </div>
      )}
    </section>
  );
}

function Industries() {
  return (
    <section className="industries" aria-label="Industries served">
      <div className="wrap industries-row">
        <span className="ind-label">Industries served</span>
        <ul>{INDUSTRIES.map((x) => <li key={x}>{x}</li>)}</ul>
        <span className="ind-note">…and neighbors: truck beds, storage lockers, even a frying pan handle.</span>
      </div>
    </section>
  );
}

// ------------------------------------------------------------ Quote request (material / process)
function QuoteForm() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", process: [], material: "", thickness: "", quantity: "", date: "", notes: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (p) => setForm((f) => ({ ...f, process: f.process.includes(p) ? f.process.filter((x) => x !== p) : [...f.process, p] }));

  async function submit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, process: form.process.join(", ") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "That didn't send. Please call us instead.");
      setStatus(data.demo ? "demo" : "sent");
    } catch (err) {
      setStatus("error");
      setMsg(err.message || "That didn't send. Please call us instead.");
    }
  }

  return (
    <section className="section quote" id="quote">
      <div className="wrap quote-grid">
        <aside className="quote-side">
          <Eyebrow dark>Work order · Free estimate</Eyebrow>
          <h2>Tell us what you're building.</h2>
          <p>Pick the processes and material, give a rough size and quantity, and the shop will get back to you with a no-cost estimate.</p>
          <ul className="quote-facts">
            <li><Phone size={18} /><span>Rather talk it through? <a href={`tel:${PHONE_TEL}`}>{PHONE}</a></span></li>
            <li><FileText size={18} /><span>Have a drawing or sketch? Email it to <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></li>
            <li><MapPin size={18} /><span>Or bring the part by. Walk-ins are always welcome, {HOURS.replace(", ", " ")}.</span></li>
            <li><CreditCard size={18} /><span>No minimum shop charge. Visa and MasterCard accepted.</span></li>
          </ul>
        </aside>

        <div className="work-order">
          <div className="wo-head"><span>A&amp;E Technologies · Quote request</span><span>Form WO-1</span></div>
          {status === "sent" || status === "demo" ? (
            <div className="wo-done" role="status">
              <CheckCircle2 size={44} />
              <h3>{status === "demo" ? "Got it (concept demo)." : "Request sent. Thank you!"}</h3>
              <p>{status === "demo" ? "This concept isn't connected to the shop's inbox yet, so nothing was sent. On the live site this request goes straight to A&E." : "The shop will follow up with your estimate."} For anything urgent call <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="wo-form">
              <fieldset className="wo-process">
                <legend>1 · Process <small>(pick any)</small></legend>
                <div className="pills">
                  {PROCESSES.map((p) => (
                    <label key={p} className={form.process.includes(p) ? "is-on" : ""}>
                      <input type="checkbox" checked={form.process.includes(p)} onChange={() => toggle(p)} />{p}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="wo-row">
                <label>2 · Material
                  <select value={form.material} onChange={(e) => set("material", e.target.value)}>
                    <option value="">Select…</option>
                    {MATERIALS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </label>
                <label>3 · Thickness / size
                  <input value={form.thickness} onChange={(e) => set("thickness", e.target.value)} placeholder='e.g. 3/8" plate, 4 × 8 ft' maxLength={120} />
                </label>
              </div>
              <div className="wo-row">
                <label>4 · Quantity
                  <select value={form.quantity} onChange={(e) => set("quantity", e.target.value)}>
                    <option value="">Select…</option>
                    {QUANTITIES.map((q) => <option key={q}>{q}</option>)}
                  </select>
                </label>
                <label>5 · Needed by
                  <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
                </label>
              </div>
              <label>6 · Job details
                <textarea rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)} maxLength={3000} placeholder="What is it, what does it attach to, finish, tolerances…" />
              </label>
              <div className="wo-row">
                <label><span>Name <b className="req">*</b></span><input value={form.name} onChange={(e) => set("name", e.target.value)} required maxLength={120} autoComplete="name" /></label>
                <label><span>Company <small>(optional)</small></span><input value={form.company} onChange={(e) => set("company", e.target.value)} maxLength={120} autoComplete="organization" /></label>
              </div>
              <div className="wo-row">
                <label><span>Phone <b className="req">*</b></span><input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required maxLength={40} autoComplete="tel" /></label>
                <label><span>Email</span><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={254} autoComplete="email" /></label>
              </div>
              <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} /></label></div>
              {msg && <p className="wo-error" role="alert">{msg}</p>}
              <button className="btn btn--spark wo-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Send quote request <ArrowRight size={18} /></>}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------ Metal for sale
function MetalForSale() {
  return (
    <section className="section metal" id="metal">
      <div className="wrap metal-grid">
        <div className="metal-photo">
          <img src={photo("metal-for-sale.png")} alt="Tube and structural metal stock on racks" loading="lazy" />
        </div>
        <div className="metal-copy">
          <Eyebrow>Metal for sale · Cut to size</Eyebrow>
          <h2>Your local source for metal stock.</h2>
          <p>Structural, sheet and plate inventory at competitive prices. Stock can be cut to the size your project needs, so you don't waste material or money. Pick up at the shop in Golden.</p>
          <div className="stock-tags">
            <div><small>Materials</small>{STOCK.materials.map((m) => <span key={m} className="tag">{m}</span>)}</div>
            <div><small>Shapes</small>{STOCK.shapes.map((m) => <span key={m} className="tag tag--steel">{m}</span>)}</div>
          </div>
          <p className="metal-pay"><CreditCard size={16} /> Cash, credit or debit.</p>
          <div className="hero-ctas">
            <a className="btn btn--steel" href={`mailto:${METAL_EMAIL}?subject=Metal%20availability%20and%20pricing`}><Mail size={18} /> Check availability &amp; pricing</a>
            <a className="btn btn--line" href={`tel:${PHONE_TEL}`}><Phone size={18} /> {PHONE}</a>
          </div>
          <div className="for-sale-item">
            <img src={photo("forsale-stairs.jpg")} alt="Two powder-coated industrial stairways with hand rails" loading="lazy" />
            <div>
              <span className="cap-code">Also in the yard</span>
              <strong>Two industrial stairways, platform available</strong>
              <p>New, heavy-duty, professionally powder coated with non-skid treads and hand rails, designed for an 81-inch rise.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------ About / careers / contact
function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about-grid">
        <div className="about-photo">
          <img src={photo("welding-shop-golden-colorado.jpg")} alt="The A&E Technologies building sign in Golden" loading="lazy" />
          <span className="stamp">AWS<br />Certified</span>
        </div>
        <div className="about-copy">
          <Eyebrow>Our story</Eyebrow>
          <h2>A shop that opened with a closure.</h2>
          <p>When the company that employed our owners shut its doors, they decided to open a new, quality welding and fabrication shop to fill a need in Golden's business and residential communities. More than ten years on, the shop keeps growing, thanks to a growing family of customers and a superior group of artisans.</p>
          <p>You're a name and a face here, not just a number. The business is built on consistent quality, excellent customer service, fair pricing and on-time delivery.</p>
          <div className="cert">
            <strong>Certified by the American Welding Society</strong>
            <span>Our welders are AWS certified by Dr. Jessie Grantham of Welding &amp; Joining Management Group, a standard for knowledgeable welders who work safely and efficiently.</span>
          </div>
        </div>
      </div>
      <div className="wrap partners">
        <span className="ind-label">Partners</span>
        <ul>
          {PARTNERS.map(([name, text, url]) => (
            <li key={name}><a href={url} target="_blank" rel="noopener noreferrer"><strong>{name} <ArrowUpRight size={14} /></strong><span>{text}</span></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Careers() {
  return (
    <section className="careers" id="careers">
      <div className="wrap careers-grid">
        <div>
          <Eyebrow dark>Now hiring</Eyebrow>
          <h2>Welders, machinists and fabricators: pull up a bench.</h2>
          <p>A&amp;E looks for skilled, dependable people. Send your qualifications and work experience and the shop will be in touch. Equal Opportunity Employer.</p>
          <a className="btn btn--spark" href={`mailto:${EMAIL}?subject=Employment%20inquiry`}>Send your experience <ArrowRight size={18} /></a>
        </div>
        <ul className="perks">{PERKS.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-card">
          <Eyebrow>Visit the shop</Eyebrow>
          <h2>Stop by. We'll keep the torch on.</h2>
          <dl>
            <div><dt><MapPin size={18} /> Address</dt><dd><a href={MAP_URL} target="_blank" rel="noopener noreferrer">{ADDRESS[0]}<br />{ADDRESS[1]}</a></dd></div>
            <div><dt><Phone size={18} /> Phone</dt><dd><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></dd></div>
            <div><dt><Printer size={18} /> Fax</dt><dd>{FAX}</dd></div>
            <div><dt><Mail size={18} /> Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt><Clock size={18} /> Hours</dt><dd>{HOURS}<br /><small>Walk-ins welcome · no minimum shop charge</small></dd></div>
          </dl>
          <div className="hero-ctas">
            <a className="btn btn--spark" href="#quote">Request a quote</a>
            <a className="btn btn--line" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">Read reviews on Google <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="map-frame">
          <div className="map-fallback"><MapPin size={34} /><strong>{ADDRESS[0]}<br />{ADDRESS[1]}</strong><a href={MAP_URL} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></div>
          <iframe title="Map to A&E Technologies, 14252 W 44th Ave, Golden" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <WeldBead tone="dark" />
      <div className="wrap footer-grid">
        <div>
          <img src={logo} alt="A&E Technologies, LLC" width="288" height="37" className="footer-logo" />
          <p>Welding, metal fabrication and CNC machining in Golden, Colorado. Big enough to serve you, small enough to know you.</p>
        </div>
        <div>
          <h3>Capabilities</h3>
          <ul>{SERVICES.map((s) => <li key={s.code}><a href="#capabilities">{s.name}</a></li>)}</ul>
        </div>
        <div>
          <h3>Shop</h3>
          <ul>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#metal">Metal for sale</a></li>
            <li><a href="#about">About &amp; partners</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#quote">Request a quote</a></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>{ADDRESS[0]}, {ADDRESS[1]}</li>
            <li><a href={`tel:${PHONE_TEL}`}>{PHONE}</a> · Fax {FAX}</li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>{HOURS}</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {COMPANY}. Concept redesign by Blueprint WebStudio · Independent concept · not for official use. Current site: <a href={ORIGINAL}>aeweldshop.com</a></span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#capabilities">Skip to content</a>
      <Header />
      <main>
        <Hero />
        <SpecStrip />
        <Capabilities />
        <CapacityChart />
        <DreamChaser />
        <WeldBead />
        <Projects />
        <Industries />
        <QuoteForm />
        <MetalForSale />
        <WeldBead />
        <About />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
