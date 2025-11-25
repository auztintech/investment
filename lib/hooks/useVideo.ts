import { useQuery, useMutation } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import api from "../axiosInstance";
import { AvailableVideo, DailyStats, VideoHistoryItem } from "../api/video";

export function useAvailableVideos() {
  return useQuery({
    queryKey: ["videos", "available"],
    queryFn: async () => {
      const res = await api.get(endpoints.Videos.available);
      return res.data as AvailableVideo[];
    },
  });
}

export function useVideoStats() {
  return useQuery<DailyStats>({
    queryKey: ["videos", "stats"],
    queryFn: async () => {
      try {
        const res = await api.get(endpoints.Videos.statsDaily);
        console.log("useVideoStats raw response:", res.data);

        // Handle backend returning array or object
        let stats: DailyStats | undefined;
        if (Array.isArray(res.data)) {
          stats = res.data[0];
        } else if (res.data && typeof res.data === "object") {
          stats = res.data;
        }

        if (!stats) {
          console.warn("No daily stats returned, returning default object");
        }

        // Always return a valid DailyStats object
        return (
          stats ?? {
            has_active_investment: false,
            plan_level: 0,
            daily_limit: 0,
            videos_watched_today: 0,
            earnings_today: "0",
            available_videos: 0,
            remaining_views: 0,
          }
        );
      } catch (error) {
        console.error("Error fetching daily stats:", error);
        return {
          has_active_investment: false,
          plan_level: 0,
          daily_limit: 0,
          videos_watched_today: 0,
          earnings_today: "0",
          available_videos: 0,
          remaining_views: 0,
        };
      }
    },
    refetchOnWindowFocus: false, // avoid excessive requests
  });
}


export function useVideoHistory() {
  return useQuery({
    queryKey: ["videos", "history"],
    queryFn: async () => {
      const res = await api.get(endpoints.Videos.history);
      return res.data as VideoHistoryItem[];
    },
  });
}

export function useWatchVideo() {
  return useMutation({
    mutationFn: async (videoId: number) => {
      const res = await api.post(endpoints.Videos.watch, {
        video_id: videoId,
      });
      return res.data;
    },
  });
}
