require('dotenv').config({ path: '.env' })

function normalizeSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'
  let u = String(raw).trim()
  if (u && !/^https?:\/\//i.test(u)) {
    u = `https://${u}`
  }
  return u.replace(/\/$/, '')
}

const SITE_URL = normalizeSiteUrl()

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/posts/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
