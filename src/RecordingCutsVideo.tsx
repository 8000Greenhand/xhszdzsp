import {AbsoluteFill, Sequence, Video, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import cutsJson from './data/recording-cuts-001.json';
import {fontStack} from './theme';

type Segment = {
  startFrame: number;
  durationInFrames: number;
  chapter: string;
  title: string;
  caption: string;
  badge: string;
};

type CutsConfig = {
  title: string;
  subtitle: string;
  fps: number;
  width: number;
  height: number;
  recording: string;
  segments: Segment[];
};

const config = cutsJson as CutsConfig;

export const recordingCutsConfig = {
  fps: config.fps,
  width: config.width,
  height: config.height,
  durationInFrames: config.segments.reduce((sum, item) => sum + item.durationInFrames, 0),
};

function SegmentOverlay({segment, index, total}: {segment: Segment; index: number; total: number}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 22, stiffness: 100}});
  const titleY = interpolate(pop, [0, 1], [24, 0]);

  return <>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,8,13,0.42), rgba(3,8,13,0.08), rgba(3,8,13,0.18))'}} />
    <div style={{position: 'absolute', top: 36, left: 50, right: 50, height: 7, borderRadius: 999, background: 'rgba(255,255,255,0.18)', overflow: 'hidden'}}>
      <div style={{width: ((index + 1) / total) * 100 + '%', height: '100%', background: '#73D7FF'}} />
    </div>
    <div style={{position: 'absolute', top: 64, left: 58, display: 'flex', gap: 16, alignItems: 'center', opacity: pop, transform: 'translateY(' + titleY + 'px)'}}>
      <div style={{background: 'rgba(0,0,0,0.62)', color: '#B7D7E7', border: '1px solid rgba(115,215,255,0.36)', borderRadius: 999, padding: '11px 18px', fontSize: 26, fontWeight: 900}}>{segment.chapter}</div>
      <div style={{background: '#73D7FF', color: '#06111B', borderRadius: 999, padding: '11px 18px', fontSize: 26, fontWeight: 1000}}>{segment.badge}</div>
    </div>
    <div style={{position: 'absolute', left: 64, top: 128, width: 610, opacity: pop, transform: 'translateY(' + titleY + 'px)'}}>
      <div style={{fontSize: 58, lineHeight: 1.08, color: '#fff', fontWeight: 1000, letterSpacing: -1.5, textShadow: '0 12px 30px rgba(0,0,0,0.45)'}}>{segment.title}</div>
    </div>
    <div style={{position: 'absolute', left: 230, right: 230, bottom: 44, background: 'rgba(0,0,0,0.76)', color: '#fff', borderRadius: 20, padding: '18px 30px', fontSize: 38, lineHeight: 1.24, fontWeight: 1000, textAlign: 'center', boxShadow: '0 16px 48px rgba(0,0,0,0.35)'}}>{segment.caption}</div>
  </>;
}

function SegmentScene({segment, index}: {segment: Segment; index: number}) {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, segment.durationInFrames], [1.03, 1.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#03080D'}}>
    <Video src={staticFile(config.recording)} startFrom={segment.startFrame} muted style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(' + scale + ')'}} />
    <SegmentOverlay segment={segment} index={index} total={config.segments.length} />
  </AbsoluteFill>;
}

export function RecordingCutsVideo() {
  let start = 0;
  return <AbsoluteFill style={{background: '#03080D', fontFamily: fontStack}}>
    {config.segments.map((segment, index) => {
      const from = start;
      start += segment.durationInFrames;
      return <Sequence key={index} from={from} durationInFrames={segment.durationInFrames}>
        <SegmentScene segment={segment} index={index} />
      </Sequence>;
    })}
  </AbsoluteFill>;
}
