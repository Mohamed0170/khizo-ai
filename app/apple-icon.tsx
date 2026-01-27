import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="khizo-gradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          
          <g fill="url(#khizo-gradient)">
            <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(45 16 16)" />
            <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(-45 16 16)" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
