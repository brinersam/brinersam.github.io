import type { itemData } from "../../scripts/defs/models/itemData";

export default function ItemIcon({ data }: { data: itemData }) {
  return (
    <>
      <img
        style={{
          borderWidth: "1px",
          borderColor: "black",
          flex: "1 1 100%",
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
        src={data.icon_url}
      ></img>
    </>
  );
}
