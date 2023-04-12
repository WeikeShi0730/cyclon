import { FaPlay, FaPause } from "react-icons/fa";

const PlayButton = ({
  start,
  pause,
  running,
}: {
  start: () => void;
  pause: () => void;
  running: boolean;
}) => {
  return (
    <div className="w-full h-8 flex justify-center">
      <div className="w-12 h-12 -mt-6 bg-white rounded-full border-2 border-gray">
        <div className="h-full w-full flex justify-center items-center text-2xl text-teal">
          {running ? (
            <button onClick={pause}>
              <FaPause />
            </button>
          ) : (
            <button onClick={start}>
              <FaPlay />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayButton;
