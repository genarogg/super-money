import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { FPS, totalDuration } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MainVideo"
      component={MainVideo}
      durationInFrames={totalDuration}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
