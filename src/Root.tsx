import {Composition} from 'remotion';
import {AiLearningVideo, videoConfig} from './Video';
import {LandscapeTutorialVideo, landscapeVideoConfig} from './LandscapeVideo';

export const Root = () => {
  return (
    <>
      <Composition
        id="VerticalShortVideo"
        component={AiLearningVideo}
        durationInFrames={videoConfig.durationInFrames}
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
      />
      <Composition
        id="LandscapeTutorialVideo"
        component={LandscapeTutorialVideo}
        durationInFrames={landscapeVideoConfig.durationInFrames}
        fps={landscapeVideoConfig.fps}
        width={landscapeVideoConfig.width}
        height={landscapeVideoConfig.height}
      />
    </>
  );
};
