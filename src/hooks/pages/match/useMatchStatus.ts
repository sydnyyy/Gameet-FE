import { apiRequest } from "@/app/api/apiRequest";
import { MatchStatusType, StartMatchType } from "@/types/match";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const matchQueryKeys = {
  all: ["match"] as const,
  status: () => [...matchQueryKeys.all, "status"] as const,
};

// 매칭 상태 Query
export const useMatchQueue = () => {
  return useQuery<MatchStatusType, Error>({
    queryKey: matchQueryKeys.status(),
    queryFn: async () => {
      const res = await apiRequest<MatchStatusType>("match", "GET");
      return res.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

// 매칭 시작 Mutation
export const useStartMatch = () => {
  const queryClient = useQueryClient();
  return useMutation<MatchStatusType, Error, StartMatchType>({
    mutationFn: async payload => {
      const res = await apiRequest<MatchStatusType>("match", "POST", payload);
      return res.data;
    },
    onSuccess: async data => {
      console.log("매칭 시작:", data);
      // 매칭 시작 시 상태 업데이트
      await queryClient.refetchQueries({ queryKey: matchQueryKeys.status() });
    },
    onError: err => {
      console.log("매칭 시작 실패:", err);
    },
  });
};

// 매칭 취소 Mutation
export const useCancelMatch = () => {
  const queryClient = useQueryClient();
  return useMutation<MatchStatusType, Error>({
    mutationFn: async () => {
      const res = await apiRequest<MatchStatusType>("match", "DELETE");
      return res.data;
    },
    onSuccess: data => {
      console.log("매칭 취소", data);
      // 매칭 취소 시 상태 업데이트
      queryClient.invalidateQueries({ queryKey: matchQueryKeys.status() });
    },
    onError: err => {
      console.log("매칭 취소 실패:", err);
    },
  });
};
