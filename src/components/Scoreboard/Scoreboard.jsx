import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Scoreboard() {
  const [collapse, setCollapse] = useState(false);
  const [cols, setCols] = useState([]);
  const participants = useSelector((state) => state.participants);
  const scores = useSelector((state) => state.scores);

  useEffect(() => {
    if (Object.keys(scores).length !== 0 && cols.length === 0) {
      const columns = scores[0];

      setCols(columns.map((score) => score.column));
    }
  }, [scores, cols]);

  return (
    <div className="relative">
      <div onClick={() => setCollapse(!collapse)}>
        <div className="bg-white px-2 w-min rounded-md cursor-pointer">
          Scoreboard
        </div>
      </div>
      {collapse ? (
        <div className="border-2 border-gray-700 bg-white absolute left-0 overflow-auto rounded-md z-10">
          <div className="flex flex-row w-full">
            <div className="pr-3 border-r-2 ml-2">
              <div className="h-6"></div>
              {cols.map((col, _index) => (
                <div key={_index}>{col}</div>
              ))}
            </div>
            <div className="flex flex-row">
              {participants.map((participant) => (
                <div className="border-r-2" key={participant.id}>
                  <span className="px-5 border-b-2">{participant.name}</span>
                  <div className="flex flex-col">
                    {scores[participant.id].length !== 0
                      ? scores[participant.id].map((score, index) =>
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
      ) : (
        ""
      )}
    </div>
  );
}
