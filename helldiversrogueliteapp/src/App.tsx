// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import ItemIcon from "./components/ItemData/ItemIcon";
import { manifest } from "./scripts/data/item_manifests";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <button className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700">
        Save changes
      </button>
      <ItemIcon data={manifest[0]}></ItemIcon>
    </>
  );
}

export default App;
