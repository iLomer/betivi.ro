import type { VenueCategory } from "@/types/database";

export interface SeedVenue {
  name: string;
  city: string;
  address: string;
  description: string;
  category: VenueCategory;
  lat: number;
  lng: number;
}

export const seedVenues: SeedVenue[] = [
  {
    name: "Beerhouse",
    city: "București",
    address: "Calea Victoriei 91, Sector 1",
    description: "Cel mai mare bar de bere artizanală din centrul Bucureștiului, cu peste 100 de sortimente la robinet și la sticlă.",
    category: "berarie",
    lat: 44.4415,
    lng: 26.0964,
  },
  {
    name: "Crama Oprisor",
    city: "București",
    address: "Str. Franceză 44, Sector 3",
    description: "Cramă tradițională olteană în inima capitalei. Vinuri de casă și mâncăruri autentice din Oltenia.",
    category: "crama",
    lat: 44.4302,
    lng: 26.1042,
  },
  {
    name: "Fabrica de Bere Ursus",
    city: "Cluj-Napoca",
    address: "Str. Tăietura Turcului 52",
    description: "Fostă fabrică de bere transformată în complex cultural și gastronomic cu berărie artizanală proprie.",
    category: "berarie",
    lat: 46.7756,
    lng: 23.5718,
  },
  {
    name: "Terasa Festival",
    city: "Cluj-Napoca",
    address: "Piața Unirii 15",
    description: "Terasă în aer liber în centrul Clujului cu vedere spre Catedrala Sf. Mihail. Beri locale și cocktailuri.",
    category: "terasa",
    lat: 46.7693,
    lng: 23.5896,
  },
  {
    name: "Barul de Jos",
    city: "Timișoara",
    address: "Str. Alba Iulia 2",
    description: "Bar de cartier cu atmosferă retro, bere la halbă și muzică live în fiecare vineri seara.",
    category: "bar",
    lat: 45.7549,
    lng: 21.2087,
  },
  {
    name: "Manufactura Craft Beer",
    city: "Timișoara",
    address: "Str. Proclamației de la Timișoara 5",
    description: "Microberărie cu producție proprie. Sortimente sezoniere și colaborări cu berari din toată Europa.",
    category: "berarie",
    lat: 45.7489,
    lng: 21.2083,
  },
  {
    name: "Crama Cotnari",
    city: "Iași",
    address: "Bd. Ștefan cel Mare și Sfânt 16",
    description: "Prezentare oficială a cramei Cotnari în centrul Iașului. Degustări și vinuri direct de la producător.",
    category: "crama",
    lat: 47.1585,
    lng: 27.6014,
  },
  {
    name: "Irish Pub Galway",
    city: "Iași",
    address: "Str. Vasile Alecsandri 8",
    description: "Pub irlandez autentic cu whiskey-uri de colecție și meciuri live pe ecrane mari.",
    category: "bar",
    lat: 47.1553,
    lng: 27.5982,
  },
  {
    name: "Terasa Cetății",
    city: "Brașov",
    address: "Str. Gheorghe Barițiu 1",
    description: "Terasă cu vedere panoramică spre Cetatea Brașovului. Bere Ciuc și specialități din zona Bârsei.",
    category: "terasa",
    lat: 45.6427,
    lng: 25.5887,
  },
  {
    name: "Club Diesel",
    city: "Brașov",
    address: "Str. Mureșenilor 14",
    description: "Club și bar în centrul vechi al Brașovului. Cocktailuri creative și muzică electronică până dimineața.",
    category: "club",
    lat: 45.6411,
    lng: 25.5877,
  },
];
