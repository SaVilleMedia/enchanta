import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { addToCollection } from "../../../api";
import enchantaStore from "../../../store";
import "./MtgCard.scss";
import { capitalize } from "../../../utils/functions";
import { CardImage } from "../card-image/CardImage";

export default function MtgCard({ card }) {
  const isAuthenticated = enchantaStore(
    (state) => state.authenticated.isAuthenticated
  );

  const [selectedFinish, setSelectedFinish] = useState();
  const [amount, setAmount] = useState(0);

  function handleAddtoCollection(card) {
    return addToCollection(card, selectedFinish, amount);
  }

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
      header={<CardImage card={card} />}
      footer={cardFooter(card)}
      title={card.name}
      subTitle={card.set_name}
      className="h-full w-full"
    ></Card>
  );
}
