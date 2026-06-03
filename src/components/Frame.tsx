import {AbsoluteFill} from 'remotion';
import {fontStack, theme} from '../theme';

export function Frame({children, sceneIndex, sceneCount}: any) {
  const progressWidth = Math.round(((sceneIndex + 1) / sceneCount) * 100) + '%';

  return (
    <AbsoluteFill style={{background: theme.background, color: theme.ink, fontFamily: fontStack, padding: 72}}>
      <div style={{position: 'absolute', top: 48, left: 72, right: 72, height: 10, borderRadius: 999, background: theme.border, overflow: 'hidden'}}>
        <div style={{width: progressWidth, height: '100%', background: theme.accent}} />
      </div>
      <div style={{position: 'absolute', top: 76, right: 72, fontSize: 24, color: theme.muted}}>
        {sceneIndex + 1} / {sceneCount}
      </div>
      {children}
    </AbsoluteFill>
  );
}
