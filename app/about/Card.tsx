"use client";
import { Card } from "react-bootstrap";

type CartaProps = {
  imageSrc: string;
  title: string;
  bodyText: string;
  style?: React.CSSProperties; // Prop opcional
  children?: React.ReactNode; // Prop opcional, como algun boton
};

{
  /*si le doy el prop opcional de style, tomara control,  si no, el default es 20rem*/
}
function Carta({ imageSrc, title, bodyText, style, children }: CartaProps) {
  return (
    <Card style={{ width: "20rem", ...style }}>
      <Card.Img
        variant="top"
        src={imageSrc}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{bodyText}</Card.Text>
        {children}
      </Card.Body>
    </Card>
  );
}

export default Carta;
