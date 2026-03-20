import canUseDOM from './canUseDOM'

function normalizeBaseUrl(raw: string | undefined): string | undefined {
  if (!raw?.trim()) return undefined
  let u = raw.trim()
  if (!/^https?:\/\//i.test(u)) {
    u = `https://${u}`
  }
  return u.replace(/\/$/, '')
}

export const getServerSideURL = () => {
  return (
    normalizeBaseUrl(process.env.NEXT_PUBLIC_SERVER_URL) ||
    normalizeBaseUrl(process.env.VERCEL_URL) ||
    normalizeBaseUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    'http://localhost:3000'
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return getServerSideURL()
}
