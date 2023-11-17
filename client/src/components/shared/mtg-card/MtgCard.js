import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { addToCollection } from "../../../api";
import enchantaStore from "../../../store";
import "./MtgCard.scss";

export default function MtgCard({ card }) {
  const isAuthenticated = enchantaStore(
    (state) => state.authenticated.isAuthenticated
  );

  const [selectedFinish, setSelectedFinish] = useState();
  const [amount, setAmount] = useState(0);

  function handleAddtoCollection(card) {
    return addToCollection(card, selectedFinish, amount);
  }

  const cardHeader = (card) => {
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

  const capitalize = ([firstLetter, ...restOfWord]) =>
    firstLetter.toUpperCase() + restOfWord.join("");

  const cardFooter = (card) => {
    if (isAuthenticated) {
      const finishes = card.finishes?.map((finish) => {
        return {
          label: capitalize(finish),
          value: finish,
        };
      });
      return (
        <div className="flex flex-wrap">
          <label htmlFor="finish">Finish</label>
          <Dropdown
            value={selectedFinish ?? finishes[0].value}
            onChange={(e) => setSelectedFinish(e.value)}
            options={finishes}
            id="finish"
            placeholder="Select a card finish"
            className="w-full mb-3"
          />
          <label htmlFor="amount">Amount</label>
          <InputNumber
            value={amount}
            id="amount"
            className="w-full mb-3"
            onValueChange={(e) => setAmount(e.value)}
            min={1}
          />
          <Button
            label="Add to Collection"
            icon="pi pi-plus"
            onClick={() => handleAddtoCollection(card)}
          />
        </div>
      );
    }
  };

  return (
    <Card
      header={cardHeader(card)}
      footer={cardFooter(card)}
      title={card.name}
      subTitle={card.set_name}
      className="h-full w-full"
    ></Card>
  );
}
