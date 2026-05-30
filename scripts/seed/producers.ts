import type { ProducerCategory } from "@/types/database";

export interface SeedProducer {
  name: string;
  category: ProducerCategory;
  region: string;
  description: string;
  website: string | null;
}

export const seedProducers: SeedProducer[] = [
  {
    name: "Berăria H",
    category: "brewery",
    region: "București",
    description: "Prima microberărie artizanală din București, fondată în 2012. Produce sortimente precum Blonde Ale, IPA și Porter folosind malț românesc.",
    website: "https://berariah.ro",
  },
  {
    name: "Crama Prahova Valley",
    category: "winery",
    region: "Prahova",
    description: "Cramă din Dealu Mare, unul dintre cele mai importante podgorii din România. Produce Fetească Neagră, Cabernet Sauvignon și Chardonnay.",
    website: null,
  },
  {
    name: "Distileria Alexandrion",
    category: "distillery",
    region: "Ilfov",
    description: "Cea mai mare distilerie din România, producătoare de brandy, vodcă și lichioruri. Exportă în peste 60 de țări.",
    website: "https://alexandrion.com",
  },
  {
    name: "Sikaru Craft Brewery",
    category: "brewery",
    region: "Cluj",
    description: "Microberărie din Cluj-Napoca specializată în beri belgiene și englezești. Cunoscuți pentru Tripel și Dubbel-ul lor.",
    website: null,
  },
  {
    name: "Crama Cotnari",
    category: "winery",
    region: "Iași",
    description: "Una dintre cele mai vechi și renumite crame din Moldova, producătoare de Grasă de Cotnari, un vin alb dulce unic în lume.",
    website: "https://cotnari.ro",
  },
  {
    name: "Stârcina Craft Spirits",
    category: "distillery",
    region: "Maramureș",
    description: "Distilerie artizanală din inima Maramureșului, producătoare de palincă tradițională din prune și mere, conform rețetelor ancestrale.",
    website: null,
  },
];
