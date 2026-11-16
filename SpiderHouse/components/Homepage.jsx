import { useMemo, useState } from "react";
import "./Homepage.css";

/* Spider House Solutions – homepage
   Palette: #161616 #fcf8f1 #ffc347 #ff9e1c #c94c09 #7a2e0c
   Put logo.png in your /public folder (used in the footer). */

/* Small house-and-web mark for the nav */
function Mark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="#fcf8f1" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19 20 5l15 14v16H5z" />
      <path d="M20 14v21M12 22l16 13M28 22 12 35M10 28h20" stroke="#ffc347" strokeWidth="1.6" />
    </svg>
  );
}

/* The hero web: spokes + sagging rings, drawn on load, with a spider lowering in */
function Web() {
  const { spokes, rings } = useMemo(() => {
    const cx = 300, cy = 300, n = 9, R = 270;
    const pt = (i, r) => {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    };
    const spokes = Array.from({ length: n }, (_, i) => `M${cx} ${cy}L${pt(i, R).join(" ")}`);
    const rings = [0.2, 0.38, 0.56, 0.75, 0.95].map((k) => {
      let d = "";
      for (let i = 0; i <= n; i++) {
        const [x, y] = pt(i % n, R * k);
        if (i === 0) { d += `M${x} ${y}`; continue; }
        const [mx, my] = pt(i - 0.5, R * k * 0.9); // pull midpoint inward = sag
        d += `Q${mx} ${my} ${x} ${y}`;
      }
      return d;
    });
    return { spokes, rings };
  }, []);

  return (
    <svg className="web" viewBox="0 0 600 600" role="img" aria-label="A spider web with a small spider hanging in it">
      {spokes.map((d, i) => (
        <path key={i} d={d} pathLength="1" className="thread spoke" style={{ animationDelay: `${i * 0.08}s` }} />
      ))}
      {rings.map((d, i) => (
        <path key={i} d={d} pathLength="1" className="thread ring" style={{ animationDelay: `${0.7 + i * 0.25}s` }} />
      ))}
      <g className="drop">
        <line x1="300" y1="-120" x2="300" y2="318" stroke="#fcf8f1" strokeWidth="1.2" />
        <ellipse cx="300" cy="332" rx="11" ry="14" fill="#c94c09" />
        <circle cx="300" cy="316" r="6" fill="#c94c09" />
        {[-1, 1].map((s) =>
          [0, 1, 2, 3].map((j) => (
            <path key={`${s}${j}`} d={`M${300 + s * 8} ${322 + j * 5}q${s * 14} ${-8 + j * 4} ${s * 22} ${6 + j * 8}`}
              stroke="#c94c09" strokeWidth="2" fill="none" strokeLinecap="round" />
          ))
        )}
      </g>
    </svg>
  );
}

const services = [
  ["Business websites", "A clear, fast site that tells people who you are, what you do and how to get in touch."],
  ["Online shops", "Product pages, secure checkout and stock tools your team can manage without a developer."],
  ["Redesigns", "Keep what works, fix what doesn’t. We rebuild slow or dated sites without losing your search rankings."],
  ["Care plans", "Hosting, updates, backups and small edits each month, so your site never goes stale."],
];

const steps = [
  ["Talk", "A free call to learn about your business and your customers."],
  ["Plan", "We agree pages, features, timeline and a fixed price."],
  ["Build", "You see a working version early and give feedback as we go."],
  ["Launch", "We go live, check everything, and stay on hand afterwards."],
];

export default function Homepage() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // TODO: send the form data to your backend or email service
    setSent(true);
  };

  return (
    <div className="sh">
      <div className="wrap">
        <nav className="nav" aria-label="Main">
          <a href="#top" className="brand"><Mark /> SPIDER HOUSE</a>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#process">How we work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="btn line">Get a quote</a>
        </nav>

        <header className="hero" id="top">
          <div>
            <h1>Websites built to catch the right customers.</h1>
            <p>Spider House Solutions designs and builds websites for small businesses. Fixed prices, plain language, and a site you’re proud to send people to.</p>
            <div className="row">
              <a href="#contact" className="btn solid">Start your project</a>
              <a href="#services" className="btn line">See what we build</a>
            </div>
          </div>
          <Web />
        </header>
      </div>

      <section className="section" id="services">
        <div className="wrap">
          <h2>Everything your website needs under one roof.</h2>
          <p className="lead">One small team from first sketch to launch day, and beyond.</p>
          <div className="services">
            {services.map(([t, d]) => (
              <div className="svc" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band" id="process">
        <div className="wrap">
          <h2>Four steps from idea to live site.</h2>
          <ol className="steps">
            {steps.map(([t, d], i) => (
              <li className="step" key={t}>
                <div className="dot">{i + 1}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="wrap contact">
          <div>
            <h2>Tell us about your project.</h2>
            <p className="lead">Share a few details and we’ll reply within one working day with next steps and a rough price.</p>
          </div>
          {sent ? (
            <div className="ok" role="status">Thanks, your message is on its way. We’ll reply within one working day.</div>
          ) : (
            <form onSubmit={submit}>
              <label className="field">Your name<input name="name" required autoComplete="name" /></label>
              <label className="field">Email<input name="email" type="email" required autoComplete="email" /></label>
              <label className="field">What do you need?<textarea name="message" rows="4" required /></label>
              <button type="submit" className="btn solid">Send message</button>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="wrap">
          <img src="/SpiderHouseSol_logo.png" alt="Spider House Solutions – Web Development" />
          <small>© {new Date().getFullYear()} Spider House Solutions</small>
        </div>
      </footer>
    </div>
  );
}
