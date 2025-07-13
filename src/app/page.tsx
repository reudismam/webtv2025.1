"use client"

import { truncateSync } from "node:fs";
import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function Home() {
  const [playing, setPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    }
    else {
      video.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#222222] flex justify-center items-center">
      <div className="w-[20vw] h-[70vh] bg-[#888888]">
        <div className="flex justify-center m-1">
          <video ref={videoRef} className="w-[80%]" src="./assets/video01.mp4"> </video>
        </div>
        <button onClick={playPause}>
          {playing ? <FaPause className="text-black cursor-pointer" /> 
          : <FaPlay className="text-black cursor-pointer"/>}
        </button>
        <div>
        </div>
      </div>
    </div>
  );
}
