import { useState } from "react";
import "./App.css";
import { manifest } from "./scripts/data/item_manifests";
import ItemIcon from "./components/ItemData/ItemIcon";

function App() {
  const [itemIdx, setItemIdx] = useState<number>(0);

  const totalItems = manifest.length;

  const cssSize = 200;

  const setRngItem = () => {
    setItemIdx(Math.floor(Math.random() * totalItems));
  };

  return (
    <>
      <button
        onClick={setRngItem}
        className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
      >
        Randomize the item
      </button>
      {
        <div
          style={{ width: cssSize, height: cssSize }}
          className={`overflow-hidden`}
        >
          <ItemIcon data={manifest[itemIdx]}></ItemIcon>
        </div>
      }
    </>
  );
}

export default App;
