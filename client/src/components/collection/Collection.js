import { useQuery } from "@tanstack/react-query";
import { Api, getCollection } from "../../api";
import Loading from "../shared/loading/Loading";
import MtgCard from "../shared/mtg-card/MtgCard";

export default function Collection() {
  const { isPending, error, data } = useQuery({
    queryFn: getCollection,
    queryKey: ["card-collection"],
    retry: false,
  });

  const renderCardCollection = () => {
    return data?.map((collection, index) => {
      return (
        <div className="col-12 md:col-3" key={index}>
          <MtgCard card={collection.card} />
        </div>
      );
    });
  };

  return (
    <div className="container">
      <h1 className="center">Your Collection</h1>
      {isPending ? (
        <Loading />
      ) : (
        <div className="col-12 flex flex-wrap">{renderCardCollection()}</div>
      )}
    </div>
  );
}
