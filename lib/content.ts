// Everything the page lists lives here, so adding a project is one entry, not a layout change.

export const INSTAGRAM_URL = "https://www.instagram.com/by.azuolas/";
export const INSTAGRAM_HANDLE = "@by.azuolas";

export type Concept = {
  slug: string;
  name: string;
  kind: string;
  text: string;
  /** Wide card spanning the full row. */
  wide?: boolean;
};

// Order is the order on the page.
export const concepts: Concept[] = [
  { slug: "psst", name: "PŠŠT!", kind: "Gazuoti gėrimai", text: "Sukiojama 3D skardinė, keturi skonių pasauliai ir dėžės sudėliojimas.", wide: true },
  { slug: "silas", name: "ŠILAS", kind: "Žvakių parduotuvė", text: "3D žvakė, kuri slenkant užgęsta, ir simuliuoti dūmai." },
  { slug: "tamsa", name: "TAMSA", kind: "Muzikos festivalis", text: "Gyvas plakatas, pelę sekantis spindulys ir naršyklėje kuriama muzika." },
  { slug: "ausrine", name: "AUŠRINĖ", kind: "Mechaninis laikrodis", text: "Gyvas Vilniaus laikas, 3D apžiūra pele ir išardymas." },
  { slug: "tyla", name: "TYLA", kind: "Kotedžų kvartalas", text: "Paspaudžiamas sklypų žemėlapis, diena ir vakaras." },
  { slug: "miltai", name: "Miltai ant stalo", kind: "Kepykla", text: "Ranka piešti eskizai, kainos ir užsakymas per Wolt ar Bolt." },
  { slug: "kirpykla", name: "Aušros 14", kind: "Kirpykla", text: "Gatvės iškabos stilius ir registracija su laisvais laikais." },
];

export type Logo = { file: string; name: string; w: number; h: number; bg: string; fill?: boolean };

export const logos: Logo[] = [
  { file: "/logos/mora.webp", name: "mora", w: 1400, h: 700, bg: "#fbd1a3" },
  { file: "/logos/kasnis.webp", name: "KĄSNIS", w: 1199, h: 1312, bg: "#bb8879", fill: true },
  { file: "/logos/silas.webp", name: "šilas", w: 1400, h: 933, bg: "#fdeed3" },
  { file: "/logos/rasti.webp", name: "rasti", w: 1400, h: 933, bg: "#fdedda" },
  { file: "/logos/zvaigzde.webp", name: "Ženklas", w: 1254, h: 1254, bg: "#000018" },
];
