'use client';

import { useEffect, useRef } from 'react';

/* =====================================================================
   ✏️  WRITE YOUR FAMILY NOTES HERE
   ---------------------------------------------------------------------
   Each note is one object: { from, message }.
   - Replace the message text with what each person wants to say.
   - Add a person by copying a block; remove one by deleting its block.
   - Keep the commas between objects. Apostrophes are fine.
   ===================================================================== */
const FAMILY_NOTES = [
  { from: 'Mom', message: 'Happy Birthday Ollie! I love you.' },
  { from: 'Dad', message: 'Happy Birthday. My favorite teenager. Love you!' },
  {
    from: 'Robby',
    message:
      'Happy birthday, little bro. Dream big, roll your fruit, scroll on youtube shorts (at the same time).',
  },
  { from: 'Abby', message: 'Fifteen! Happy Birthday!!! Go for a run.' },
];
/* =================== stop editing the notes above =================== */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&family=Caveat:wght@500;600;700&display=swap');

.bc-root{
  --blue:#0058A3;
  --blue-deep:#00417A;
  --yellow:#FFDA1A;
  --paper:#FBFAF6;
  --ink:#16202B;
  --white:#FFFFFF;
  --grid:rgba(0,88,163,0.10);
  --display:"Archivo Black","Arial Black",system-ui,sans-serif;
  --body:"Archivo",system-ui,Arial,sans-serif;
  --hand:"Caveat",ui-rounded,cursive;
  --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  font-family:var(--body);
  color:var(--ink);
  background:var(--paper);
  line-height:1.5;
  -webkit-font-smoothing:antialiased;
}
.bc-root *{box-sizing:border-box;}

/* ---------- HERO ---------- */
.bc-root .hero{
  background:var(--blue);
  color:var(--white);
  padding:34px 26px 64px;
  position:relative;
  overflow:hidden;
}
.bc-root .hero-inner{max-width:860px;margin:0 auto;position:relative;z-index:2;}
.bc-root .tagrow{
  display:flex;align-items:center;justify-content:space-between;
  gap:16px;margin-bottom:54px;
}
.bc-root .badge{
  display:inline-flex;align-items:center;justify-content:center;
  background:var(--yellow);color:var(--blue);
  font-family:var(--display);
  font-size:clamp(20px,4.4vw,30px);
  letter-spacing:0.06em;
  padding:14px 30px;border-radius:999px;
  box-shadow:0 6px 0 rgba(0,0,0,0.12);
  transform:rotate(-2deg);
}
.bc-root .artno{
  font-family:var(--mono);
  font-size:12px;letter-spacing:0.14em;
  color:rgba(255,255,255,0.7);
  text-transform:uppercase;text-align:right;line-height:1.7;
}
.bc-root .eyebrow{
  font-family:var(--mono);
  text-transform:uppercase;letter-spacing:0.24em;
  font-size:12px;color:var(--yellow);margin:0 0 14px;
}
.bc-root h1{
  font-family:var(--display);
  margin:0;line-height:0.94;letter-spacing:-0.01em;
  font-size:clamp(46px,12vw,108px);text-transform:uppercase;
}
.bc-root h1 .yellow{color:var(--yellow);}
.bc-root .subhead{
  margin:24px 0 0;max-width:30ch;
  font-size:clamp(16px,2.4vw,20px);
  color:rgba(255,255,255,0.92);font-weight:500;
}
.bc-root .specs{margin-top:30px;display:flex;flex-wrap:wrap;gap:10px;}
.bc-root .spec{
  font-family:var(--mono);
  font-size:12px;letter-spacing:0.06em;text-transform:uppercase;
  border:1.5px solid rgba(255,255,255,0.45);
  border-radius:999px;padding:7px 14px;color:rgba(255,255,255,0.9);
}
.bc-root .scrollcue{
  margin-top:46px;display:flex;align-items:center;gap:10px;
  font-family:var(--mono);font-size:11px;letter-spacing:0.2em;
  text-transform:uppercase;color:rgba(255,255,255,0.75);
}
.bc-root .scrollcue svg{animation:bc-bob 1.8s ease-in-out infinite;}
@keyframes bc-bob{0%,100%{transform:translateY(0);}50%{transform:translateY(5px);}}

/* ---------- INSTRUCTIONS ---------- */
.bc-root .manual{
  background:
    linear-gradient(var(--grid) 1px,transparent 1px),
    linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:26px 26px;
  background-color:var(--paper);
  padding:60px 26px;
}
.bc-root .manual-head{max-width:860px;margin:0 auto 8px;}
.bc-root .manual-head .eyebrow{color:var(--blue);}
.bc-root .manual-head h2{
  font-family:var(--display);text-transform:uppercase;
  font-size:clamp(26px,5vw,40px);margin:0;line-height:1;color:var(--ink);
}
.bc-root .manual-head p{margin:14px 0 0;max-width:46ch;color:#3c4a57;font-size:16px;}

.bc-root .step{
  max-width:860px;margin:38px auto;
  background:var(--white);
  border:2.5px solid var(--ink);
  border-radius:18px;
  padding:26px 26px 24px;
  display:grid;grid-template-columns:64px 1fr;gap:20px 22px;align-items:start;
  box-shadow:6px 6px 0 rgba(22,32,43,0.10);
}
.bc-root .step-num{
  width:54px;height:54px;border-radius:50%;
  background:var(--blue);color:var(--white);
  font-family:var(--display);font-size:24px;
  display:flex;align-items:center;justify-content:center;
}
.bc-root .step-art{
  grid-column:1 / -1;order:3;
  background:var(--paper);
  border:2px dashed rgba(22,32,43,0.3);
  border-radius:12px;padding:14px;
  display:flex;justify-content:center;align-items:center;
}
.bc-root .step-art svg{width:100%;height:auto;max-height:220px;}
.bc-root .step-body{order:2;}
.bc-root .step-body h3{
  margin:0 0 8px;font-family:var(--body);font-weight:700;
  font-size:clamp(20px,3.4vw,26px);letter-spacing:-0.01em;
}
.bc-root .step-body p{margin:0;color:#3c4a57;font-size:16px;}

.bc-root .gift{
  max-width:860px;margin:38px auto;
  background:var(--blue);color:var(--white);
  border-radius:18px;padding:38px 32px;text-align:center;position:relative;
  box-shadow:6px 6px 0 rgba(0,65,122,0.35);
}
.bc-root .gift .eyebrow{color:var(--yellow);margin-bottom:18px;}
.bc-root .gift blockquote{
  margin:0;font-family:var(--body);font-weight:600;
  font-size:clamp(20px,3.6vw,30px);line-height:1.32;letter-spacing:-0.01em;
}
.bc-root .gift .signoff{
  display:block;margin-top:22px;color:var(--yellow);
  font-family:var(--display);font-size:clamp(15px,2.6vw,19px);
  text-transform:uppercase;letter-spacing:0.04em;
}

/* ---------- FAMILY NOTES ---------- */
.bc-root .note-section{background:var(--yellow);padding:64px 26px;}
.bc-root .note-inner{max-width:900px;margin:0 auto;}
.bc-root .note-section .eyebrow{color:var(--blue-deep);text-align:center;}
.bc-root .note-section h2{
  font-family:var(--display);text-transform:uppercase;text-align:center;color:var(--blue);
  font-size:clamp(24px,4.6vw,36px);margin:0 0 28px;line-height:1;
}
.bc-root .notes-wall{display:grid;grid-template-columns:repeat(2,1fr);gap:30px 26px;margin-top:6px;}
.bc-root .note-card{
  background:var(--white);border-radius:6px;
  padding:34px 30px 30px;position:relative;height:100%;
  box-shadow:0 14px 30px rgba(0,65,122,0.16);
  background-image:repeating-linear-gradient(
    transparent,transparent 33px,rgba(0,88,163,0.14) 33px,rgba(0,88,163,0.14) 34px);
  background-position:0 22px;
}
.bc-root .notes-wall > div:nth-child(4n+1) .note-card{transform:rotate(-1.4deg);}
.bc-root .notes-wall > div:nth-child(4n+2) .note-card{transform:rotate(1.2deg);}
.bc-root .notes-wall > div:nth-child(4n+3) .note-card{transform:rotate(0.7deg);}
.bc-root .notes-wall > div:nth-child(4n)   .note-card{transform:rotate(-0.8deg);}
.bc-root .note-card::before{
  content:"";position:absolute;top:-11px;left:50%;
  width:104px;height:24px;transform:translateX(-50%) rotate(-2deg);
  background:rgba(255,218,26,0.72);box-shadow:0 2px 5px rgba(0,0,0,0.08);
}
.bc-root .notes-wall > div:nth-child(even) .note-card::before{background:rgba(0,88,163,0.18);}
.bc-root .note-msg{
  font-family:var(--hand);font-size:clamp(23px,3.3vw,29px);
  line-height:34px;color:#1d2b5c;margin:0;
}
.bc-root .note-from{
  font-family:var(--hand);font-size:clamp(23px,3.6vw,29px);
  line-height:34px;color:var(--blue);margin:18px 0 0;text-align:right;
}

/* ---------- FOOTER ---------- */
.bc-root footer{background:var(--blue);color:var(--white);text-align:center;padding:46px 26px 54px;}
.bc-root footer .love{
  font-family:var(--display);text-transform:uppercase;
  font-size:clamp(20px,4vw,30px);letter-spacing:0.02em;margin:0;
}
.bc-root footer .love .dot{color:var(--yellow);margin:0 6px;}
.bc-root footer .fine{
  font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;
  color:rgba(255,255,255,0.6);margin:18px auto 0;max-width:44ch;line-height:1.7;
}

/* ---------- reveal animation ---------- */
.bc-root .reveal{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease;}
.bc-root .reveal.in{opacity:1;transform:none;}
.bc-root .draw path,.bc-root .draw line,.bc-root .draw polyline,
.bc-root .draw circle,.bc-root .draw ellipse,.bc-root .draw rect{
  transition:stroke-dashoffset 1.1s ease;
}

@media (max-width:560px){
  .bc-root .step{grid-template-columns:1fr;}
  .bc-root .step-num{order:1;}
  .bc-root .step-body{order:2;}
  .bc-root .tagrow{flex-direction:column;align-items:flex-start;gap:18px;}
  .bc-root .artno{text-align:left;}
  .bc-root .notes-wall{grid-template-columns:1fr;}
}
@media (prefers-reduced-motion:reduce){
  .bc-root *{animation:none !important;}
  .bc-root .reveal{opacity:1;transform:none;transition:none;}
  .bc-root .draw *{stroke-dashoffset:0 !important;transition:none;}
}
`;

export default function BirthdayCard() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Prep SVG strokes for the draw-in effect
    root.querySelectorAll('.draw').forEach((box) => {
      box
        .querySelectorAll('path,line,polyline,circle,ellipse,rect')
        .forEach((el) => {
          try {
            const len = el.getTotalLength();
            el.style.strokeDasharray = len;
            el.style.strokeDashoffset = reduce ? 0 : len;
          } catch (e) {
            /* element has no geometry length; ignore */
          }
        });
    });

    const reveals = root.querySelectorAll('.reveal');

    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach((n) => n.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('in');
          el.querySelectorAll(
            '.draw path,.draw line,.draw polyline,.draw circle,.draw ellipse,.draw rect'
          ).forEach((s) => {
            s.style.strokeDashoffset = 0;
          });
          io.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );

    reveals.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bc-root" ref={rootRef}>
      <style>{STYLES}</style>

      {/* ============ HERO ============ */}
      <header className="hero">
        <div className="hero-inner">
          <div className="tagrow">
            <span className="badge">OLLIE</span>
            <div className="artno">
              ART. NO. 06·15·2026
              <br />
              SELF-ASSEMBLY · 1 PERSON
            </div>
          </div>
          <p className="eyebrow">Now in stock · age fifteen</p>
          <h1>
            Happy
            <br />
            <span className="yellow">15th</span>
            <br />
            Birthday
          </h1>
          <p className="subhead">
            A flat-pack kit of fresh starts, late nights, and a room that's
            finally yours.
          </p>
          <div className="specs">
            <span className="spec">Tools included</span>
            <span className="spec">Some assembly required</span>
            <span className="spec">Built to last</span>
          </div>
          <div className="scrollcue">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
            Open the instructions
          </div>
        </div>
      </header>

      {/* ============ ASSEMBLY INSTRUCTIONS ============ */}
      <main className="manual">
        <div className="manual-head reveal">
          <p className="eyebrow">Assembly instructions</p>
          <h2>How to build a great birthday</h2>
          <p>Three simple steps. No Allen key required (this time).</p>
        </div>

        {/* STEP 1 */}
        <section className="step reveal">
          <div className="step-num">1</div>
          <div className="step-body">
            <h3>Turn fifteen.</h3>
            <p>
              You've already done the hard part. Light the candles and take the
              day off.
            </p>
          </div>
          <div className="step-art draw">
            <svg
              viewBox="0 0 240 130"
              fill="none"
              stroke="#16202B"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Line drawing of a birthday cake with candles"
            >
              <line x1="40" y1="118" x2="200" y2="118" />
              <path d="M64 118 V74 Q64 66 72 66 H168 Q176 66 176 74 V118" />
              <path d="M64 92 q14 10 28 0 t28 0 t28 0 t28 0" />
              <line x1="104" y1="66" x2="104" y2="46" />
              <line x1="120" y1="66" x2="120" y2="42" />
              <line x1="136" y1="66" x2="136" y2="46" />
              <path d="M104 46 q-6 -8 0 -13 q6 5 0 13Z" />
              <path d="M120 42 q-6 -8 0 -13 q6 5 0 13Z" />
              <path d="M136 46 q-6 -8 0 -13 q6 5 0 13Z" />
            </svg>
          </div>
        </section>

        {/* STEP 2 */}
        <section className="step reveal">
          <div className="step-num">2</div>
          <div className="step-body">
            <h3>Open your gift.</h3>
            <p>
              It doesn't come in a box. It comes as a blank wall, an empty
              floor, and total creative control.
            </p>
          </div>
          <div className="step-art draw">
            <svg
              viewBox="0 0 240 130"
              fill="none"
              stroke="#16202B"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Line drawing of a gift box with a bow"
            >
              <rect x="78" y="62" width="84" height="56" rx="5" />
              <line x1="120" y1="62" x2="120" y2="118" />
              <rect x="74" y="50" width="92" height="16" rx="4" />
              <line x1="120" y1="50" x2="120" y2="66" />
              <path d="M120 50 q-22 -26 -34 -10 q-6 10 34 10Z" />
              <path d="M120 50 q22 -26 34 -10 q6 10 -34 10Z" />
              <path d="M188 96 v18 h14" strokeWidth="3" />
            </svg>
          </div>
        </section>

        {/* STEP 3 */}
        <section className="step reveal">
          <div className="step-num">3</div>
          <div className="step-body">
            <h3>Design your new room at Dad's.</h3>
            <p>
              Pick the bed. Place the desk. Choose the colors. It's your space,
              so make it look like you.
            </p>
          </div>
          <div className="step-art draw">
            <svg
              viewBox="0 0 300 150"
              fill="none"
              stroke="#16202B"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Line drawing of a bedroom with a bed, lamp and window"
            >
              <line x1="20" y1="128" x2="280" y2="128" />
              <rect x="40" y="34" width="58" height="42" rx="3" />
              <line x1="69" y1="34" x2="69" y2="76" />
              <line x1="40" y1="55" x2="98" y2="55" />
              <path d="M30 128 V96 H150 V128" />
              <path d="M30 100 H150" />
              <rect x="36" y="84" width="34" height="18" rx="6" />
              <path d="M70 100 q40 -14 80 0" />
              <line x1="190" y1="104" x2="276" y2="104" />
              <line x1="196" y1="104" x2="196" y2="128" />
              <line x1="270" y1="104" x2="270" y2="128" />
              <path d="M210 104 v-20 l16 -12" />
              <path d="M226 72 q10 0 8 10 l-14 2 q-4 -10 6 -12Z" />
              <path d="M256 104 v-16" />
              <path d="M256 92 q-12 -2 -10 -16 q12 2 10 16" />
              <path d="M256 90 q12 -2 10 -18 q-12 2 -10 18" />
            </svg>
          </div>
        </section>

        {/* THE GIFT (exact wording) */}
        <section className="gift reveal">
          <p className="eyebrow">What's included</p>
          <blockquote>
            Happy 15th birthday Ollie! For your birthday we want you to design
            your new bedroom at Dad's!
            <span className="signoff">Love, Mom, Dad, Robby &amp; Abby</span>
          </blockquote>
        </section>
      </main>

      {/* ============ FAMILY NOTES ============ */}
      <section className="note-section">
        <div className="note-inner">
          <p className="eyebrow reveal">From the whole family</p>
          <h2 className="reveal">Notes for you</h2>
          <div className="notes-wall">
            {FAMILY_NOTES.map((note, i) => (
              <div
                className="reveal"
                key={i}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <figure className="note-card">
                  <p className="note-msg">{note.message}</p>
                  <figcaption className="note-from">
                    {'\u2014 ' + note.from}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer>
        <p className="love">
          Mom<span className="dot">·</span>Dad<span className="dot">·</span>
          Robby
          <span className="dot">·</span>Abby
        </p>
        <p className="fine">
          Warranty: love, valid for life. Returns not accepted. This one's a
          keeper.
        </p>
      </footer>
    </div>
  );
}
