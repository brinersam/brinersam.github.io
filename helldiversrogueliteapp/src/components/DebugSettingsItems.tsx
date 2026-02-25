import type { UUID } from "../scripts/defs/helpers/appUUID";
import type { itemData } from "../scripts/defs/models/itemData";
import ItemIcon from "./ItemIcon";

export default function DebugSettingsItems({
  items,
  size,
  userPrefs,
  onClick,
}: {
  items: itemData[];
  size: React.CSSProperties | undefined;
  userPrefs: Set<UUID>;
  onClick: (id: UUID) => void;
}) {
  return (
    <>
      {items.map((x) => (
        <div
          key={x.id}
          style={{
            ...size,
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: userPrefs.has(x.id) ? "green" : "red",
          }}
          className={`overflow-hidden`}
          onClick={() => onClick(x.id)}
        >
          <ItemIcon data={x}></ItemIcon>
        </div>
      ))}
    </>
  );
}
