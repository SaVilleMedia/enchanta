import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "primereact/message";
import SVMDataTable from "../shared/data-table/DataTable";
import Loading from "../shared/loading/Loading";
import { COLLECTION_COLUMNS } from "./collection.cols";
import { ApiUrls } from "../../api/index";

export default function Collection() {
  const [loading, setLoading] = useState(false);

  const { isPending, error, data, refetch } = useQuery({
    queryFn: async () => {
      const response = await axios.get(ApiUrls.collection);
      return response.data;
    },
    queryKey: ["card-collection"],
    retry: false,
  });

  const collectionColumns = COLLECTION_COLUMNS;

  const cardAction = (action, rowData) => {
    setLoading(true);
    if (action === "delete") {
      deleteCard(rowData);
    }
  };

  const deleteCard = async (rowData) => {
    try {
      const response = await axios.delete(
        `${ApiUrls.collection}/${rowData.id}`
      );
      if (response) {
        refetch();
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const renderCardCollection = () => {
    const tableData = data?.map((card) => {
      return {
        ...card,
        ...card.card,
      };
    });

    if (!error) {
      return (
        <SVMDataTable
          columns={collectionColumns}
          data={tableData}
          cellAction={cardAction}
        />
      );
    }
  };

  return (
    <div className="container">
      <h1 className="center mb-5">Your Collection</h1>
      <div>
        {error ? (
          <Message
            severity="error"
            text={error.response.data?.msg ?? "An error has occured"}
          />
        ) : null}
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <div className="col-12 flex flex-wrap">{renderCardCollection()}</div>
      )}
      {loading ? <Loading /> : null}
    </div>
  );
}
