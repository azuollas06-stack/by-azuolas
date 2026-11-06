// Everything the page lists lives here, so adding a project is one entry, not a layout change.

export const INSTAGRAM_URL = "https://www.instagram.com/by.azuolas/";
export const INSTAGRAM_HANDLE = "@by.azuolas";

export type ClientWork = {
  name: string;
  kind: string;
  text: string;
  image?: string;
  url?: string;
  domain?: string;
  status?: string;
};

export const clientWorks: ClientWork[] = [
  {
    name: "Pas Smiltę",
    kind: "Svetainės atnaujinimas",
    text: "Svečių namai Palangoje. Seną nemokamą šabloną su svetima reklama pakeitė greita svetainė su kambariais, kainomis ir skambučiu vienu paspaudimu.",
    image: "/img/work-passmilte.webp",
    url: "https://passmilte.lt",
    domain: "passmilte.lt",
  },
  {
    name: "Petora",
    kind: "Shopify parduotuvė",
    text: "Augintinių prekių parduotuvė nuo nulio: logotipas, prekių puslapiai, apmokėjimas, teisiniai puslapiai, nuolaidų kodai ir atsiliepimai.",
    image: "/img/work-petora.webp",
    url: "https://petora.lt",
    domain: "petora.lt",
  },
  {
    name: "Drivio",
    kind: "Shopify parduotuvė",
    text: "Vieno produkto parduotuvė automobilio priežiūros prekei: logotipas, produkto puslapis ir apmokėjimas.",
    image: "/img/work-drivio.webp",
    status: "Paruošta, dar neviešinama",
  },
];

export type Concept = { slug: string; name: string; kind: string; text: string };

export const concepts: Concept[] = [
  { slug: "silas", name: "ŠILAS", kind: "Žvakių parduotuvė", text: "3D žvakė, kuri slenkant užgęsta, ir simuliuoti dūmai." },
  { slug: "ausrine", name: "AUŠRINĖ", kind: "Mechaninis laikrodis", text: "Gyvas Vilniaus laikas, 3D apžiūra pele ir išardymas." },
  { slug: "psst", name: "PŠŠT!", kind: "Gazuoti gėrimai", text: "Sukiojama skardinė ir keturi skonių pasauliai." },
  { slug: "tyla", name: "TYLA", kind: "Kotedžų kvartalas", text: "Paspaudžiamas sklypų žemėlapis, diena ir vakaras." },
  { slug: "tamsa", name: "TAMSA", kind: "Muzikos festivalis", text: "Gyvas plakatas ir naršyklėje kuriama muzika." },
  { slug: "kirpykla", name: "Aušros 14", kind: "Kirpykla", text: "Kainos ir registracija su laisvais laikais." },
];

export type Logo = { file: string; name: string; w: number; h: number; bg: string; fill?: boolean };

export const logos: Logo[] = [
  { file: "/logos/mora.webp", name: "mora", w: 1400, h: 700, bg: "#fbd1a3" },
  { file: "/logos/kasnis.webp", name: "KĄSNIS", w: 1199, h: 1312, bg: "#bb8879", fill: true },
  { file: "/logos/silas.webp", name: "šilas", w: 1400, h: 933, bg: "#fdeed3" },
  { file: "/logos/rasti.webp", name: "rasti", w: 1400, h: 933, bg: "#fdedda" },
  { file: "/logos/zvaigzde.webp", name: "Ženklas", w: 1254, h: 1254, bg: "#000018" },
];

export type Film = { id: string; title: string; note: string; poster: string; src: string; tall?: string };

export const films: Film[] = [
  { id: "reklama", title: "BY.AZUOLAS reklama", note: "48 s", poster: "/img/reklama-16x9.webp", src: "/video/reklama-16x9.mp4", tall: "/video/reklama-9x16.mp4" },
  { id: "silas", title: "ŠILAS: kaip sukurta", note: "36 s", poster: "/img/silas-16x9.webp", src: "/video/silas-16x9.mp4", tall: "/video/silas-9x16.mp4" },
  { id: "passmilte", title: "Pas Smiltę: prieš ir po", note: "Klientas", poster: "/img/passmilte.webp", src: "/video/passmilte.mp4" },
  { id: "case", title: "NOCTIS: nuo nulio iki prekės ženklo", note: "Koncepcija", poster: "/img/case-study.webp", src: "/video/case-study.mp4" },
  { id: "noctis", title: "NOCTIS klipas", note: "Koncepcija", poster: "/img/noctis.webp", src: "/video/noctis.mp4" },
];
