import Black from "./symbols/black.png";
import Green from "./symbols/green.png";
import Red from "./symbols/red.png";
import Blue from "./symbols/blue.png";
import White from "./symbols/white.png";
import Colorless from "./symbols/colorless.png";

export const ColorIdentityList = ({ card }) => {
  const colorIdentities = {
    B: Black,
    G: Green,
    R: Red,
    U: Blue,
    W: White,
  };

  if (!card.color_identity.length) {
    return (
      <div className={`w-3 h-3 rounded-full`}>
        <img src={Colorless} alt="Coloress" className="w-full" />
      </div>
    );
  }
  return (
    <div className="flex flex-row">
      {card.color_identity.map((color, index) => {
        return (
          <div key={index} className={`w-3 h-3 p-1 rounded-full`}>
            <img src={colorIdentities[color]} alt={color} className="w-full" />
          </div>
        );
      })}
    </div>
  );
};
