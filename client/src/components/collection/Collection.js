import { useQuery } from "@tanstack/react-query";
import { Message } from "primereact/message";
import Loading from "../shared/loading/Loading";
import MtgCard from "../shared/mtg-card/MtgCard";
import axios from "axios";

export default function Collection() {
  const { isPending, error, data } = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/user/card-collection");
      return response.data;
    },
    queryKey: ["card-collection"],
    retry: false,
  });

  const renderCardCollection = () => {
    if (!error) {
      return data?.map((collection, index) => {
        return (
          <div className="col-12 md:col-3" key={index}>
            <MtgCard card={collection.card} />
          </div>
        );
      });
    }
  };

  return (
    <div className="container">
      <h1 className="center">Your Collection</h1>
      <div>
        {error ? (
          <Message severity="error" text={error.response.data?.msg} />
        ) : null}
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <div className="col-12 flex flex-wrap">{renderCardCollection()}</div>
      )}
    </div>
  );
}
