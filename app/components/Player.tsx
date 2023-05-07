"use_client";

import { useState } from "react";

const Player = ({ x }: { x: number }) => {
  const [playing] = useState(false);
  return (
    <>
      <div> {playing ? x : "lol"} </div>
    </>
  );
};
export default Player;
