import React, { ReactNode } from "react";

const CustomButton = ({
  children,
  onButtonClick,
}: {
  children: ReactNode;
  onButtonClick: () => void;
}) => {
  return (
    <div className="w-12 h-12 bg-white rounded-full border-2 border-gray">
      <div className="h-full w-full flex justify-center items-center text-2xl text-teal">
        <button onClick={onButtonClick}>{children}</button>
      </div>
    </div>
  );
};

export default CustomButton;
