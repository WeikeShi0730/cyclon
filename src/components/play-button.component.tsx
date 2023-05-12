import { FaPlay, FaPause, FaStop } from "react-icons/fa";

const PlayButton = ({
  start,
  pause,
  stop,
  running,
}: {
  start: () => void;
  pause: () => void;
  stop: () => void;
  running: boolean;
}) => {
  return (
    <div className="w-full h-8 flex justify-center">
      {running ? (
        <div className="w-12 h-12 -mt-6 bg-white rounded-full border-2 border-gray">
          <div className="h-full w-full flex justify-center items-center text-2xl text-teal">
            <button onClick={pause}>
              <FaPause />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-around">
          <div className="w-12 h-12 -mt-6 bg-white rounded-full border-2 border-gray">
            <div className="h-full w-full flex justify-center items-center text-2xl text-teal">
              <button onClick={start}>
                <FaPlay />
              </button>
            </div>
          </div>
          <div className="w-12 h-12 -mt-6 bg-white rounded-full border-2 border-gray">
            <div className="h-full w-full flex justify-center items-center text-2xl text-teal">
              <button onClick={stop}>
                <FaStop />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayButton;
