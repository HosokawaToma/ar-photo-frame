import Webcam from "react-webcam";
import style from "@/styles/camera.module.css";

const Camera = ({ webcamRef, width, height, facingMode, onUserMedia }: CameraProps) => {
  const videoConstraints: MediaTrackConstraints = {
    width: { ideal: width },
    height: { ideal: height },
    aspectRatio: { exact: 4/3 },
    facingMode: { ideal: facingMode },
  };

  return (
    <Webcam
      audio={false}
      ref={webcamRef}
      forceScreenshotSourceSize={true}
      videoConstraints={videoConstraints}
      className={style["camera"]}
      onUserMedia={onUserMedia}
    />
  );
};

export default Camera;
