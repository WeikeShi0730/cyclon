import React from "react";

const DashCell = ({
  title,
  data,
}: {
  title: string;
  data: number | string;
}) => {
  return (
    <div>
      <div className="h-full flex flex-col shadow-md">
        <div className="m-1 text-xl">{title}</div>
        <div className="h-full m-4 flex justify-center items-center tabular-nums text-4xl tracking-tighter scale-y-110 text-teal">
          {data}
        </div>
      </div>
    </div>
  );
};

export default DashCell;
