import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #F97316, #EA580C)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polygon
            points="10,2 18,7 18,13 10,18 2,13 2,7"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polygon
            points="10,2 18,7 10,10 2,7"
            fill="rgba(255,255,255,0.3)"
            stroke="white"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <line x1="10" y1="10" x2="10" y2="18" stroke="white" strokeWidth="1.2" />
          <line x1="2" y1="7" x2="10" y2="10" stroke="white" strokeWidth="1" />
          <line x1="18" y1="7" x2="10" y2="10" stroke="white" strokeWidth="1" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
