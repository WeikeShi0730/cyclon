import React from "react";
import Map from "@/components/map.component";
import Dash from "@/components/dash.component";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-96 bg-slate-300 flex flex-col">
        <div className="h-1/2 flex justify-center items-center">
          <Map />
        </div>
        <div className="h-1/2 flex justify-center items-center">
          <Dash />
        </div>
      </div>
    </div>
  );
};

export default Home;
