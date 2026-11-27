// Build-time GitHub snapshot → public/github.json
//
// Why: the site is static (GitHub Pages) and the public GitHub API allows only
// 60 unauthenticated requests/hour per visitor IP. Fetching live on every visit
// made the Shadow Army wall and Progress Log randomly fail. Instead the deploy
// workflow runs this script (with the workflow's GITHUB_TOKEN) and ships the
// result as a static file, so the page data never depends on a rate limit.
// If anything fails the script exits 0 and leaves any existing file alone, so
// a GitHub hiccup can never break a deploy.
import { writeFile, mkdir } from 'node:fs/promises'

const USER = process.env.GITHUB_USER || 'ArjithSiva'
const TOKEN = process.env.GITHUB_TOKEN
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-snapshot',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
}

async function get(url) {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.json()
}

async function paged(url) {
  const out = []
  for (let page = 1; page <= 5; page++) {
    const batch = await get(`${url}${url.includes('?') ? '&' : '?'}per_page=100&page=${page}`)
    out.push(...batch)
    if (batch.length < 100) break
  }
  return out
}

const mapRepo = (r) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  url: r.html_url,
  homepageUrl: r.homepage && r.homepage.trim() ? r.homepage.trim() : null,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  pushedAt: r.pushed_at,
  language: r.language,
  stars: r.stargazers_count,
  forks: r.forks_count,
  isPrivate: r.private,
  isFork: r.fork,
  isArchived: r.archived,
  topics: r.topics ?? [],
})

async function contributions() {
  if (!TOKEN) return null
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}`
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: USER } }),
  })
  if (!res.ok) return null
  const json = await res.json()
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar
  if (!cal) return null
  return {
    total: cal.totalContributions,
    weeks: cal.weeks.map((w) => w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))),
  }
}

try {
  const [user, repos, starred, calendar] = await Promise.all([
    get(`https://api.github.com/users/${USER}`),
    paged(`https://api.github.com/users/${USER}/repos?type=owner&sort=pushed`),
    paged(`https://api.github.com/users/${USER}/starred`),
    contributions().catch(() => null),
  ])
  const data = {
    generatedAt: Date.now(),
    profile: {
      login: user.login,
      htmlUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      createdAt: user.created_at,
    },
    repos: repos.map(mapRepo),
    starred: starred.map(mapRepo),
    contributions: calendar,
  }
  await mkdir('public', { recursive: true })
  await writeFile('public/github.json', JSON.stringify(data))
  console.log(`github.json: ${data.repos.length} repos, ${data.starred.length} starred, calendar=${!!calendar}`)
} catch (err) {
  console.warn('fetch-github: skipped (', err.message, ') — existing snapshot, if any, is kept')
}
