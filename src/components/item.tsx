import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default () => {
  const [playing, setPlaying] = useState(false);
  return <>
    <ReactPlayer url={"/api/video?id=1"} loop={true} playing={playing} controls={true} />
  </>;
}
