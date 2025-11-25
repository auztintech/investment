"use client";
import { AvailableVideo } from "@/lib/api/video";
import { useWatchVideo } from "@/lib/hooks/useVideo";
import { useState } from "react";

export function VideoPlayer({ video }: { video: AvailableVideo }) {
  const watchMutation = useWatchVideo();
  const [sent, setSent] = useState(false);

  const handleEnded = () => {
    if (!sent) {
      setSent(true);
      watchMutation.mutate(video.id);
    }
  };

  return (
    <div className="mb-3">
      <h3 className="font-semibold text-sm mb-1">{video.title}</h3>
      <p className="text-sm">{video.description}</p>

      <div className="relative overflow-hidden rounded-sm">
        <video
          controls
          onEnded={handleEnded}
          className="w-full"
          poster={video.thumbnail || ""}>
          <source src={video.video_file} type="video/mp4" />
        </video>

        {sent && (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(255,0,0,0.5)]">
            <p className="text-white text-lg font-semibold">
              Earnings credited!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
