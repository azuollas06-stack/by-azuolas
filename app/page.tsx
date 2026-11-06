import Image from "next/image";

import { Intro } from "@/components/intro";
import { Film } from "@/components/film";
import { LogoGrid } from "@/components/logo-grid";
import { Reveal } from "@/components/reveal";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, clientWorks, concepts, films, logos } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  return (
    <>
      <Intro />
      <Reveal />

      <header className="bar">
        <a href="#top" className="mark" aria-label="BY.AZUOLAS, į pradžią">
          BY.AZUOLAS
        </a>
        <nav aria-label="Skiltys">
          <a href="#darbai">Darbai</a>
          <a href="#logotipai">Logotipai</a>
          <a href="#video">Video</a>
          <a href="#paslaugos">Paslaugos</a>
        </nav>
        <a className="pill" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          Parašyti
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow h1">
              <span className="dot" aria-hidden="true" />
              Nepriklausomas dizaineris · Lietuva
            </p>
            <h1 className="h2">Svetainės, el. parduotuvės ir logotipai.</h1>
            <p className="lede h3">
              Esu Ąžuolas. Dirbu vienas, be agentūros: pats kuriu dizainą, programuoju ir paleidžiu. Kalbate tiesiai su
              tuo, kuris daro darbą.
            </p>
            <div className="hero-cta h4">
              <a className="btn" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Aptarti projektą
              </a>
              <a className="link" href="#darbai">
                Žiūrėti darbus ↓
              </a>
            </div>
          </div>
          <figure className="portrait h3">
            <Image
              src="/img/azuolas-bw.webp"
              alt="Ąžuolas dirba prie nešiojamo kompiuterio"
              width={883}
              height={1106}
              priority
              sizes="(min-width: 900px) 30vw, 70vw"
            />
          </figure>
          <a className="gift h4" href="#video">
            <span className="gift-k">Dovana</span>
            <span>
              Prie kiekvienos svetainės nemokamas reklaminis video
              <i>horizontalus svetainei, vertikalus Instagram ir TikTok</i>
            </span>
            <span aria-hidden="true">→</span>
          </a>
        </section>

        <section id="darbai" className="sec" aria-labelledby="dh">
          <div className="sec-head" data-r>
            <h2 id="dh">Darbai</h2>
            <span className="count">{pad(clientWorks.length + concepts.length)}</span>
          </div>

          <h3 className="sub" data-r>
            Klientams
          </h3>
          <div className="clients">
            {clientWorks.map((w, i) => {
              const body = (
                <>
                  <div className="shot">
                    {w.image ? (
                      <Image src={w.image} alt={`${w.name} svetainė`} width={1600} height={785} sizes="(min-width: 900px) 60vw, 100vw" />
                    ) : (
                      <span className="shot-type" aria-hidden="true">
                        {w.domain}
                      </span>
                    )}
                  </div>
                  <div className="meta">
                    <span className="n">{pad(i + 1)}</span>
                    <div>
                      <h4>{w.name}</h4>
                      <p className="kind">{w.kind}</p>
                    </div>
                    <p className="txt">{w.text}</p>
                    <span className="go">{w.url ? `${w.domain} ↗` : w.status}</span>
                  </div>
                </>
              );
              return w.url ? (
                <a key={w.name} className="client" href={w.url} target="_blank" rel="noreferrer" data-r>
                  {body}
                </a>
              ) : (
                <div key={w.name} className="client" data-r>
                  {body}
                </div>
              );
            })}
          </div>

          <h3 className="sub" data-r>
            Koncepcijos <span>Išgalvoti prekės ženklai, kuriuos sukūriau norėdamas parodyti, ką moku. Kiekvieną galima atidaryti.</span>
          </h3>
          <div className="concepts">
            {concepts.map((c, i) => (
              <a key={c.slug} className="concept" href={`/darbai/${c.slug}/index.html`} target="_blank" rel="noopener" data-r>
                <div className="shot">
                  <Image
                    src={`/img/work-${c.slug}.webp`}
                    alt={`${c.name} svetainės pradžia`}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 900px) 46vw, 100vw"
                  />
                </div>
                <div className="cap">
                  <span className="n">{pad(clientWorks.length + i + 1)}</span>
                  <h4>{c.name}</h4>
                  <span className="kind">{c.kind}</span>
                  <p>{c.text}</p>
                  <span className="go">Atidaryti ↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="logotipai" className="sec light" aria-labelledby="lh">
          <div className="sec-head" data-r>
            <h2 id="lh">Logotipai</h2>
            <span className="count">{pad(logos.length)}</span>
          </div>
          <LogoGrid logos={logos} />
        </section>

        <section id="video" className="sec" aria-labelledby="vh">
          <div className="sec-head" data-r>
            <h2 id="vh">Video</h2>
            <span className="count">{pad(films.length)}</span>
          </div>
          <div className="offer" data-r>
            <p className="big">Prie kiekvienos svetainės pridedu reklaminį video. Nemokamai.</p>
            <p>
              Trumpas filmukas apie jūsų naują svetainę: horizontalus jai pačiai ir vertikalus Instagram, TikTok ar
              Facebook istorijoms. Muziką ir tekstus pritaikau jūsų verslui. Žemiau keli pavyzdžiai.
            </p>
          </div>
          <div className="films">
            {films.map((f) => (
              <div key={f.id} data-r>
                <Film film={f} />
              </div>
            ))}
          </div>
        </section>

        <section id="paslaugos" className="sec" aria-labelledby="ph">
          <div className="sec-head" data-r>
            <h2 id="ph">Paslaugos</h2>
          </div>
          <ol className="services">
            <li data-r>
              <h3>Svetainė</h3>
              <p>Vizitinė svetainė arba svetainė su rezervacija. Greita, pritaikyta telefonui, su domenu ir el. paštu.</p>
            </li>
            <li data-r>
              <h3>El. parduotuvė</h3>
              <p>Shopify parduotuvė nuo nulio: prekių puslapiai, apmokėjimas, siuntimas, teisiniai puslapiai ir nuolaidų kodai.</p>
            </li>
            <li data-r>
              <h3>Logotipas ir stilius</h3>
              <p>Logotipas, spalvos ir šriftai, kuriuos galėsite naudoti svetainėje, pakuotėse ir socialiniuose tinkluose.</p>
            </li>
          </ol>
          <p className="incl" data-r>
            Visada įskaičiuota: reklaminis video, pritaikymas telefonui ir paleidimas. Dizainą matote ir patvirtinate prieš man
            pradedant programuoti.
          </p>
        </section>

        <section id="kontaktai" className="contact" aria-labelledby="kh">
          <p className="eyebrow" data-r>
            Kontaktai
          </p>
          <h2 id="kh" data-r>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              {INSTAGRAM_HANDLE}
            </a>
          </h2>
          <p className="note" data-r>
            Greičiausiai atsakau Instagram žinute. Parašykite, kokio projekto reikia, ir aptarsime.
          </p>
        </section>
      </main>

      <footer className="foot">
        <span>© 2026 BY.AZUOLAS</span>
        <span>Ąžuolas · nepriklausomas dizaineris · Lietuva</span>
      </footer>
    </>
  );
}
