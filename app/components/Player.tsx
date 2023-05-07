"use client";

interface IPlayer {
  id: number;
}

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Player = ({ id }: IPlayer) => {
  return id ? (
    <>
      <ReactPlayer
        url={`/items/${id}/video.mp4`}
        loop={true}
        playing
        controls={true}
      />
    </>
  ) : null;
};
export default Player;
