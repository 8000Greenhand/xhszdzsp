import {Composition} from 'remotion';
import {AiLearningVideo, videoConfig} from './Video';
import {LandscapeTutorialVideo, landscapeVideoConfig} from './LandscapeVideo';
import {LandscapeTutorialVideoV2, landscapeV2Config} from './LandscapeVideoV2';
import {RecordingTutorialVideo, recordingVideoConfig} from './RecordingTutorialVideo';
import {RecordingCutsVideo, recordingCutsConfig} from './RecordingCutsVideo';

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
      <Composition
        id="LandscapeTutorialVideoV2"
        component={LandscapeTutorialVideoV2}
        durationInFrames={landscapeV2Config.durationInFrames}
        fps={landscapeV2Config.fps}
        width={landscapeV2Config.width}
        height={landscapeV2Config.height}
      />
      <Composition
        id="RecordingTutorialVideo"
        component={RecordingTutorialVideo}
        durationInFrames={recordingVideoConfig.durationInFrames}
        fps={recordingVideoConfig.fps}
        width={recordingVideoConfig.width}
        height={recordingVideoConfig.height}
      />
      <Composition
        id="RecordingCutsVideo"
        component={RecordingCutsVideo}
        durationInFrames={recordingCutsConfig.durationInFrames}
        fps={recordingCutsConfig.fps}
        width={recordingCutsConfig.width}
        height={recordingCutsConfig.height}
      />
    </>
  );
};
