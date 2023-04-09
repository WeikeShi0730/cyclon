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
    <>
      <div>
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
    </>
  );
};

export default PlayButton;
