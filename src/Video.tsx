import {AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import episodeJson from './data/episode-001.json';
import {CaptionBar} from './components/CaptionBar';
import {Frame} from './components/Frame';
import {theme} from './theme';
import type {VideoEpisode, VideoScene} from './video-types';

const episode = episodeJson as VideoEpisode;

export const videoConfig = {
  fps: episode.fps,
  width: episode.width,
  height: episode.height,
  durationInFrames: episode.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0),
};

function Card({children}: any) {
  return <div style={{background: theme.paper, border: '2px solid ' + theme.border, borderRadius: 42, boxShadow: theme.shadow, padding: 46}}>{children}</div>;
}

function SceneTitle({scene}: {scene: VideoScene}) {
  return <div style={{marginTop: 230}}><div style={{fontSize: 82, lineHeight: 1.08, fontWeight: 900, letterSpacing: -2}}>{scene.title}</div>{scene.subtitle && <div style={{marginTop: 34, fontSize: 38, lineHeight: 1.4, color: theme.muted, fontWeight: 700}}>{scene.subtitle}</div>}</div>;
}

function TextScene({scene}: {scene: VideoScene}) {
  return <div style={{marginTop: 210}}><Card><div style={{fontSize: 58, lineHeight: 1.15, fontWeight: 900}}>{scene.title}</div>{scene.body && <div style={{marginTop: 42, fontSize: 39, lineHeight: 1.55, color: theme.ink}}>{scene.body}</div>}{scene.emphasis && <div style={{marginTop: 42, borderRadius: 28, background: theme.accentSoft, padding: 30, fontSize: 40, lineHeight: 1.35, fontWeight: 900, color: theme.ink}}>{scene.emphasis}</div>}</Card></div>;
}

function StepsScene({scene}: {scene: VideoScene}) {
  return <div style={{marginTop: 180}}><div style={{fontSize: 58, lineHeight: 1.12, fontWeight: 900}}>{scene.title}</div><div style={{marginTop: 42, display: 'flex', flexDirection: 'column', gap: 26}}>{(scene.steps || []).map((step, index) => <Card key={step.label}><div style={{display: 'flex', gap: 28, alignItems: 'flex-start'}}><div style={{width: 62, height: 62, borderRadius: 999, background: theme.accent, color: '#fff', fontSize: 34, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{index + 1}</div><div><div style={{fontSize: 42, fontWeight: 900}}>{step.label}</div>{step.detail && <div style={{marginTop: 12, fontSize: 32, lineHeight: 1.4, color: theme.muted}}>{step.detail}</div>}</div></div></Card>)}</div></div>;
}

function ScreenshotScene({scene}: {scene: VideoScene}) {
  return <div style={{marginTop: 170}}><div style={{fontSize: 56, lineHeight: 1.12, fontWeight: 900}}>{scene.title}</div><div style={{marginTop: 42}}><Card><div style={{height: 560, borderRadius: 34, background: '#F1E6D8', border: '2px dashed ' + theme.border, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, textAlign: 'center', fontSize: 34, lineHeight: 1.45, color: theme.muted, fontWeight: 800}}>{scene.imageNote || '这里放截图素材'}</div>{scene.body && <div style={{marginTop: 34, fontSize: 36, lineHeight: 1.48, color: theme.ink}}>{scene.body}</div>}</Card></div></div>;
}

function SummaryScene({scene}: {scene: VideoScene}) {
  return <div style={{marginTop: 190}}><div style={{fontSize: 58, lineHeight: 1.12, fontWeight: 900}}>{scene.title}</div><div style={{marginTop: 46, display: 'flex', flexDirection: 'column', gap: 30}}>{(scene.bullets || []).map((item) => <Card key={item}><div style={{fontSize: 42, lineHeight: 1.25, fontWeight: 900}}>✓ {item}</div></Card>)}</div></div>;
}

function renderScene(scene: VideoScene) {
  if (scene.kind === 'title') return <SceneTitle scene={scene} />;
  if (scene.kind === 'steps') return <StepsScene scene={scene} />;
  if (scene.kind === 'screenshot') return <ScreenshotScene scene={scene} />;
  if (scene.kind === 'summary') return <SummaryScene scene={scene} />;
  return <TextScene scene={scene} />;
}

export function AiLearningVideo() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let start = 0;
  return <AbsoluteFill style={{background: theme.background}}>{episode.scenes.map((scene, index) => {const from = start; start += scene.durationInFrames; const local = Math.max(0, frame - from); const scale = spring({frame: local, fps, config: {damping: 18, stiffness: 120}}); return <Sequence key={index} from={from} durationInFrames={scene.durationInFrames}><Frame sceneIndex={index} sceneCount={episode.scenes.length}><div style={{transform: 'scale(' + (0.96 + scale * 0.04) + ')', transformOrigin: 'center top'}}>{renderScene(scene)}</div><CaptionBar text={scene.caption} /></Frame></Sequence>;})}</AbsoluteFill>;
}
