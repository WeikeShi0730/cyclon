import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import CustomButton from "./custom-button.component";

const Control = ({
  start,
  pause,
  stop,
  seconds,
  running,
}: {
  start: () => void;
  pause: () => void;
  stop: () => void;
  seconds: number;
  running: boolean;
}) => {
  return (
    <>
      {running ? (
        <div className="w-full h-8 flex justify-center">
          <CustomButton onButtonClick={pause}>
            <FaPause />
          </CustomButton>
        </div>
      ) : (
        <div className="w-full h-8 grid grid-cols-3 justify-items-center">
          <div />
          <CustomButton onButtonClick={start}>
            <FaPlay />
          </CustomButton>
          {seconds > 0 ? (
            <CustomButton onButtonClick={stop}>
              <FaStop />
            </CustomButton>
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  );
};

export default Control;
