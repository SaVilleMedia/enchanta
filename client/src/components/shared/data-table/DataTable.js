import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ColorIdentityList } from "../color-identity-list/ColorIdentityList";

export default function SVMDataTable({
  columns,
  data,
  size = "normal",
  cellAction,
}) {
  const cardAction = (action, rowData) => {
    cellAction(action, rowData);
  };

  const renderButton = (column, rowData) => {
    return (
      <Button
        severity={column.severity}
        icon={column.icon}
        size="small"
        label={column.header}
        onClick={() => cardAction(column.field, rowData)}
      />
    );
  };

  return (
    <DataTable className="w-full" value={data} size={size} stripedRows>
      {columns.map((column, index) => {
        if (column.render === "text") {
          return (
            <Column
              key={index}
              field={column.field}
              header={column.header}
              sortable={column.sortable ?? "false"}
            />
          );
        }
        if (column.render === "component") {
          return (
            <Column
              key={index}
              field={column.field}
              header={column.header}
              sortable={column.sortable ?? "false"}
              body={(rowData) => column.component(rowData)}
            />
          );
        }
        if (column.render === "button") {
          return (
            <Column
              key={index}
              body={(rowData) => renderButton(column, rowData)}
            />
          );
        }
        return null;
      })}
    </DataTable>
  );
}
