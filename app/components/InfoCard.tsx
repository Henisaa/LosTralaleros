"use client";
import { Card } from "react-bootstrap";
import Image from 'next/image';

type CartaProps = {
  imageSrc: string;
  title: string;
  bodyText: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

function InfoCard({ imageSrc, title, bodyText, style, children }: CartaProps) {
  return (
    <Card style={{ width: "20rem", ...style }}>
      <Image
        src={imageSrc}
        alt={title}
        width={400} 
        height={200} 
        className="card-img-top"
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="text-center d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{bodyText}</Card.Text>
        <div className="mt-auto">
          {children}
        </div>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;