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
  let itemData: ({ icon_url: string } | null)[] = data;

  if (itemCount != null && itemCount > 0) {
    itemData = data.slice(0, itemCount);
  }
  if (itemData.length <= 0 || itemData.length < (itemCount as number)) {
    const emptiesToFill = (itemCount ?? 0) - itemData.length;
    const emptiesarray = Array.from({ length: emptiesToFill }, () => null);
    itemData = itemData.concat(emptiesarray);
  }

  return (
    <>
      {itemData.map((v, idx) => {
        return (
          <div key={idx} style={size} className={`overflow-hidden`}>
            <ItemIcon data={v}></ItemIcon>
          </div>
        );
      })}
    </>
  );
}
