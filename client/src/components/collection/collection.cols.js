import { CardImage } from "../shared/card-image/CardImage";
import { ColorIdentityList } from "../shared/color-identity-list/ColorIdentityList";

export const COLLECTION_COLUMNS = [
  {
    field: "image_uris",
    header: "Image",
    sortable: true,
    render: "component",
    component: (card) => <CardImage card={card} />,
  },
  {
    field: "name",
    header: "Name",
    sortable: true,
    render: "text",
  },
  {
    field: "type_line",
    header: "Type",
    sortable: true,
    render: "text",
  },
  {
    field: "color_identity",
    header: "Color Identity",
    sortable: true,
    render: "component",
    component: (card) => <ColorIdentityList card={card} />,
  },
  {
    field: "amount",
    header: "Amount",
    sortable: true,
    render: "text",
  },
  {
    field: "finish",
    header: "Finish",
    sortable: true,
    render: "text",
  },
  {
    field: "set_name",
    header: "Set",
    sortable: true,
    render: "text",
  },
  {
    field: "edit",
    header: "Edit",
    render: "button",
    severity: "primary",
    icon: "pi pi-pencil",
  },
  {
    field: "delete",
    header: "Delete",
    render: "button",
    severity: "danger",
    icon: "pi pi-trash",
  },
];
