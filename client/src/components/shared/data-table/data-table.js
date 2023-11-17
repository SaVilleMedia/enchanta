import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function SVMDataTable({ columns, data, size = "normal" }) {
  return (
    <DataTable value={data} size={size} stripedRows>
      {columns.map((column, index) => {
        return (
          <Column
            key={index}
            field={column.field}
            header={column.header}
            sortable={column.sortable ?? "false"}
          />
        );
      })}
    </DataTable>
  );
}
