import {AbsoluteFill, Img, Sequence, Video, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import landscapeJson from './data/landscape-001.json';
import {fontStack, theme} from './theme';
import type {LandscapeEpisode, LandscapeScene} from './landscape-types';

const episode = landscapeJson as LandscapeEpisode;

export const landscapeVideoConfig = {
  fps: episode.fps,
  width: episode.width,
  height: episode.height,
  durationInFrames: episode.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0),
};

function Caption({text}: {text?: string}) {
  if (!text) return null;
  return <div style={{position: 'absolute', left: 300, right: 300, bottom: 52, padding: '18px 34px', borderRadius: 18, background: 'rgba(0,0,0,0.72)', color: '#fff', fontSize: 42, lineHeight: 1.25, fontWeight: 900, textAlign: 'center'}}>{text}</div>;
}

function TopBar({scene, index, count}: {scene: LandscapeScene; index: number; count: number}) {
  const progress = Math.round(((index + 1) / count) * 100) + '%';
  return <><div style={{position: 'absolute', top: 34, left: 56, fontSize: 28, color: '#B7D7E7', fontWeight: 800}}>{scene.chapter}</div><div style={{position: 'absolute', top: 34, right: 56, fontSize: 24, color: '#7BA7B8', fontWeight: 700}}>{index + 1} / {count}</div><div style={{position: 'absolute', top: 78, left: 56, right: 56, height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.13)', overflow: 'hidden'}}><div style={{width: progress, height: '100%', background: '#73D7FF'}} /></div></>;
}

function MediaContent({scene}: {scene: LandscapeScene}) {
  if (scene.screenMedia && scene.screenMediaType === 'video') return <Video src={staticFile(scene.screenMedia)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />;
  if (scene.screenMedia && scene.screenMediaType === 'image') return <Img src={staticFile(scene.screenMedia)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />;
  return <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #071B2E, #0B3048)', color: '#DDF6FF', fontSize: 36, lineHeight: 1.45, fontWeight: 900, padding: 70, textAlign: 'center'}}>{scene.screenNote || '这里放电脑录屏或截图'}</div>;
}

function ScreenBox({scene}: {scene: LandscapeScene}) {
  return <div style={{width: 1210, height: 682, borderRadius: 22, background: '#F7F9FC', boxShadow: '0 24px 80px rgba(0,0,0,0.32)', border: '6px solid rgba(255,255,255,0.9)', overflow: 'hidden'}}><div style={{height: 42, background: '#E9EEF5', display: 'flex', alignItems: 'center', paddingLeft: 18, gap: 9}}><span style={{width: 13, height: 13, borderRadius: 999, background: '#FF5F57'}} /><span style={{width: 13, height: 13, borderRadius: 999, background: '#FFBD2E'}} /><span style={{width: 13, height: 13, borderRadius: 999, background: '#28C840'}} /></div><div style={{height: 640, background: '#071B2E'}}><MediaContent scene={scene} /></div></div>;
}

function Callout({text}: {text?: string}) {
  if (!text) return null;
  return <div style={{position: 'absolute', top: 155, right: 105, background: '#FFFFFF', color: '#111', padding: '18px 30px', borderRadius: 20, fontSize: 38, lineHeight: 1.1, fontWeight: 1000, boxShadow: '0 18px 48px rgba(0,0,0,0.28)'}}>{text}</div>;
}

function IntroScene({scene}: {scene: LandscapeScene}) {
  return <div style={{position: 'absolute', left: 90, top: 178, width: 820}}><div style={{fontSize: 78, lineHeight: 1.05, color: '#F6FBFF', fontWeight: 1000, letterSpacing: -2}}>{scene.title}</div>{scene.subtitle && <div style={{marginTop: 32, fontSize: 36, lineHeight: 1.35, color: '#B7D7E7', fontWeight: 800}}>{scene.subtitle}</div>}<div style={{marginTop: 58, width: 520, height: 10, borderRadius: 999, background: '#73D7FF'}} /></div>;
}

function ScreenScene({scene}: {scene: LandscapeScene}) {
  return <><div style={{position: 'absolute', left: 70, top: 128, width: 520}}><div style={{fontSize: 54, lineHeight: 1.12, color: '#F6FBFF', fontWeight: 1000}}>{scene.title}</div></div><div style={{position: 'absolute', left: 645, top: 160}}><ScreenBox scene={scene} /></div><Callout text={scene.callout} /></>;
}

function StepsScene({scene}: {scene: LandscapeScene}) {
  return <div style={{position: 'absolute', left: 110, right: 110, top: 150}}><div style={{fontSize: 66, lineHeight: 1.08, color: '#F6FBFF', fontWeight: 1000}}>{scene.title}</div><div style={{marginTop: 50, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28}}>{(scene.steps || []).map((item, index) => <div key={item} style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(183,215,231,0.25)', borderRadius: 26, padding: 32, minHeight: 130}}><div style={{color: '#73D7FF', fontSize: 26, fontWeight: 900}}>STEP {index + 1}</div><div style={{marginTop: 12, color: '#fff', fontSize: 42, lineHeight: 1.2, fontWeight: 900}}>{item}</div></div>)}</div></div>;
}

function SummaryScene({scene}: {scene: LandscapeScene}) {
  return <div style={{position: 'absolute', left: 140, right: 140, top: 150}}><div style={{fontSize: 70, lineHeight: 1.08, color: '#F6FBFF', fontWeight: 1000}}>{scene.title}</div><div style={{marginTop: 48, display: 'flex', flexDirection: 'column', gap: 22}}>{(scene.bullets || []).map((item) => <div key={item} style={{background: 'rgba(255,255,255,0.1)', borderRadius: 24, padding: '26px 34px', color: '#fff', fontSize: 42, fontWeight: 900}}>✓ {item}</div>)}</div></div>;
}

function renderScene(scene: LandscapeScene) {
  if (scene.kind === 'intro') return <IntroScene scene={scene} />;
  if (scene.kind === 'screen') return <ScreenScene scene={scene} />;
  if (scene.kind === 'steps') return <StepsScene scene={scene} />;
  return <SummaryScene scene={scene} />;
}

export function LandscapeTutorialVideo() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let start = 0;
  return <AbsoluteFill style={{background: 'radial-gradient(circle at 75% 25%, #123C55 0%, #07141F 42%, #03080D 100%)', fontFamily: fontStack}}>{episode.scenes.map((scene, index) => {const from = start; start += scene.durationInFrames; const local = Math.max(0, frame - from); const opacity = spring({frame: local, fps, config: {damping: 20, stiffness: 110}}); return <Sequence key={index} from={from} durationInFrames={scene.durationInFrames}><AbsoluteFill style={{opacity}}><TopBar scene={scene} index={index} count={episode.scenes.length} />{renderScene(scene)}<Caption text={scene.caption} /></AbsoluteFill></Sequence>;})}</AbsoluteFill>;
}
