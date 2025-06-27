import { useState } from "react";
import PlayGame from "./Components/PlayGame";
import { emojiArray16, emojiArray32, emojiArray64 } from "./assets/elements";
import { arrayRandomize } from "./utils/helper";
import { gridSize } from "./store/states";

const beforeColor = {
  Easy: "before:bg-[#1df951]",
  Medium: "before:bg-[#f2a009]",
  Hard: "before:bg-[#f20928]",
};
const borderColor = {
  Easy: "#1df951",
  Medium: "#f2a009",
  Hard: "#f20928",
};

function App() {
  const [showType, setShowType] = useState<boolean>(false);
  const [isStartGame, setGameStart] = useState<boolean>(false);
  const [randomizeArray, setRandomizeArray] = useState<string[]>([]);
  const TypeOfGrid = [
    { label: "Easy", size: 4 },
    { label: "Medium", size: 6 },
    { label: "Hard", size: 8 },
  ];
  // mapping with array should be picked
  const arrayPicking: Record<number, string[]> = {
    4: emojiArray16,
    6: emojiArray32,
    8: emojiArray64,
  };

  const GameModeHandler = (grid_size: number) => {
    gridSize.value = grid_size; // Set the selected grid size
    setGameStart(true); // Start the game
    const selectedEmojiArray = arrayPicking[gridSize.value];
    const randomized = arrayRandomize([...selectedEmojiArray]);
    setRandomizeArray(randomized);
  };

  return (
    <>
      <main className="h-screen w-full overflow-hidden">
        {/* Game Starting Section */}
        <div
          className={`h-screen w-full flex-center flex-col gap-4 transition-transform duration-500 ease-in-out hero-section ${
            isStartGame ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <h1 className="text-4xl header-text">
            {!showType ? "Welcome To DITTo" : "Select Play Mode"}
          </h1>
          <button
            onClick={() => {
              setShowType(true);
            }}
            disabled={showType}
            className="disabled:opacity-0 play-btn"
          >
            Start Game
          </button>
          <div
            className={`${
              showType ? "opacity-100" : "opacity-0"
            } flex-center flex-row md:gap-7 gap-2`}
          >
            {TypeOfGrid.map((grid) => (
              <button
                className={`flex items-center justify-center cursor-pointer mode-btn ${
                  beforeColor[grid.label as keyof typeof beforeColor]
                } `}
                key={grid.label}
                disabled={!showType}
                onClick={() => GameModeHandler(grid.size)}
              >
                <p
                  className={`mode-text border border-[#91908f47] hover:border-[${
                    borderColor[grid.label as keyof typeof borderColor]
                  }]`}
                >
                  <span>
                    {grid.size === 4 ? "🟢" : grid.size === 6 ? "🟡" : grid.size === 8 ? "🔴" : ""}
                  </span>
                  {grid.label}
                </p>
              </button>
            ))}
          </div>
        </div>
        {/* Game Playing Section */}
        <div
          className={`h-screen w-full transition-transform duration-500 ease-in-out ${
            isStartGame ? "-translate-y-full" : "translate-y-0"
          } flex justify-end items-center flex-col gap-3`}
        >
          <PlayGame size={gridSize.value} randomizeArray={randomizeArray} />
        </div>
      </main>
    </>
  );
}

export default App;
