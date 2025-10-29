import { Container, Row, Col } from "react-bootstrap";
import Carta from "./Card";
export default function Home() {
  return (
    <>
      <Container className="mt-5">
        {/*Primera Fila:*/}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Carta
              imageSrc="/Sakuramiku.png"
              title="Figura Sakura Miku"
              bodyText="Figura oficial de Hatsune Miku. $20.000"
            />
          </Col>

          <Col md={4}>
            <Carta
              imageSrc="/Hornet.jpg"
              title="Figura Hornet"
              bodyText="Figura Hornet de Hollow Knight:Silksong. $20.000"
            />
          </Col>
          <Col md={4}>
            <Carta
              imageSrc="/NendoroidHollowKnight.png"
              title="Figura Nendoroid The Knight"
              bodyText="Nendoroid Oficial de 'The Knight'. $20.000"
            />
          </Col>
        </Row>
        {/*Segunda Fila:*/}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Carta
              imageSrc="/LoRKeyChain+ArtBook.png"
              title="Pack Library of Ruina"
              bodyText="Set Llaveros + Artbook exclusivo. $25.000"
            />
          </Col>

          <Col md={4}>
            <Carta
              imageSrc="/PosterLoR.jpg"
              title="Poster Library of Ruina"
              bodyText="Poster Library of Ruina, Protagonizado por Binah, Roland y Gebura. $5.000"
            />
          </Col>
          <Col md={4}>
            <Carta
              imageSrc="/InvitacionLoR.jpg"
              title="Replica Invitacion LoR"
              bodyText="Replica de la invitacion a la biblioteca de Library of Ruina. $10.000"
            />
          </Col>
        </Row>
        {/*Tercera Fila:*/}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Carta
              imageSrc="/BasicCat.png"
              title="Gato Basico"
              bodyText="Gato Basico The Battle Cats. $5.000"
            />
          </Col>

          <Col md={4}>
            <Carta
              imageSrc="/AxeCat.png"
              title="Gato Hacha"
              bodyText="Gato Hacha de The Battle Cats. $5.000"
            />
          </Col>
          <Col md={4}>
            <Carta
              imageSrc="/DoomSlayer.png"
              title="Figura DoomSlayer"
              bodyText="Figura Oficial Doomslayer de Doom:Dark Ages. $20.000"
            />
          </Col>
        </Row>
        {/*Cuarta Fila:*/}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Carta
              imageSrc="/medic.png"
              title="Figura Medic"
              bodyText="Figura del personaje Medic del Videojuego Team Fortress 2. $15.000"
            />
          </Col>

          <Col md={4}>
            <Carta
              imageSrc="/spy.png"
              title="Figura Spy"
              bodyText="Figura del personaje Spy del videojuego Team Fortress 2. $15.000"
            />
          </Col>
          <Col md={4}>
            <Carta
              imageSrc="/mambo.png"
              title="Figura Matikanetannhauser"
              bodyText="Figura de Matikanetannhauser de la serie Uma Musume. $30.000"
            />
          </Col>
        </Row>
        {/*Quinta Fila:*/}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Carta
              imageSrc="/gorda.png"
              title="Figura de Kasane Teto"
              bodyText="Figura de Kasane Teto del Programa Synthethizer V. $50.000"
            />
          </Col>

          <Col md={4}>
            <Carta
              imageSrc="/gengar.png"
              title="Peluche Gengar"
              bodyText="Peluche de Gengar de la saga Pokémon. $32.000"
            />
          </Col>
          <Col md={4}>
            <Carta
              imageSrc="/jimbo.png"
              title="Peluche Jimbo"
              bodyText="Peluche Jimbo del Videojuego Balatro. $15.000"
            />
          </Col>
        </Row>
        {/*Sexta Fila:*/}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Carta
              imageSrc="/DonQuixote.png"
              title="Peluche Don Quixote"
              bodyText="Peluche Don Quixote del videojuego Limbus Company. $15.000 "
            />
          </Col>

          <Col md={4}>
            <Carta
              imageSrc="/Ishmael.png"
              title="Peluche Ishmael"
              bodyText="Peluche Ishmael Del videojuego Limbus Company. $15.000 "
            />
          </Col>
          <Col md={4}>
            <Carta
              imageSrc="/HongLu.png"
              title="Peluche Hong Lu"
              bodyText="Peluche Hong Lu Del videojuego Limbus Company. $15.000"
            />
          </Col>
        </Row>

        {/*Placeholders por si quieren mas productos
            si no, borran nomas xd*/}
        {/*Septima Fila:*/}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Carta
              imageSrc="/Placeholder"
              title="PlaceholderBody"
              bodyText="A"
            />
          </Col>

          <Col md={4}>
            <Carta
              imageSrc="Placeholder"
              title="PlaceholderBody"
              bodyText="A"
            />
          </Col>
          <Col md={4}>
            <Carta
              imageSrc="Placeholder"
              title="PlaceholderBody"
              bodyText="A"
            />
          </Col>
        </Row>
        {/*Octava Fila:*/}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Carta
              imageSrc="/Placeholder"
              title="PlaceholderBody"
              bodyText="A"
            />
          </Col>

          <Col md={4}>
            <Carta
              imageSrc="Placeholder"
              title="PlaceholderBody"
              bodyText="A"
            />
          </Col>
          <Col md={4}>
            <Carta
              imageSrc="Placeholder"
              title="PlaceholderBody"
              bodyText="A"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
