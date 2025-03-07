import { useState, useEffect, useRef } from "react";

export function useShutterEffect() {
  const [isShutterActive, setIsShutterActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const preloadShutterSound = async () => {
      const response = await fetch("/sounds/Camera-Phone01-1.mp3");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const audio = new Audio(blobUrl);
      audio.preload = "auto";
      audio.load();
      audioRef.current = audio;
    };

    preloadShutterSound();
  }, []);

  const triggerShutter = () => {
    if (!audioRef.current) {
      return;
    }
    setIsShutterActive(true);
    const shutterSound = audioRef.current;
    shutterSound.play();
  };

  return { isShutterActive, triggerShutter };
}
