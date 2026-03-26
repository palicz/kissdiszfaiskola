import { describe, it, expect, vi, beforeEach } from 'vitest'

const ctx = vi.hoisted(() => ({ canUseDOM: false }))

vi.mock('@/utilities/canUseDOM', () => ({
  get default() {
    return ctx.canUseDOM
  },
}))

describe('getServerSideURL', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    vi.resetModules()
    ctx.canUseDOM = false
    process.env = { ...ORIGINAL_ENV }
    Reflect.deleteProperty(process.env, 'NEXT_PUBLIC_SERVER_URL')
    Reflect.deleteProperty(process.env, 'VERCEL_URL')
    Reflect.deleteProperty(process.env, 'VERCEL_PROJECT_PRODUCTION_URL')
  })

  async function loadModule() {
    return await import('@/utilities/getURL')
  }

  it('returns NEXT_PUBLIC_SERVER_URL when set', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://example.com'
    const { getServerSideURL } = await loadModule()
    expect(getServerSideURL()).toBe('https://example.com')
  })

  it('prepends https:// when protocol is missing', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'example.com'
    const { getServerSideURL } = await loadModule()
    expect(getServerSideURL()).toBe('https://example.com')
  })

  it('strips trailing slash', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://example.com/'
    const { getServerSideURL } = await loadModule()
    expect(getServerSideURL()).toBe('https://example.com')
  })

  it('falls back to VERCEL_URL', async () => {
    process.env.VERCEL_URL = 'my-app.vercel.app'
    const { getServerSideURL } = await loadModule()
    expect(getServerSideURL()).toBe('https://my-app.vercel.app')
  })

  it('falls back to localhost when no env vars are set', async () => {
    const { getServerSideURL } = await loadModule()
    expect(getServerSideURL()).toBe('http://localhost:3000')
  })
})

describe('getClientSideURL', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    vi.resetModules()
    ctx.canUseDOM = false
    process.env = { ...ORIGINAL_ENV }
    Reflect.deleteProperty(process.env, 'NEXT_PUBLIC_SERVER_URL')
    Reflect.deleteProperty(process.env, 'VERCEL_URL')
    Reflect.deleteProperty(process.env, 'VERCEL_PROJECT_PRODUCTION_URL')
  })

  it('returns server URL when DOM is unavailable', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://site.example'
    const { getClientSideURL } = await import('@/utilities/getURL')
    expect(getClientSideURL()).toBe('https://site.example')
  })

  it('returns window origin when DOM is available', async () => {
    ctx.canUseDOM = true
    vi.stubGlobal('window', {
      location: {
        protocol: 'https:',
        hostname: 'app.example',
        port: '3000',
      },
    })
    const { getClientSideURL } = await import('@/utilities/getURL')
    expect(getClientSideURL()).toBe('https://app.example:3000')
    vi.unstubAllGlobals()
  })
})
