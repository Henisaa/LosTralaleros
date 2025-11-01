export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  images: string[];
  desc: string;
}


export const products: Product[] = [
  { id: 1, name: "Figura Sakura Miku", price: 20000,
    img: "/Sakuramiku.png",
    images: ["/Sakuramiku.png"],
    desc: "Figura oficial de Hatsune Miku." },
  { id: 2, name: "Figura Hornet", price: 20000,
    img: "/Hornet.jpg",
    images: ["/Hornet.jpg"],
    desc: "Figura de Hollow Knight: Silksong." },
  { id: 3, name: "Nendoroid The Knight", price: 20000,
    img: "/NendoroidHollowKnight.png",
    images: ["/NendoroidHollowKnight.png"],
    desc: "Nendoroid oficial de 'The Knight'." },
  { id: 4, name: "Pack Library of Ruina", price: 25000,
    img: "/LoRKeyChain+ArtBook.png",
    images: ["/LoRKeyChain+ArtBook.png"],
    desc: "Set de llaveros + libro de arte." },
  { id: 5, name: "Poster Library of Ruina", price: 5000,
    img: "/PosterLoR.jpg",
    images: ["/PosterLoR.jpg"],
    desc: "Póster con Binah, Roland y Gebura." },
  { id: 6, name: "Replica Invitacion LoR", price: 10000,
    img: "/InvitacionLoR.jpg",
    images: ["/InvitacionLoR.jpg"],
    desc: "Réplica de invitación a la biblioteca." },
  { id: 7, name: "Gato Básico", price: 5000,
    img: "/BasicCat.png",
    images: ["/BasicCat.png"],
    desc: "Gato Básico de The Battle Cats." },
  { id: 8, name: "Gato Hacha", price: 5000,
    img: "/AxeCat.png",
    images: ["/AxeCat.png"],
    desc: "Gato Hacha de The Battle Cats." },
  { id: 9, name: "Figura DoomSlayer", price: 20000,
    img: "/DoomSlayer.png",
    images: ["/DoomSlayer.png"],
    desc: "Figura oficial de Doom: Dark Ages." },
  { id: 10, name: "Figura Medic", price: 15000,
    img: "/medic.png",
    images: ["/medic.png"],
    desc: "Figura del personaje Medic (TF2)." },
  { id: 11, name: "Figura Spy", price: 15000,
    img: "/spy.png",
    images: ["/spy.png"],
    desc: "Figura del personaje Spy (TF2)." },
  { id: 12, name: "Figura Matikanetannhauser", price: 30000,
    img: "/mambo.png",
    images: ["/mambo.png"],
    desc: "Figura de Uma Musume." },
  { id: 13, name: "Figura Kasane Teto", price: 50000,
    img: "/gorda.png",
    images: ["/gorda.png"],
    desc: "Figura de Synthesizer V." },
  { id: 14, name: "Peluche Gengar", price: 32000,
    img: "/gengar.png",
    images: ["/gengar.png"],
    desc: "Peluche de la saga Pokémon." },
  { id: 15, name: "Peluche Jimbo", price: 15000,
    img: "/jimbo.png",
    images: ["/jimbo.png"],
    desc: "Peluche del videojuego Balatro." },
  
 
  { id: 16, name: "Peluche Don Quixote", price: 15000, 
    img: "/DonQuixote.png", 
    images: ["/DonQuixote.png"], 
    desc: "Peluche Don Quixote del videojuego Limbus Company." },
  { id: 17, name: "Peluche Ishmael", price: 15000, 
    img: "/Ishmael.png", 
    images: ["/Ishmael.png"], 
    desc: "Peluche Ishmael Del videojuego Limbus Company." },
  { id: 18, name: "Peluche Hong Lu", price: 15000, 
    img: "/HongLu.png", 
    images: ["/HongLu.png"], 
    desc: "Peluche Hong Lu Del videojuego Limbus Company." }
];

// Función para obtener producto por ID
export const getProductById = (id: string | number): Product | undefined => {
  return products.find(p => String(p.id) === String(id));
};