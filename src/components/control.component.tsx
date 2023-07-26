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
    <div className="w-full h-6 my-5 flex justify-center items-center">
      {running ? (
        <div className="w-full flex justify-center">
          <CustomButton onButtonClick={pause}>
            <FaPause />
          </CustomButton>
        </div>
      ) : (
        <div className="w-full grid grid-cols-3 justify-items-center">
          <div />
          <CustomButton onButtonClick={start}>
            <FaPlay />
          </CustomButton>
          {seconds > 0 ? (
            <div className="justify-self-start">
              <CustomButton onButtonClick={stop}>
                <FaStop />
              </CustomButton>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
};

export default Control;
