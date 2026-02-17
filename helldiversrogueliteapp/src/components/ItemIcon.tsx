export default function ItemIcon({
  data,
}: {
  data: { icon_url: string } | null;
}) {
  // stackoverflow.com/questions/19126185/setting-an-image-src-to-empty
  const nullImage: string =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #d1c9c9, #282929)",
        borderWidth: "1px",
        borderColor: "black",
      }}
    >
      <img
        style={{
          flex: "1 1 100%",
          width: "100%",
          height: "100%",
          objectFit: "fill",
          filter:
            "drop-shadow(1px 1px 0 #1b1b1b) drop-shadow(1px -1px 0 #1b1b1b)",
        }}
        src={data?.icon_url ?? nullImage}
      ></img>
    </div>
  );
}
