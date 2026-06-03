export type LandscapeSceneKind = 'intro' | 'screen' | 'steps' | 'summary';

export type ScreenMediaType = 'image' | 'video';

export type LandscapeScene = {
  kind: LandscapeSceneKind;
  durationInFrames: number;
  chapter: string;
  title: string;
  subtitle?: string;
  callout?: string;
  caption?: string;
  screenNote?: string;
  screenMedia?: string;
  screenMediaType?: ScreenMediaType;
  steps?: string[];
  bullets?: string[];
};

export type LandscapeEpisode = {
  title: string;
  subtitle: string;
  fps: number;
  width: number;
  height: number;
  scenes: LandscapeScene[];
};
