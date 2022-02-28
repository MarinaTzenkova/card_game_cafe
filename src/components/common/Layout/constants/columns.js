const currentPlayerPosUpToSixPlayers = "bottom-0";
const currentPlayerPosUpFromSixPlayers = "bottom-0 left-1/2";
const positions = {
  3: ["left-7 bottom-1/2", "right-7 bottom-1/2"],
  4: ["left-7 bottom-1/2", "top-0", "right-7 bottom-1/2"],
  5: ["left-7 bottom-1/3", "left-7 bottom-1/4", "top-0", "right-7 top-1/2"],
  6: [
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0",
    "right-7 top-1/4",
    "right-7 top-1/3",
  ],
  7: [
    "bottom-0 right-1/2",
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0",
    "right-7 top-1/4",
    "right-7 top-1/3",
  ],
  8: [
    "bottom-0 right-1/2",
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0 left-1/2",
    "top-0 right-1/2",
    "right-7 top-1/4",
    "right-7 top-1/3",
  ],
};

export {
  currentPlayerPosUpToSixPlayers,
  currentPlayerPosUpFromSixPlayers,
  positions,
};
