// ইউটিউবের লিংক থেকে এমবেড লিংক বানায়; ইউটিউবের না হলে null দেয়
export function getYouTubeEmbedUrl(url) {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    const parts = parsed.pathname.split('/')
    let id = null

    if (host === 'youtu.be') {
      id = parts[1]
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') id = parsed.searchParams.get('v')
      else if (parts[1] === 'embed' || parts[1] === 'shorts') id = parts[2]
    }

    return id && /^[\w-]{6,20}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null
  } catch {
    return null
  }
}