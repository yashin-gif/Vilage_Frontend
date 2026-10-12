import { getYouTubeEmbedUrl } from '../../utils/media'

// ভিডিও (ইউটিউব হলে এমবেড, নইলে সাধারণ ভিডিও) এবং অডিও চালায়
export default function MediaPlayer({ audioUrl, videoUrl, title }) {
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null

  if (!audioUrl && !videoUrl) return null

  return (
    <div className="space-y-4">
      {videoUrl &&
        (embedUrl ? (
          <div className="aspect-video overflow-hidden rounded-2xl bg-slate-900">
            <iframe
              title={title}
              src={embedUrl}
              className="h-full w-full"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <video
            controls
            preload="metadata"
            src={videoUrl}
            aria-label={title}
            className="w-full rounded-2xl bg-slate-900"
          />
        ))}

      {audioUrl && (
        <audio controls preload="none" src={audioUrl} aria-label={title} className="w-full" />
      )}
    </div>
  )
}