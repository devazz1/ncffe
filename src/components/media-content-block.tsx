"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export type MediaContentBlockProps = {
  videoUrl?: string | null;
  imageUrl?: string | null;
  heading?: string | null;
  description?: string | null;
};

export function MediaContentBlock({
  videoUrl,
  imageUrl,
  heading,
  description,
}: MediaContentBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const v = videoUrl?.trim() ?? "";
  const i = imageUrl?.trim() ?? "";
  const hasVideo = v.length > 0;
  const hasImage = i.length > 0;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      void video.play();
      return;
    }

    video.pause();
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const nextMutedState = !video.muted;
    video.muted = nextMutedState;
    setIsMuted(nextMutedState);
  }, []);

  const imageAlt =
    heading?.trim() ||
    description?.trim()?.slice(0, 120) ||
    "Media";

  const media =
    hasVideo ? (
      <div className="relative aspect-896/437 w-full overflow-hidden rounded-2xl bg-zinc-100">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          preload={hasImage ? "none" : "metadata"}
          poster={hasImage ? i : undefined}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
        >
          <source src={v} />
        </video>
        {!isPlaying ? (
          <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
        ) : null}
        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-3">
          <button
            type="button"
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-white/10 text-white shadow-sm backdrop-blur-[2px] transition hover:bg-white/20"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="size-4 opacity-90" aria-hidden />
            ) : (
              <Play className="size-4 translate-x-0.5 fill-current opacity-90" aria-hidden />
            )}
          </button>
          <button
            type="button"
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-white/10 text-white shadow-sm backdrop-blur-[2px] transition hover:bg-white/20"
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="size-4 opacity-90" aria-hidden />
            ) : (
              <Volume2 className="size-4 opacity-90" aria-hidden />
            )}
          </button>
        </div>
      </div>
    ) : hasImage ? (
      <div className="relative aspect-896/437 w-full overflow-hidden rounded-2xl bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary CMS URLs */}
        <img src={i} alt={imageAlt} className="h-full w-full object-cover" />
      </div>
    ) : null;

  const hasCopy =
    Boolean(heading?.trim()) || Boolean(description?.trim());

  if (!media && !hasCopy) {
    return null;
  }

  return (
    <article className="flex flex-col gap-4">
      {media}
      {hasCopy ? (
        <div className="flex flex-col gap-1.5">
          {heading?.trim() ? (
            <h3 className="text-lg font-medium leading-snug tracking-tight sm:text-lg">
              {heading.trim()}
            </h3>
          ) : null}
          {description?.trim() ? (
            <p className="text-base leading-relaxed text-[#6b6b6c]">
              {description.trim()}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
