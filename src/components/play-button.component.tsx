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
    <div className="absolute bottom-4 w-24 h-24 bg-gray rounded-full border-4 border-teal">
      <div className="h-full w-full flex justify-center items-center text-5xl text-teal">
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
  );
};

export default PlayButton;
