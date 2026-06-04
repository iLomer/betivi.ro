import type { ProducerCategory } from "@/types/database";

export interface SeedProducer {
  name: string;
  category: ProducerCategory;
  region: string;
  description: string;
  website: string | null;
}

export const seedProducers: SeedProducer[] = [
  // ── Berării ────────────────────────────────────────────────────────────────
  {
    name: "Hop Hooligans",
    category: "brewery",
    region: "București",
    description: "Cea mai premiată berărie artizanală din România. Fondată în 2013, a câștigat medalii la competiții internaționale cu sortimentele lor de Imperial Stout și DIPA. Au revoluționat scena craft din România.",
    website: "https://hophooligans.ro",
  },
  {
    name: "Zăganu",
    category: "brewery",
    region: "Prahova",
    description: "Berărie artizanală din Vălenii de Munte fondată în 2013, cu apă de izvor din Carpați. Blonde Ale-ul lor este una dintre cele mai vândute beri craft din România. Produc peste 20 de sortimente.",
    website: "https://zaganu.ro",
  },
  {
    name: "Berăria H",
    category: "brewery",
    region: "București",
    description: "Prima microberărie artizanală din București, fondată în 2012. Produce sortimente clasice și sezoniere cu malț românesc. Au introdus cultura craft beer în capitală.",
    website: "https://berariah.ro",
  },
  {
    name: "Narrative Brewing",
    category: "brewery",
    region: "București",
    description: "Berărie cu filozofie narativă — fiecare bere spune o poveste. Specializați în IPA-uri și Sour Ale-uri, cu etichetele lor artistice devenite obiecte de colecție.",
    website: "https://narrativebrewing.ro",
  },
  {
    name: "Sikaru Craft Brewery",
    category: "brewery",
    region: "Cluj",
    description: "Microberărie clujeană specializată în stiluri belgiene și englezești. Tripel-ul și Dubbel-ul lor sunt referințe în scena craft din Transilvania. Numele vine din sumerianul pentru bere.",
    website: null,
  },
  {
    name: "Ground Zero Brewing",
    category: "brewery",
    region: "București",
    description: "Berărie urban-industrială din București, cu focus pe stiluri americane — West Coast IPA, Hazy IPA și Pastry Stout. Colaborările lor cu berarii internaționali sunt evenimentele anului.",
    website: "https://groundzerobrewing.ro",
  },
  {
    name: "Turabo Brewing",
    category: "brewery",
    region: "Prahova",
    description: "Berărie din Valea Prahovei cu accent pe beri de fermentare spontană și mixte. Lambic-urile și Geuze-urile lor sunt unice în România.",
    website: null,
  },
  // ── Crame ─────────────────────────────────────────────────────────────────
  {
    name: "Crama Cotnari",
    category: "winery",
    region: "Iași",
    description: "Una dintre cele mai vechi și renumite crame din Moldova, cu atestare din 1448. Producătoare a Grasei de Cotnari, un vin alb dulce unic în lume, apreciat la curtea lui Ștefan cel Mare.",
    website: "https://cotnari.ro",
  },
  {
    name: "Cramele Recaș",
    category: "winery",
    region: "Timiș",
    description: "Cea mai mare cramă privată din România ca suprafață viticolă. Produce atât vinuri accesibile cât și sortimente premium sub gama Solo Quinta. Export în 30 de țări.",
    website: "https://recas.ro",
  },
  {
    name: "Crama Prahova Valley",
    category: "winery",
    region: "Prahova",
    description: "Cramă din Dealu Mare, unul dintre cele mai importante podgorii din România. Produce Fetească Neagră, Cabernet Sauvignon și Chardonnay de excepție pe soluri argiloase.",
    website: null,
  },
  {
    name: "SERVE — Terra Romana",
    category: "winery",
    region: "Prahova",
    description: "Prima cramă privată înființată după 1989, cu capital franco-român. Domeniu de 200ha în Dealu Mare. Vinurile lor Ceptura și Terra Romana sunt referințe la export.",
    website: "https://serve.ro",
  },
  {
    name: "Crama Davino",
    category: "winery",
    region: "Prahova",
    description: "Cramă boutique din Dealu Mare cu filozofie de winemaker individual. Producție limitată de Fetească Neagră și Cabernet Sauvignon. Premii internaționale constante la Decanter.",
    website: "https://davino.ro",
  },
  {
    name: "Jidvei",
    category: "winery",
    region: "Alba",
    description: "Cea mai mare cramă din România ca volum de producție, din Valea Târnavelor. Celebri pentru vinurile albe aromate — Fetească Regală, Muscat Ottonel și Traminer.",
    website: "https://jidvei.ro",
  },
  // ── Distilerii ─────────────────────────────────────────────────────────────
  {
    name: "Stârcina Craft Spirits",
    category: "distillery",
    region: "Maramureș",
    description: "Distilerie artizanală din inima Maramureșului, producătoare de palincă tradițională din prune și mere, conform rețetelor ancestrale transmise din tată în fiu. Produc 3000 de sticle pe an.",
    website: null,
  },
  {
    name: "Distileria Alexandrion",
    category: "distillery",
    region: "Ilfov",
    description: "Cea mai mare distilerie din România, producătoare de brandy, vodcă și lichioruri. Alexandrion 5* este cel mai vândut brandy din țară. Exportă în peste 60 de țări.",
    website: "https://alexandrion.com",
  },
  {
    name: "Țuică de Pitești — Casa Doboș",
    category: "distillery",
    region: "Argeș",
    description: "Distilerie tradițională din Muscel cu peste 100 de ani de istorie. Produce țuică de prune cu dublu fiert în cazane de cupru. Una dintre puținele distilerii care respectă rețeta originală argeșeană.",
    website: null,
  },
];
