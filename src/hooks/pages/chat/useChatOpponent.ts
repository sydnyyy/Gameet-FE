"use client";

import { apiRequest } from "@/app/api/apiRequest";
import { ProfileFormType } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

interface UseChatOpponentOptions {
  roomId: number;
  myProfileId: number;
}

export function useChatOpponent({ roomId, myProfileId }: UseChatOpponentOptions) {
  const {
    data: opponent,
    error,
    isPending: isLoading,
    refetch,
  } = useQuery<ProfileFormType, Error>({
    queryKey: ["chatOpponent", roomId, myProfileId],
    queryFn: async () => {
      const res = await apiRequest<ProfileFormType>(
        `/api/chat/opponent?roomId=${roomId}&myProfileId=${myProfileId}`,
        "GET",
      );
      return res.data;
    },
    enabled: !!roomId && !!myProfileId,
    refetchOnWindowFocus: false,
  });

  return {
    opponent,
    error,
    isLoading,
    refetch,
  };
}
