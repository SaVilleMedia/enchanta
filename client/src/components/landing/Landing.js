import { useQuery } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { axiosScryfall } from "../../api";
import Loading from "../shared/loading/Loading";
import MtgCard from "../shared/mtg-card/MtgCard";
import "./Landing.scss";

export default function Landing() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  const { isPending, error, data } = useQuery({
    queryFn: async () => {
      if (!searchText) return [];
      const response = await axiosScryfall.get(
        `cards/search?q=${debouncedSearchText[0]}&unique=prints`
      );
      return response.data.data;
    },
    queryKey: ["searchData", { debouncedSearchText }],
    retry: false,
  });

  return (
    <div className="container">
      <div className="w-full flex flex-column align-items-center">
        <h1 className="p-3">Enchata</h1>
        <h2>The all in one place for your Magic the Gathering needs</h2>
      </div>
      <div className="flex w-full justify-content-center mt-5">
        <div className="col-12 flex">
          <div className="col-12 md:col-10 md:col-offset-1">
            <InputText
              value={searchText}
              className="w-full"
              placeholder="Search for a card"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        {error ? (
          <Message severity="error" text={error.response.data?.details} />
        ) : null}
      </div>
      <div className="flex col-12 md:col-10 md:col-offset-1 flex-wrap">
        {isPending ? (
          <Loading />
        ) : (
          data?.map((card, index) => {
            return (
              <div className="col-12 md:col-3" key={index}>
                <MtgCard card={card} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
