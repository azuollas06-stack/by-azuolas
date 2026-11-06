import Image from "next/image";

import { Intro } from "@/components/intro";
import { Motion } from "@/components/motion";
import { Preview } from "@/components/preview";
import { BeforeAfter } from "@/components/before-after";
import { LogoGrid } from "@/components/logo-grid";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, concepts, logos } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");
const MARQUEE = ["Svetainės", "El. parduotuvės", "Logotipai", "Reklaminis video dovanų"];

export default function Home() {
  return (
    <>
      <Intro />
      <Motion />

      <header className="bar">
        <a href="#top" className="mark" aria-label="BY.AZUOLAS, į pradžią">
          BY.AZUOLAS
        </a>
        <nav aria-label="Skiltys">
          <a href="#darbai">Darbai</a>
          <a href="#logotipai">Logotipai</a>
          <a href="#apie">Apie</a>
          <a href="#paslaugos">Paslaugos</a>
        </nav>
        <a className="pill" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          Parašyti
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow h1">
            <span className="dot" aria-hidden="true" />
            Nepriklausomas dizaineris · Lietuva · Priimu naujus projektus
          </p>
          <h1 className="h2">
            Svetainės, kurios <em>atrodo kitaip</em> ir parduoda.
          </h1>
          <div className="hero-row h3">
            <p className="lede">
              Esu Ąžuolas. Kuriu svetaines, el. parduotuves ir logotipus nuo nulio, be šablonų. Dirbu vienas, todėl
              kalbate tiesiai su tuo, kuris daro darbą.
            </p>
            <div className="hero-cta">
              <a className="btn" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Aptarti projektą
              </a>
              <a className="link" href="#darbai">
                Darbai ↓
              </a>
            </div>
          </div>
        </section>

        <div className="reel h4">
          <div className="reel-frame">
            <Preview src="/prev/reel.mp4" poster="/prev/reel.webp" label="Ištraukos iš mano sukurtų svetainių" />
          </div>
        </div>

        <a className="gift" href="#paslaugos" data-r>
          <span className="gift-k">Dovana</span>
          <span>
            Prie kiekvienos svetainės nemokamas reklaminis video
            <i>horizontalus svetainei, vertikalus Instagram ir TikTok</i>
          </span>
          <span aria-hidden="true">→</span>
        </a>

        <div className="marquee" aria-hidden="true">
          <div>
            {[0, 1].map((k) => (
              <span key={k}>
                {MARQUEE.map((m) => (
                  <b key={m}>{m}</b>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section id="darbai" className="sec" aria-labelledby="dh">
          <div className="sec-head" data-r>
            <h2 id="dh">Darbai</h2>
            <span className="count">{pad(2 + concepts.length)}</span>
          </div>

          <h3 className="sub" data-r>
            Klientams
          </h3>
          <div className="clients">
            <article className="client" data-r>
              <BeforeAfter before="/img/passmilte-pries.webp" after="/img/work-passmilte.webp" w={1600} h={785} />
              <div className="meta">
                <span className="n">01</span>
                <div>
                  <h4>Pas Smiltę</h4>
                  <p className="kind">Svetainės atnaujinimas</p>
                </div>
                <p className="txt">
                  Svečių namai Palangoje. Buvo nemokamas 2016 m. šablonas su svetima reklama ir be kainų. Dabar greita
                  svetainė su kambariais, kainomis ir skambučiu vienu paspaudimu. Patempkite rodyklę ir palyginkite.
                </p>
                <a className="go" href="https://passmilte.lt" target="_blank" rel="noreferrer">
                  passmilte.lt ↗
                </a>
              </div>
            </article>
            <a className="client" href="https://petora.lt" target="_blank" rel="noreferrer" data-r data-cursor>
              <div className="shot">
                <Preview src="/prev/petora.mp4" poster="/prev/petora.webp" label="Petora parduotuvė naudojant" />
              </div>
              <div className="meta">
                <span className="n">02</span>
                <div>
                  <h4>Petora</h4>
                  <p className="kind">Shopify parduotuvė</p>
                </div>
                <p className="txt">
                  Augintinių prekių parduotuvė nuo nulio: logotipas, prekių puslapiai, apmokėjimas, teisiniai puslapiai,
                  nuolaidų kodai ir atsiliepimai.
                </p>
                <span className="go">petora.lt ↗</span>
              </div>
            </a>
          </div>

          <h3 className="sub" data-r>
            Koncepcijos <span>Individualus dizainas, sukurtas nuo nulio, be šablonų. Prekės ženklai išgalvoti. Kiekvieną galima atidaryti ir išbandyti.</span>
          </h3>
          <div className="concepts">
            {concepts.map((c, i) => (
              <a
                key={c.slug}
                className={`concept${c.wide ? " wide" : ""}`}
                href={`/darbai/${c.slug}/index.html`}
                target="_blank"
                rel="noopener"
                data-r
                data-cursor
              >
                <div className="shot">
                  <Preview src={`/prev/${c.slug}.mp4`} poster={`/prev/${c.slug}.webp`} label={`${c.name} svetainė naudojant`} />
                  <span className="chip">Individualus dizainas</span>
                </div>
                <div className="cap">
                  <span className="n">{pad(i + 3)}</span>
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

        <section id="apie" className="sec about" aria-labelledby="ah">
          <figure data-r>
            <Image src="/img/azuolas-bw.webp" alt="Ąžuolas dirba prie nešiojamo kompiuterio" width={883} height={1106} sizes="(min-width: 900px) 34vw, 100vw" />
          </figure>
          <div>
            <div className="sec-head" data-r>
              <h2 id="ah">Apie</h2>
            </div>
            <p className="big" data-r>
              Esu nepriklausomas dizaineris. Jokios agentūros, vadybininkų ar perdavimų: idėją, dizainą, programavimą ir
              paleidimą darau pats.
            </p>
            <ul className="facts" data-r>
              <li>
                <b>Nuo nulio</b>Kiekvienas dizainas kuriamas jūsų verslui, ne iš šablono.
              </li>
              <li>
                <b>Matote prieš programuojant</b>Dizainą patvirtinate, tik tada jį paverčiu svetaine.
              </li>
              <li>
                <b>Video dovanų</b>Prie kiekvienos svetainės reklaminis filmukas socialiniams tinklams.
              </li>
            </ul>
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
            Visada įskaičiuota: <b>reklaminis video dovanų</b>, pritaikymas telefonui ir paleidimas.
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
        <p className="foot-mark" aria-hidden="true">
          BY.AZUOLAS
        </p>
        <div className="foot-row">
          <span>© 2026 BY.AZUOLAS</span>
          <span>Ąžuolas · nepriklausomas dizaineris · Lietuva</span>
        </div>
      </footer>
    </>
  );
}
