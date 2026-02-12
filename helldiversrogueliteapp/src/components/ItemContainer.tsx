import ItemIcon from "./ItemIcon";

export default function ItemsContainer({
  size,
  data,
  itemCount,
}: {
  size: { width: number; height: number };
  data: { icon_url: string }[];
  itemCount?: number;
}) {
  let itemData: { icon_url: string }[] | null[] = data;

  if (itemCount != null && itemCount > 0) {
    itemData = data.slice(0, itemCount);
  }
  if (itemData.length <= 0) {
    itemData = Array.from({ length: itemCount as number }, () => null);
  }

  return (
    <div>
      {itemData.map((v, idx) => {
        return (
          <div key={idx} style={size} className={`overflow-hidden`}>
            <ItemIcon data={v}></ItemIcon>
          </div>
        );
      })}
    </div>
  );
}
