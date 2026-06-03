export type SceneKind = 'title' | 'text' | 'steps' | 'screenshot' | 'summary';

export type StepRow = {
  label: string;
  detail?: string;
};

export type VideoScene = {
  kind: SceneKind;
  durationInFrames: number;
  title: string;
  subtitle?: string;
  body?: string;
  emphasis?: string;
  caption?: string;
  steps?: StepRow[];
  image?: string;
  imageNote?: string;
  bullets?: string[];
};

export type VideoEpisode = {
  title: string;
  subtitle: string;
  fps: number;
  width: number;
  height: number;
  scenes: VideoScene[];
};
