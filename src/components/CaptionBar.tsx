import {theme} from '../theme';

export function CaptionBar({text}: {text?: string}) {
  if (!text) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        right: 72,
        bottom: 72,
        minHeight: 124,
        borderRadius: 36,
        background: 'rgba(255, 249, 239, 0.94)',
        border: '2px solid ' + theme.border,
        boxShadow: theme.shadow,
        padding: '28px 36px',
        fontSize: 36,
        lineHeight: 1.35,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {text}
    </div>
  );
}
