import "./CardImage.scss";

export const CardImage = ({ card }) => {
  if (card.image_uris) {
    return (
      <img
        src={card.image_uris?.normal}
        className="w-full"
        alt={card.name}
      ></img>
    );
  }

  if (card.card_faces) {
    return (
      <div className="relative trigger">
        <img
          src={card.card_faces[0].image_uris.normal}
          className="w-full front-side"
          alt={card.name}
        />
        <img
          alt={card.name}
          src={card.card_faces[1].image_uris.normal}
          className="w-full flip-side"
        />
      </div>
    );
  }
};
