import { counter, player1Move, Player1Point, Player2Point } from "../store/states";
import Card from "./Card";
import "./playGameStyle.css";
import { useSignals } from "@preact/signals-react/runtime";

// img import
import ball from "../assets/img/pokeball/Pokeball.png";
import p1 from "../assets/img/player/p1.png";
import p2 from "../assets/img/player/p2.png";
import draw from "../assets/img/player/draw.png";

interface PropType {
  size: number;
  randomizeArray: string[];
}

const PlayGame = (props: PropType) => {
  useSignals();
  const gridSize = props.size;
  const cells = Array.from({ length: gridSize * gridSize });
  // Define an object to map grid sizes to Tailwind CSS classes
  const gridClasses: Record<number, string> = {
    4: "md:grid-cols-4 md:grid-rows-4",
    6: "md:grid-cols-6 md:grid-rows-6",
    8: "md:grid-cols-8 md:grid-rows-8",
  };
  const smGridClasses: Record<number, string> = {
    4: "grid-cols-4 grid-rows-4",
    6: "grid-cols-4 grid-rows-9",
    8: "grid-cols-4 grid-rows-16",
  };

  if (counter.value === gridSize * gridSize) {
    const result =
      Player1Point.value > Player2Point.value
        ? "p1"
        : Player1Point.value < Player2Point.value
        ? "p2"
        : "draw";

    return (
      <div className="h-screen w-full flex-center absolute left-0 top-0">
        <div className="flex-center flex-col gap-4 p-16 text-3xl">
          <div
            className={`player w-full flex-center h-full text-2xl p-2 ${
              result === "p1"
                ? "left-box active"
                : result === "p2"
                ? "right-box active"
                : "draw-box"
            }`}
          >
            <img
              src={
                Player1Point.value > Player2Point.value
                  ? p1
                  : Player1Point.value < Player2Point.value
                  ? p2
                  : draw
              }
              alt="player1"
            />
          </div>
          <p className="text-[18px] ">
            {Player1Point.value > Player2Point.value
              ? "Player 1 wins 🍾"
              : Player1Point.value < Player2Point.value
              ? "Player 2 wins 🍾"
              : "It's a draw 🤝"}
          </p>

          <button onClick={() => window.location.reload()} className="play-btn">
            <span className="text-2xl">🔁</span>
            Rematch
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full game-header">
        <div
          className={`left-box player w-full flex-center h-full text-2xl p-2 ${
            player1Move.value ? "active" : ""
          }`}
        >
          <img src={p1} alt="player1" />
        </div>
        <div className="score-turn flex justify-between items-center ">
          <div
            className={`poke-ball flex-center flex-col ${player1Move.value ? "active-player" : ""}`}
          >
            <img src={ball} alt="poke" />
            <p className="text-sm">
              Score -<span> {Player1Point.value}</span>
            </p>
          </div>
          <h2 className="md:text-xl text-sm text-center w-full flex-center">
            {player1Move.value ? "Player 1's turn" : "Player 2's turn"}
          </h2>
          <div
            className={`poke-ball flex-center flex-col ${
              !player1Move.value ? "active-player" : ""
            }`}
          >
            <img src={ball} alt="poke" />
            <p className="text-sm">
              Score -<span> {Player2Point.value}</span>
            </p>
          </div>
        </div>
        <div
          className={` right-box player w-full flex-center h-full text-2xl p-2 ${
            !player1Move.value && "active"
          }`}
        >
          <img src={p2} alt="player2" />
        </div>
      </div>
      <div
        className={`${gridSize === 4 ? "h-[90vh]" : "h-screen"} w-[80%] grid ${
          gridClasses[gridSize]
        } ${smGridClasses[gridSize]} gap-2 place-items-center p-4`}
      >
        {cells.map((_, key) => (
          <div key={key} className=" h-full w-full flex-center">
            <Card hiddenElement={props.randomizeArray[key]} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayGame;
