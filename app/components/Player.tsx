"use client";

interface IPlayer {
  id: number;
  className?: string;
}

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Player = ({ id, className }: IPlayer) => {
  return id ? (
    <ReactPlayer
      url={`/items/${id}/video.mp4`}
      loop={true}
      playing
      controls={true}
      className={className ?? {}}
    />
  ) : null;
};
export default Player;
