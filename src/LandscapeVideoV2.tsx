import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import episodeJson from './data/landscape-002.json';
import {fontStack} from './theme';
import type {LandscapeEpisode, LandscapeScene} from './landscape-types';

const episode = episodeJson as LandscapeEpisode;

export const landscapeV2Config = {
  fps: episode.fps,
  width: episode.width,
  height: episode.height,
  durationInFrames: episode.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0),
};

function Caption({text}: {text?: string}) {
  if (!text) return null;
  return <div style={{position: 'absolute', left: 260, right: 260, bottom: 46, padding: '16px 30px', borderRadius: 18, background: 'rgba(0,0,0,0.72)', color: '#fff', fontSize: 40, lineHeight: 1.22, fontWeight: 900, textAlign: 'center'}}>{text}</div>;
}

function TopBar({scene, index, count}: {scene: LandscapeScene; index: number; count: number}) {
  const progress = Math.round(((index + 1) / count) * 100) + '%';
  return <><div style={{position: 'absolute', top: 32, left: 54, fontSize: 27, color: '#B7D7E7', fontWeight: 900}}>{scene.chapter}</div><div style={{position: 'absolute', top: 74, left: 54, right: 54, height: 7, borderRadius: 999, background: 'rgba(255,255,255,0.13)', overflow: 'hidden'}}><div style={{width: progress, height: '100%', background: '#73D7FF'}} /></div></>;
}

function Callout({text}: {text?: string}) {
  if (!text) return null;
  return <div style={{position: 'absolute', top: 130, right: 88, background: '#fff', color: '#08111A', padding: '18px 28px', borderRadius: 20, fontSize: 36, lineHeight: 1.1, fontWeight: 1000, boxShadow: '0 18px 48px rgba(0,0,0,0.28)'}}>{text}</div>;
}

function Intro({scene}: {scene: LandscapeScene}) {
  return <><div style={{position: 'absolute', left: 98, top: 168, width: 980}}><div style={{display: 'inline-block', marginBottom: 34, padding: '13px 22px', borderRadius: 999, background: 'rgba(115,215,255,0.18)', color: '#73D7FF', fontSize: 28, fontWeight: 900}}>普通人 AI 实操</div><div style={{fontSize: 86, lineHeight: 1.03, color: '#fff', fontWeight: 1000, letterSpacing: -3}}>{scene.title}</div>{scene.subtitle && <div style={{marginTop: 30, fontSize: 42, lineHeight: 1.28, color: '#B7D7E7', fontWeight: 900}}>{scene.subtitle}</div>}</div><Callout text={scene.callout} /></>;
}

function Steps({scene}: {scene: LandscapeScene}) {
  return <div style={{position: 'absolute', left: 96, right: 96, top: 132}}><div style={{fontSize: 68, lineHeight: 1.08, color: '#fff', fontWeight: 1000, letterSpacing: -1.5}}>{scene.title}</div><div style={{marginTop: 42, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>{(scene.steps || []).map((item, index) => <div key={item} style={{background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(183,215,231,0.25)', borderRadius: 28, padding: '30px 34px', minHeight: 124}}><div style={{color: '#73D7FF', fontSize: 25, fontWeight: 1000}}>0{index + 1}</div><div style={{marginTop: 10, color: '#fff', fontSize: 43, lineHeight: 1.18, fontWeight: 1000}}>{item}</div></div>)}</div></div>;
}

function FocusOverlay({scene, progress}: {scene: LandscapeScene; progress: number}) {
  if (!scene.focus) return null;
  const box = scene.focus;
  return <><div style={{position: 'absolute', left: box.x, top: box.y, width: box.width, height: box.height, border: '6px solid #73D7FF', borderRadius: 18, boxShadow: '0 0 0 9999px rgba(0,0,0,0.25), 0 0 36px rgba(115,215,255,0.9)', opacity: progress}} />{box.label && <div style={{position: 'absolute', left: box.x, top: Math.max(12, box.y - 56), background: '#73D7FF', color: '#07141F', borderRadius: 14, padding: '10px 18px', fontSize: 28, fontWeight: 1000, opacity: progress}}>{box.label}</div>}</>;
}

function Screen({scene}: {scene: LandscapeScene}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 22, stiffness: 90}});
  const zoom = scene.zoom || 1.04;
  const imageScale = interpolate(frame, [0, 90], [1, zoom], {extrapolateRight: 'clamp'});
  return <><div style={{position: 'absolute', left: 76, top: 130, width: 505, transform: 'translateY(' + (20 - pop * 20) + 'px)', opacity: pop}}><div style={{fontSize: 60, lineHeight: 1.08, color: '#fff', fontWeight: 1000}}>{scene.title}</div>{scene.callout && <div style={{marginTop: 30, display: 'inline-block', background: '#73D7FF', color: '#07141F', borderRadius: 18, padding: '16px 24px', fontSize: 34, fontWeight: 1000}}>{scene.callout}</div>}</div><div style={{position: 'absolute', left: 625, top: 134, width: 1215, height: 684, borderRadius: 24, overflow: 'hidden', border: '6px solid rgba(255,255,255,0.9)', boxShadow: '0 24px 80px rgba(0,0,0,0.34)', background: '#071B2E'}}>{scene.screenMedia ? <><Img src={staticFile(scene.screenMedia)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(' + imageScale + ')'}} /><FocusOverlay scene={scene} progress={pop} /></> : <div style={{color: '#DDF6FF', fontSize: 36, padding: 80}}>{scene.screenNote}</div>}</div></>;
}

function Summary({scene}: {scene: LandscapeScene}) {
  return <div style={{position: 'absolute', left: 130, right: 130, top: 140}}><div style={{fontSize: 72, lineHeight: 1.08, color: '#fff', fontWeight: 1000}}>{scene.title}</div><div style={{marginTop: 44, display: 'flex', flexDirection: 'column', gap: 20}}>{(scene.bullets || []).map((item) => <div key={item} style={{background: 'rgba(255,255,255,0.1)', borderRadius: 24, padding: '24px 32px', color: '#fff', fontSize: 42, fontWeight: 1000}}>✓ {item}</div>)}</div></div>;
}

function render(scene: LandscapeScene) {
  if (scene.kind === 'intro') return <Intro scene={scene} />;
  if (scene.kind === 'screen') return <Screen scene={scene} />;
  if (scene.kind === 'steps') return <Steps scene={scene} />;
  return <Summary scene={scene} />;
}

export function LandscapeTutorialVideoV2() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let start = 0;
  return <AbsoluteFill style={{background: 'radial-gradient(circle at 75% 25%, #123C55 0%, #07141F 43%, #03080D 100%)', fontFamily: fontStack}}>{episode.scenes.map((scene, index) => {const from = start; start += scene.durationInFrames; const local = Math.max(0, frame - from); const opacity = spring({frame: local, fps, config: {damping: 20, stiffness: 110}}); return <Sequence key={index} from={from} durationInFrames={scene.durationInFrames}><AbsoluteFill style={{opacity}}><TopBar scene={scene} index={index} count={episode.scenes.length} />{render(scene)}<Caption text={scene.caption} /></AbsoluteFill></Sequence>;})}</AbsoluteFill>;
}
