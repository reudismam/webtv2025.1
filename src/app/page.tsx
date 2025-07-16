"use client"

import { useRef, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import videos, { Video } from "./data/VideoList";

export default function Home() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoIndex, setVideoIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const configVideo = (index: number) => {
    const currentIndex = index % videos.length;
    setVideoIndex(currentIndex);
  }

  const configCurrentTime = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setCurrentTime(time);
  }

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
      <div className="flex flex-col mr-2 w-[15%] gap-2 bg-amber-50 h-[70vh]">
        {
          videos.map((video: Video, index) => {
            return <button key={index} className="text-white" onClick={() => configVideo(index)}>
              <img src={video.image}/>
              <h3 className="text-black">{video.description}</h3>
            </button>
          }
          )
        }
      </div>

      <div className="w-[20vw] h-[70vh] bg-[#888888]">
        <div className="flex justify-center m-1">
          <video ref={videoRef} className="w-[80%]" src={videos[videoIndex].url}> </video>
        </div>
        <button onClick={playPause}>
          {playing ? <FaPause className="text-black cursor-pointer" />
            : <FaPlay className="text-black cursor-pointer" />}
        </button>
        <input className="w-[100%]" type="range"
          min={0}
          max={videoRef.current?.duration}
          step={0.01}
          value={currentTime}
          onChange={e => configCurrentTime(Number(e.target.value))}
        />
        <button onClick={() => configCurrentTime(currentTime - 10)}>
          <FaBackward />
        </button>
        <button className="ml-[10px]" onClick={() => configCurrentTime(currentTime + 10)}>
          <FaForward />
        </button>
        <div>
        </div>
      </div>
    </div>
  );
}
