import { ImageResponse } from 'next/og'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/site'

export const runtime = 'edge'

export const alt = SITE_NAME

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
        background: 'linear-gradient(145deg, #1a2f1e 0%, #0f1712 45%, #1b2618 100%)',
        color: '#e8f0e6',
        fontFamily: 'system-ui, Segoe UI, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          maxWidth: 900,
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 26,
          fontWeight: 400,
          opacity: 0.88,
          maxWidth: 820,
          lineHeight: 1.35,
        }}
      >
        {SITE_DESCRIPTION}
      </div>
    </div>,
    { ...size },
  )
}
