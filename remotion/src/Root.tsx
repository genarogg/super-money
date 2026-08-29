import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { MainVideoVertical } from "./MainVideoVertical";
import { FPS, videoDuration } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={videoDuration}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="MainVideoVertical"
        component={MainVideoVertical}
        durationInFrames={videoDuration}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
