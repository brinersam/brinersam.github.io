import type { itemData } from "../../scripts/defs/models/itemData";

export default function ItemIcon({ data }: { data: itemData }) {
  return (
    <>
      <img src={data.icon_url}></img>
    </>
  );
}
