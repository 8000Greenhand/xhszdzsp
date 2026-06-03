import {Composition} from 'remotion';
import {AiLearningVideo, videoConfig} from './Video';

export const Root = () => {
  return (
    <Composition
      id="AiLearningVideo"
      component={AiLearningVideo}
      durationInFrames={videoConfig.durationInFrames}
      fps={videoConfig.fps}
      width={videoConfig.width}
      height={videoConfig.height}
    />
  );
};
