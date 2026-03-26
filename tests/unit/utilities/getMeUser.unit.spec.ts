import { describe, it, expect, vi, beforeEach } from 'vitest'

const redirectMock = vi.fn()
const cookiesMock = vi.fn()

vi.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => redirectMock(...args),
}))

vi.mock('next/headers', () => ({
  cookies: () => cookiesMock(),
}))

vi.mock('@/utilities/getURL', () => ({
  getClientSideURL: () => 'https://app.example',
}))

describe('getMeUser', () => {
  beforeEach(() => {
    vi.resetModules()
    redirectMock.mockReset()
    redirectMock.mockImplementation((url: string) => {
      throw new Error(`REDIRECT:${String(url)}`)
    })
    cookiesMock.mockReset()
    global.fetch = vi.fn()
  })

  it('redirects when validUserRedirect and user ok', async () => {
    cookiesMock.mockResolvedValue({
      get: (name: string) => (name === 'payload-token' ? { value: 'tok' } : undefined),
    })
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 1 } }),
    } as Response)

    const { getMeUser } = await import('@/utilities/getMeUser')
    await expect(getMeUser({ validUserRedirect: '/dash' })).rejects.toThrow('REDIRECT:/dash')
    expect(redirectMock).toHaveBeenCalledWith('/dash')
  })

  it('returns token and user when fetch succeeds', async () => {
    cookiesMock.mockResolvedValue({
      get: (name: string) => (name === 'payload-token' ? { value: 'tok' } : undefined),
    })
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 1, email: 'a@b.com' } }),
    } as Response)

    const { getMeUser } = await import('@/utilities/getMeUser')
    const result = await getMeUser()
    expect(result.token).toBe('tok')
    expect(result.user.id).toBe(1)
  })

  it('redirects when nullUserRedirect and request fails', async () => {
    cookiesMock.mockResolvedValue({ get: () => undefined })
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ user: null }),
    } as Response)

    const { getMeUser } = await import('@/utilities/getMeUser')
    await expect(getMeUser({ nullUserRedirect: '/login' })).rejects.toThrow('REDIRECT:/login')
    expect(redirectMock).toHaveBeenCalledWith('/login')
  })
})
