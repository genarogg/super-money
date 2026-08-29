import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { FPS, videoDuration } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MainVideo"
      component={MainVideo}
      durationInFrames={videoDuration}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
