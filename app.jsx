/* global React */
const { useState, useEffect, useRef } = React;

/* ---------- custom cursor ---------- */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    let raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    const hoverables = "a, button, .project, .now-card, .entry, .skill-group li, .writing-item";
    const onOver = (e) => { if (e.target.closest(hoverables) && ringRef.current) ringRef.current.classList.add("hover"); };
    const onOut = (e) => { if (e.target.closest(hoverables) && ringRef.current) ringRef.current.classList.remove("hover"); };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

/* ---------- reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    // Fallback: if IO doesn't fire within 300ms, show everything
    const fallback = setTimeout(() => {
      els.forEach((el) => el.classList.add("in"));
    }, 300);
    let io;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => io.observe(el));
    } catch {
      els.forEach((el) => el.classList.add("in"));
    }
    return () => { clearTimeout(fallback); if (io) io.disconnect(); };
  }, []);
}

/* ---------- typewriter ---------- */
function Typewriter({ phrases, speed = 55, pause = 1600 }) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const cur = phrases[i % phrases.length];
    let delay = deleting ? 28 : speed;
    if (!deleting && text === cur) delay = pause;
    if (deleting && text === "") delay = 240;
    const t = setTimeout(() => {
      if (!deleting && text === cur) setDeleting(true);
      else if (deleting && text === "") { setDeleting(false); setI(i + 1); }
      else setText(deleting ? cur.substring(0, text.length - 1) : cur.substring(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases, speed, pause]);
  return <span>{text}<span className="cursor" /></span>;
}

/* ---------- nav ---------- */
function Nav() {
  const items = [
    { n: "01", href: "#research", label: "Research" },
    { n: "02", href: "#experience", label: "Experience" },
    { n: "03", href: "#projects", label: "Projects" },
    { n: "04", href: "#education", label: "Education" },
    { n: "05", href: "#skills", label: "Skills" },
    { n: "06", href: "#writing", label: "Writing" },
    { n: "07", href: "#contact", label: "Contact" },
  ];
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <span className="brand">Zhirong Lu</span>
        <ul>
          {items.map((i) => (
            <li key={i.href}><a href={i.href} data-num={i.n}>{i.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ---------- hero ---------- */
function Hero({ data }) {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-kicker reveal">
          <span className="dot" />
          <span>Available · Summer 2026 research internships</span>
        </div>
        <div className="hero-grid">
          <div>
            <h1 className="reveal">
              I'm Zhirong —<br />
              I'm <span className="serif-it"><Typewriter phrases={data.headlines} /></span>
            </h1>
            <p className="hero-sub reveal">{data.tagline}</p>
            <div className="hero-actions reveal">
              <a className="btn primary" href="#research">
                See my research <span className="arrow">↗</span>
              </a>
              <a className="btn" href="assets/Zhirong_Lu_Resume.pdf" download>
                Download résumé (PDF)
              </a>
            </div>
          </div>
          <aside className="hero-meta reveal">
            <div className="row"><span className="k">Location</span><span className="v">{data.location}</span></div>
            <div className="row"><span className="k">Status</span><span className="v">UCLA CS, Class of '27</span></div>
            <div className="row"><span className="k">Lab</span><span className="v">Visual Machines Group</span></div>
            <div className="row"><span className="k">Focus</span><span className="v">World models · Evals</span></div>
            <div className="row"><span className="k">Email</span><a href={`mailto:${data.email}`}>{data.email}</a></div>
            <div className="row"><span className="k">GitHub</span><a href={`https://github.com/${data.github}`} target="_blank" rel="noreferrer">@{data.github}</a></div>
            <div className="row"><span className="k">LinkedIn</span><a href={`https://linkedin.com/in/${data.linkedin}`} target="_blank" rel="noreferrer">zhirong-lu</a></div>
          </aside>
        </div>
      </div>
    </header>
  );
}

/* ---------- now ---------- */
function Now({ data }) {
  return (
    <section id="now" className="now">
      <div className="wrap">
        <div className="section-label reveal" data-num="§ 00">Currently</div>
        <div className="now-grid">
          {data.now.map((n, i) => (
            <article key={i} className="now-card reveal">
              <div className="tag">{n.tag}</div>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- entries (shared) ---------- */
function Entry({ e }) {
  return (
    <article className="entry reveal">
      <div className="entry-date">{e.date}</div>
      <div>
        <h3>{e.title} <span className="org">— {e.org}</span></h3>
        <ul>
          {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
      {e.link ? <a className="entry-link" href={e.link.href} target="_blank" rel="noreferrer">{e.link.label}</a> : <span />}
    </article>
  );
}

function Research({ data }) {
  return (
    <section id="research">
      <div className="wrap">
        <div className="section-label reveal" data-num="§ 01">Research</div>
        <div className="entries">
          {data.research.map((e, i) => <Entry key={i} e={e} />)}
        </div>
      </div>
    </section>
  );
}

function Experience({ data }) {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="section-label reveal" data-num="§ 02">Experience</div>
        <div className="entries">
          {data.experience.map((e, i) => <Entry key={i} e={e} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- project placeholder art (abstract, paper-like) ---------- */
function ProjectArt({ accent, num }) {
  const colors = {
    sienna: { bg: "oklch(92% 0.04 60)", fg: "oklch(55% 0.13 38)", stripe: "oklch(85% 0.05 60)" },
    olive:  { bg: "oklch(92% 0.03 110)", fg: "oklch(48% 0.08 125)", stripe: "oklch(85% 0.04 110)" },
    ink:    { bg: "oklch(90% 0.01 80)", fg: "oklch(28% 0.02 60)", stripe: "oklch(84% 0.02 70)" },
    dun:    { bg: "oklch(93% 0.025 75)", fg: "oklch(45% 0.06 50)", stripe: "oklch(86% 0.03 70)" },
  };
  const c = colors[accent] || colors.sienna;
  // Different abstract compositions per project
  const compositions = {
    "01": (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="200" fill={c.bg} />
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={i * 16} y1="0" x2={i * 16 + 40} y2="200" stroke={c.stripe} strokeWidth="1" />
        ))}
        <circle cx="110" cy="100" r="52" fill="none" stroke={c.fg} strokeWidth="1.5" />
        <circle cx="110" cy="100" r="32" fill="none" stroke={c.fg} strokeWidth="1" />
        <circle cx="110" cy="100" r="4" fill={c.fg} />
        <rect x="180" y="60" width="100" height="80" fill="none" stroke={c.fg} strokeWidth="1.5" />
        <line x1="180" y1="100" x2="280" y2="100" stroke={c.fg} strokeWidth="1" strokeDasharray="3 3" />
        <text x="20" y="184" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={c.fg} letterSpacing="1.5">FIG. 01 — AGENT/ENV LOOP</text>
      </svg>
    ),
    "02": (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="200" fill={c.bg} />
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, col) => {
            const cx = 30 + col * 22;
            const cy = 30 + r * 20;
            const size = 4 + Math.abs(Math.sin(r + col * 0.5)) * 8;
            return <circle key={`${r}-${col}`} cx={cx} cy={cy} r={size} fill={c.fg} opacity={0.15 + 0.6 * Math.abs(Math.sin(col * 0.4 + r * 0.3))} />;
          })
        )}
        <text x="20" y="190" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={c.fg} letterSpacing="1.5">FIG. 02 — SAMPLE GRID</text>
      </svg>
    ),
    "03": (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="200" fill={c.bg} />
        <path d="M0,140 Q80,60 160,110 T320,90" fill="none" stroke={c.fg} strokeWidth="2" />
        <path d="M0,160 Q80,100 160,130 T320,120" fill="none" stroke={c.fg} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        {Array.from({ length: 32 }).map((_, i) => (
          <line key={i} x1={i * 10} y1="170" x2={i * 10} y2={170 - (i % 5) * 4 - 4} stroke={c.fg} strokeWidth="1" />
        ))}
        <circle cx="80" cy="92" r="4" fill={c.fg} />
        <circle cx="160" cy="110" r="4" fill={c.fg} />
        <circle cx="240" cy="98" r="4" fill={c.fg} />
        <text x="20" y="190" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={c.fg} letterSpacing="1.5">FIG. 03 — FAILURE MODE CURVE</text>
      </svg>
    ),
    "04": (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="200" fill={c.bg} />
        <g transform="translate(60, 100)">
          {[0, 1, 2].map((layer) => (
            <g key={layer}>
              {[0, 1, 2, 3].map((n) => (
                <circle key={n} cx={layer * 60} cy={n * 22 - 33} r="7" fill="none" stroke={c.fg} strokeWidth="1.2" />
              ))}
              {layer < 2 && [0, 1, 2, 3].map((a) => [0, 1, 2, 3].map((b) => (
                <line key={`${a}-${b}`} x1={layer * 60 + 7} y1={a * 22 - 33} x2={(layer + 1) * 60 - 7} y2={b * 22 - 33} stroke={c.fg} strokeWidth="0.4" opacity="0.5" />
              )))}
            </g>
          ))}
        </g>
        <rect x="240" y="60" width="60" height="80" fill="none" stroke={c.fg} strokeWidth="1.2" />
        <line x1="250" y1="80" x2="290" y2="80" stroke={c.fg} strokeWidth="0.8" />
        <line x1="250" y1="95" x2="285" y2="95" stroke={c.fg} strokeWidth="0.8" />
        <line x1="250" y1="110" x2="280" y2="110" stroke={c.fg} strokeWidth="0.8" />
        <line x1="250" y1="125" x2="275" y2="125" stroke={c.fg} strokeWidth="0.8" />
        <text x="20" y="190" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={c.fg} letterSpacing="1.5">FIG. 04 — MDN → NLG</text>
      </svg>
    ),
  };
  return compositions[num] || compositions["01"];
}

function Projects({ data }) {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-label reveal" data-num="§ 03">Selected Projects</div>
        <div className="project-grid">
          {data.projects.map((p, i) => {
            const Inner = (
              <>
                <div className="project-media">
                  <ProjectArt accent={p.accent} num={p.num} />
                </div>
                <div className="project-body">
                  <h3><span className="num">{p.num}</span>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="stack">
                    {p.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </>
            );
            return p.link ? (
              <a key={i} className="project reveal" href={p.link} target="_blank" rel="noreferrer">{Inner}</a>
            ) : (
              <article key={i} className="project reveal">{Inner}</article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- education + awards ---------- */
function Education({ data }) {
  return (
    <section id="education">
      <div className="wrap">
        <div className="section-label reveal" data-num="§ 04">Education & Awards</div>
        <div className="two-col">
          <div className="reveal">
            {data.education.map((e, i) => (
              <div className="edu-item" key={i}>
                <h3>{e.degree}</h3>
                <div className="meta">{e.school} · {e.meta}</div>
                <p><strong style={{ color: "var(--ink)" }}>Coursework:</strong> {e.coursework}</p>
              </div>
            ))}
          </div>
          <div className="reveal">
            <h4 style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "var(--ink-mute)",
              margin: "0 0 16px", fontWeight: 500
            }}>Honors</h4>
            <ul className="awards-list">
              {data.awards.map((a, i) => (
                <li key={i}><span>{a.title}</span><span className="year">{a.year}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- skills ---------- */
function Skills({ data }) {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-label reveal" data-num="§ 05">Skills</div>
        <div className="skills-grid">
          {data.skills.map((s, i) => (
            <div className="skill-group reveal" key={i}>
              <h4>{s.group}</h4>
              <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- writing ---------- */
function Writing({ data }) {
  return (
    <section id="writing">
      <div className="wrap">
        <div className="section-label reveal" data-num="§ 06">Writing</div>
        <div className="writing-list">
          {data.writing.map((w, i) => (
            <a key={i} className="writing-item reveal" href="#writing" onClick={(e) => e.preventDefault()}>
              <span className="date">{w.date}</span>
              <h3>{w.title}</h3>
              <span className="status">{w.status}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact({ data }) {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="section-label reveal" data-num="§ 07" style={{ justifyContent: "center" }}>Contact</div>
        <h2 className="reveal">If any of this resonates, I'd love to talk.</h2>
        <a className="mail reveal" href={`mailto:${data.email}`}>{data.email}</a>
        <p className="sub reveal">Especially open to AI-lab internships, research collabs, and world-model / eval work.</p>
        <div className="contact-links reveal">
          <a href={`https://github.com/${data.github}`} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={`https://linkedin.com/in/${data.linkedin}`} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://world-bench.github.io" target="_blank" rel="noreferrer">WorldBench ↗</a>
          <a href="assets/Zhirong_Lu_Resume.pdf" download>Résumé PDF ↓</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- root ---------- */
function App() {
  useReveal();
  const data = window.SITE_DATA;
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero data={data} />
        <Now data={data} />
        <Research data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Education data={data} />
        <Skills data={data} />
        <Writing data={data} />
        <Contact data={data} />
      </main>
      <footer>
        © {new Date().getFullYear()} Zhirong (Ron) Lu · Set in Instrument Serif, Newsreader &amp; JetBrains Mono · Built with care
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
