import type { itemData } from "../../scripts/defs/models/itemData";

export default function ItemIcon({ data }: { data: itemData | null }) {
  // stackoverflow.com/questions/19126185/setting-an-image-src-to-empty
  const nullImage: string =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

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
        src={data?.icon_url ?? nullImage}
      ></img>
    </>
  );
}
