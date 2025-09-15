const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const BCN = "Barcelona";
const ZU  = "Zona Universitària";

const L = (id, data) => ({
  id,
  imageUrl: `https://picsum.photos/seed/reder-${id}/800/600`,
  city: BCN,
  neighborhood: ZU,
  propertyType: "ROOM",
  operation: "RENT",
  furnished: true,
  hasElevator: true,
  heating: true,
  internetIncluded: true,
  availableFrom: new Date("2025-10-01"),
  minTermMonths: 6,
  ...data,
});

async function main() {
  await prisma.listing.deleteMany();

  const listings = [
    L(1, {
      title: "Habitació a 5 min de la UPC (Diagonal)",
      description: "Pis compartit a Les Corts, ideal estudiants. Cuina equipada.",
      priceEur: 650, address: "Av. Diagonal 680", lat: 41.3869, lon: 2.1132,
      bedrooms: 1, bathrooms: 1, sizeSqm: 12, floor: 4, hasBalcony: false, hasAC: false, petsAllowed: false, billsIncluded: false, depositEur: 650, roommates: 3, genderPref: "ANY",
    }),
    L(2, {
      title: "Estudi compacte prop Palau Reial",
      description: "Estudi amb llum natural, perfecte per 1 persona.",
      priceEur: 950, address: "Carrer de Martí i Franquès 14", lat: 41.3861, lon: 2.1168,
      propertyType: "STUDIO", bedrooms: 0, bathrooms: 1, sizeSqm: 22, floor: 2, hasBalcony: false, hasAC: true, billsIncluded: false, depositEur: 950,
    }),
    L(3, {
      title: "Habitació amb balcó a Pedralbes",
      description: "Pis tranquil, molt proper a Zona Universitària (L3/L9).",
      priceEur: 720, address: "Carrer Manuel Ballbé 7", lat: 41.3848, lon: 2.1115,
      bedrooms: 1, bathrooms: 2, sizeSqm: 14, floor: 5, hasBalcony: true, hasAC: true, petsAllowed: false, billsIncluded: true, depositEur: 720, roommates: 2,
    }),
    L(4, {
      title: "Pis 2 hab. a Les Corts (ideal parella + despatx)",
      description: "Sala ampla, cuina nova, ascensor.",
      priceEur: 1450, address: "Carrer del Cardenal Reig 25", lat: 41.3788, lon: 2.1169,
      propertyType: "APARTMENT", bedrooms: 2, bathrooms: 1, sizeSqm: 62, floor: 3, hasBalcony: true, hasAC: true, billsIncluded: false, depositEur: 1500,
    }),
    L(5, {
      title: "Habitació econòmica a 8 min L9 Sud",
      description: "Bona connexió a Aeroport i UPC.",
      priceEur: 580, address: "Carrer de Pau Gargallo 40", lat: 41.3867, lon: 2.1188,
      bedrooms: 1, bathrooms: 1, sizeSqm: 10, floor: 1, hasBalcony: false, hasAC: false, billsIncluded: false, depositEur: 580, roommates: 4,
    }),
    L(6, {
      title: "Estudi reformat al costat de la Diagonal",
      description: "Aire condicionat, moblat, llest per entrar.",
      priceEur: 1050, address: "Avinguda Diagonal 690", lat: 41.3876, lon: 2.1145,
      propertyType: "STUDIO", bedrooms: 0, bathrooms: 1, sizeSqm: 24, floor: 6, hasBalcony: true, hasAC: true, billsIncluded: false, depositEur: 1050,
    }),
    L(7, {
      title: "Habitació amb vistes a zona verda",
      description: "Pis lluminós, companys tranquils.",
      priceEur: 690, address: "Passeig dels Til·lers 3", lat: 41.3879, lon: 2.1107,
      bedrooms: 1, bathrooms: 2, sizeSqm: 13, floor: 7, hasBalcony: true, hasAC: false, petsAllowed: true, billsIncluded: false, depositEur: 690, roommates: 2,
    }),
    L(8, {
      title: "Pis 3 hab. ampli (família/3 estudiants)",
      description: "A 10 min caminant de L3 Zona Universitària.",
      priceEur: 1800, address: "Carrer de Jordi Girona 29", lat: 41.3888, lon: 2.1139,
      propertyType: "APARTMENT", bedrooms: 3, bathrooms: 2, sizeSqm: 85, floor: 4, hasBalcony: true, hasAC: true, billsIncluded: false, depositEur: 1800,
    }),
    L(9, {
      title: "Habitació gran amb escriptori",
      description: "Internet inclòs, ambient d’estudi.",
      priceEur: 730, address: "Carrer del Doctor Marañón 5", lat: 41.3839, lon: 2.1182,
      bedrooms: 1, bathrooms: 1, sizeSqm: 15, floor: 3, hasBalcony: false, hasAC: true, billsIncluded: true, depositEur: 730, roommates: 3,
    }),
    L(10, {
      title: "Estudi lluminós amb balcó",
      description: "Moblat, perfecte per 1-2 mesos o més.",
      priceEur: 990, address: "Carrer de Sor Eulàlia d’Anzizu 12", lat: 41.3855, lon: 2.1089,
      propertyType: "STUDIO", bedrooms: 0, bathrooms: 1, sizeSqm: 21, floor: 5, hasBalcony: true, hasAC: false, billsIncluded: false, depositEur: 990,
    }),
    L(11, {
      title: "Habitació amb bany privat",
      description: "Privacitat total, a 6 min L3.",
      priceEur: 780, address: "Carrer de Benavent 20", lat: 41.3817, lon: 2.1203,
      bedrooms: 1, bathrooms: 1, sizeSqm: 14, floor: 6, hasBalcony: false, hasAC: true, billsIncluded: false, depositEur: 780, roommates: 2,
    }),
    L(12, {
      title: "Pis 1 hab. reformat a Les Corts",
      description: "Ideal parella. Cuina oberta, AC, balcó.",
      priceEur: 1250, address: "Travessera de les Corts 120", lat: 41.3821, lon: 2.1272,
      propertyType: "APARTMENT", bedrooms: 1, bathrooms: 1, sizeSqm: 48, floor: 2, hasBalcony: true, hasAC: true, billsIncluded: false, depositEur: 1250,
    }),
  ];

  for (const l of listings) await prisma.listing.create({ data: l });
  console.log(`Seeded ${listings.length} listings.`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
