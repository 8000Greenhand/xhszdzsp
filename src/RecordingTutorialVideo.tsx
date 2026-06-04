import {AbsoluteFill, Video, interpolate, staticFile, useCurrentFrame} from 'remotion';
import recordingJson from './data/recording-001.json';
import {fontStack} from './theme';

const config = recordingJson as {
  title: string;
  subtitle: string;
  fps: number;
  width: number;
  height: number;
  recording: string;
  durationInFrames: number;
  caption: string;
  chapters: {time: string; label: string}[];
};

export const recordingVideoConfig = {
  fps: config.fps,
  width: config.width,
  height: config.height,
  durationInFrames: config.durationInFrames,
};

function TitleOverlay() {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20, 120, 160], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', left: 70, top: 70, width: 780, opacity}}><div style={{display: 'inline-block', background: 'rgba(8,17,26,0.78)', color: '#73D7FF', padding: '12px 18px', borderRadius: 999, fontSize: 25, fontWeight: 1000, marginBottom: 18}}>录屏主导教程 v0.4</div><div style={{background: 'rgba(0,0,0,0.58)', color: '#fff', padding: '28px 34px', borderRadius: 26, fontSize: 60, lineHeight: 1.08, fontWeight: 1000, boxShadow: '0 18px 50px rgba(0,0,0,0.35)'}}>{config.title}</div><div style={{marginTop: 16, color: '#B7D7E7', fontSize: 30, fontWeight: 900}}>{config.subtitle}</div></div>;
}

function ChapterPill() {
  const frame = useCurrentFrame();
  const seconds = Math.floor(frame / config.fps);
  let active = config.chapters[0]?.label || '';
  for (const chapter of config.chapters) {
    const parts = chapter.time.split(':').map(Number);
    const chapterSeconds = parts[0] * 60 + parts[1];
    if (seconds >= chapterSeconds) active = chapter.label;
  }
  return <div style={{position: 'absolute', top: 42, right: 54, background: 'rgba(0,0,0,0.66)', color: '#fff', border: '1px solid rgba(115,215,255,0.45)', borderRadius: 999, padding: '13px 22px', fontSize: 28, fontWeight: 1000, boxShadow: '0 10px 30px rgba(0,0,0,0.25)'}}>当前画面：{active}</div>;
}

function BottomCaption() {
  return <div style={{position: 'absolute', left: 240, right: 240, bottom: 44, background: 'rgba(0,0,0,0.74)', color: '#fff', borderRadius: 20, padding: '18px 30px', fontSize: 38, lineHeight: 1.22, fontWeight: 1000, textAlign: 'center', boxShadow: '0 16px 48px rgba(0,0,0,0.35)'}}>{config.caption}</div>;
}

function ProgressBar() {
  const frame = useCurrentFrame();
  const progress = frame / Math.max(1, config.durationInFrames - 1);
  return <div style={{position: 'absolute', left: 48, right: 48, bottom: 20, height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.2)', overflow: 'hidden'}}><div style={{width: progress * 100 + '%', height: '100%', background: '#73D7FF'}} /></div>;
}

export function RecordingTutorialVideo() {
  return <AbsoluteFill style={{background: '#03080D', fontFamily: fontStack}}><Video src={staticFile(config.recording)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,8,13,0.18), rgba(3,8,13,0), rgba(3,8,13,0.14))'}} /><TitleOverlay /><ChapterPill /><BottomCaption /><ProgressBar /></AbsoluteFill>;
}
