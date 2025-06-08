import { useState } from "react";
import { Search } from "./components/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Favourite } from "./components/Favourite";

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col items-center  w-full h-full mt-16 space-y-8">
      <div className="w-[20%] flex justify-between items-center ">
        <button
          className={`border rounded-l-xl w-full p-3 cursor-pointer   ${
            !toggle ? "bg-blue-600 text-white" : "hover:bg-blue-800"
          }`}
          onClick={() => setToggle(false)}
        >
          Home
        </button>
        <button
          className={`border rounded-r-xl w-full p-3 cursor-pointer  ${
            toggle ? "bg-blue-600" : "hover:bg-blue-800"
          }`}
          onClick={() => setToggle(true)}
        >
          {" "}
          Favourite
        </button>
      </div>
      <div className="">{!toggle ? <Search /> : <Favourite />}</div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
