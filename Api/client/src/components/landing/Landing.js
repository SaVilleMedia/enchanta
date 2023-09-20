import { useEffect } from "react";
import enchantaStore from "../../store";
import { Card } from "primereact/card";

export default function Landing() {
  const setSets = enchantaStore((state) => state.setSets);
  const setCards = enchantaStore((state) => state.setCards);
  const sets = enchantaStore((state) => state.sets);

  useEffect(() => {
    setSets();
    setCards();
  }, []);

  return (
    <div className="container">
      <div className="w-full flex flex-column align-items-center">
        <h1 className="p-3">Enchata</h1>
        <h2>The all in one place for your Magic the Gathering needs</h2>
      </div>
      <div className="grid flex mt-5">
        {sets.length > 0 ? (
          <div className="col-12 md:col-4">
            <Card
              title={sets[0].name}
              header={<img alt="Card" src={sets[0].icon_svg_uri} />}
            ></Card>
          </div>
        ) : null}
      </div>
    </div>
  );
}
