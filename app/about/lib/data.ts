export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  images: string[];
  desc: string;
  category: string; // <--- 1. CAMBIO HECHO: Interfaz actualizada
}

export const products: Product[] = [
  {
    id: 1,
    name: "Figura Sakura Miku",
    price: 20000,
    img: "/Sakuramiku.png",
    images: ["/Sakuramiku.png"],
    desc: "Figura oficial de Hatsune Miku.",
    category: "Figuras",
  },
  {
    id: 2,
    name: "Figura Hornet",
    price: 20000,
    img: "/Hornet.jpg",
    images: ["/Hornet.jpg"],
    desc: "Figura de Hollow Knight: Silksong.",
    category: "Figuras",
  },
  {
    id: 3,
    name: "Nendoroid The Knight",
    price: 20000,
    img: "/NendoroidHollowKnight.png",
    images: ["/NendoroidHollowKnight.png"],
    desc: "Nendoroid oficial de 'The Knight'.",
    category: "Figuras",
  },
  {
    id: 4,
    name: "Pack Library of Ruina",
    price: 25000,
    img: "/LoRKeyChain+ArtBook.png",
    images: ["/LoRKeyChain+ArtBook.png"],
    desc: "Set de llaveros + libro de arte.",
    category: "Miscelaneos",
  },
  {
    id: 5,
    name: "Poster Library of Ruina",
    price: 5000,
    img: "/PosterLoR.jpg",
    images: ["/PosterLoR.jpg"],
    desc: "Póster con Binah, Roland y Gebura.",
    category: "Miscelaneos",
  },
  {
    id: 6,
    name: "Replica Invitacion LoR",
    price: 10000,
    img: "/InvitacionLoR.jpg",
    images: ["/InvitacionLoR.jpg"],
    desc: "Réplica de invitación a la biblioteca.",
    category: "Miscelaneos",
  },
  {
    id: 7,
    name: "Gato Básico",
    price: 5000,
    img: "/BasicCat.png",
    images: ["/BasicCat.png"],
    desc: "Gato Básico de The Battle Cats.",
    category: "Peluches",
  },
  {
    id: 8,
    name: "Gato Hacha",
    price: 5000,
    img: "/AxeCat.png",
    images: ["/AxeCat.png"],
    desc: "Gato Hacha de The Battle Cats.",
    category: "Peluches",
  },
  {
    id: 9,
    name: "Figura DoomSlayer",
    price: 20000,
    img: "/DoomSlayer.png",
    images: ["/DoomSlayer.png"],
    desc: "Figura oficial de Doom: Dark Ages.",
    category: "Figuras",
  },
  {
    id: 10,
    name: "Figura Medic",
    price: 15000,
    img: "/medic.png",
    images: ["/medic.png"],
    desc: "Figura del personaje Medic (TF2).",
    category: "Figuras",
  },
  {
    id: 11,
    name: "Figura Spy",
    price: 15000,
    img: "/spy.png",
    images: ["/spy.png"],
    desc: "Figura del personaje Spy (TF2).",
    category: "Figuras",
  },
  {
    id: 12,
    name: "Figura Matikanetannhauser",
    price: 30000,
    img: "/mambo.png",
    images: ["/mambo.png"],
    desc: "Figura de Uma Musume.",
    category: "Figuras",
  },
  {
    id: 13,
    name: "Figura Kasane Teto",
    price: 50000,
    img: "/gorda.png",
    images: ["/gorda.png"],
    desc: "Figura de Synthesizer V.",
    category: "Figuras",
  },
  {
    id: 14,
    name: "Peluche Gengar",
    price: 32000,
    img: "/gengar.png",
    images: ["/gengar.png"],
    desc: "Peluche de la saga Pokémon.",
    category: "Peluches",
  },
  {
    id: 15,
    name: "Peluche Jimbo",
    price: 15000,
    img: "/jimbo.png",
    images: ["/jimbo.png"],
    desc: "Peluche del videojuego Balatro.",
    category: "Peluches",
  },
  {
    id: 16,
    name: "Peluche Don Quixote",
    price: 15000,
    img: "/DonQuixote.png",
    images: ["/DonQuixote.png"],
    desc: "Peluche Don Quixote del videojuego Limbus Company.",
    category: "Peluches",
  },
  {
    id: 17,
    name: "Peluche Ishmael",
    price: 15000,
    img: "/Ishmael.png",
    images: ["/Ishmael.png"],
    desc: "Peluche Ishmael Del videojuego Limbus Company.",
    category: "Peluches",
  },
  {
    id: 18,
    name: "Peluche Hong Lu",
    price: 15000,
    img: "/HongLu.png",
    images: ["/HongLu.png"],
    desc: "Peluche Hong Lu Del videojuego Limbus Company.",
    category: "Peluches",
  },
];

// Función para obtener producto por ID
export const getProductById = (id: string | number): Product | undefined => {
  return products.find((p) => String(p.id) === String(id));
};
