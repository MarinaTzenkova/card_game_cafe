import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner";

const DEFAULT_SCORES = [2, 3, 4, 5, 6, 7];

export default function Scoreboard() {
  const [cols, setCols] = useState([]);
  const game = useSelector((state) => state.game);

  const [scores, setSocres] = useState({});

  function generateBoardBasedOnMode() {
    // check, based on mode
    const mode = game.mode;
    const amountOfParticipants = game.amountOfParticipants;

    const ones = Array(amountOfParticipants).fill(1);
    const eights = Array(amountOfParticipants).fill(8);

    const columns = [
      ...ones,
      ...DEFAULT_SCORES,
      ...eights,
      ...DEFAULT_SCORES,
      ...ones,
    ];

    setCols(columns);

    generatePlayerScores();
  }

  function generatePlayerScores() {
    Object.keys(game.participants).forEach((key, _index) => {
      setSocres((oldScore) => ({
        ...oldScore,
        [_index]: cols.map((col) => ({ column: col, called: null, score: 0 })),
      }));
    });
  }

  useEffect(() => {
    generateBoardBasedOnMode();
  }, [game]);

  if (!game.hasStarted) return <Spinner />;
  return (
    <div className="relative">
      <div className="border-2 border-gray-700 bg-white absolute left-0 overflow-auto rounded-md">
        Scoreboard
        <div className="flex flex-row w-full">
          <div className="pr-3">
            <div className="h-6"></div>
            {cols.map((col, _index) => (
              <div key={_index}>{col}</div>
            ))}
          </div>
          <div className="flex flex-row">
            {/* <div className="w-6"></div> */}
            {Object.values(game.participants).map((participant, _i) => (
              <div key={_i}>
                <span className="px-5">{participant}</span>
                <div className="flex flex-col">
                  {Object.keys(scores).length !== 0
                    ? scores[_i].map((score, index) =>
                        score.called ? (
                          <div key={index} className="px-6">
                            {score.score} | {score.called}
                          </div>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
