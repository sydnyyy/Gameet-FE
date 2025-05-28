"use client";

import { apiRequest } from "@/app/api/apiRequest";
import { useMatchingCodeOptions } from "@/hooks/pages/code/useMatchingCodeOptions";
import { useAuthStore } from "@/store/useAuthStore";
import { CombinedFormData } from "@/types/profile";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

interface Props {
  methods: UseFormReturn<CombinedFormData>;
  onBack: () => void;
}

export default function GameInfoForm({ methods, onBack }: Props) {
  const router = useRouter();
  const { email, role } = useAuthStore.getState();

  const codeOptions = useMatchingCodeOptions();
  if (!codeOptions) return <div>Loading...</div>;

  const platforms = Object.entries(codeOptions.GAME_PLATFORM);
  const preferred_genres = Object.entries(codeOptions.PREFERRED_GENRE);
  const play_style = Object.entries(codeOptions.PLAY_STYLE);
  const game_skill_level = Object.entries(codeOptions.GAME_SKILL_LEVEL);

  // 개별 watch 사용
  const watchedPlatforms = methods.watch("platforms") || [];
  const watchedPreferredGenres = methods.watch("preferred_genres") || [];
  const watchedPlayStyle = methods.watch("play_style") || "";
  const watchedGameSkillLevel = methods.watch("game_skill_level") || "";
  const watchedIsVoice = methods.watch("is_voice") ?? false;
  const watchedIsAdultMatchAllowed = methods.watch("is_adult_match_allowed") ?? false;

  const handleSubmit = async (data: CombinedFormData) => {
    try {
      const method = role === "GUEST" ? "POST" : "PUT";
      await apiRequest<{ available: boolean }>(`/users/profile`, method, data);

      if (role === "GUEST") {
        alert("프로필 생성이 완료되었습니다.");
      } else {
        alert("프로필 수정이 완료되었습니다.");
      }

      router.push("/");
    } catch (error: any) {
      alert(error?.request?.responseText || "오류가 발생했습니다.");
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">내 게임 정보를 알려주세요</h2>

      <label className="text-sm">플랫폼</label>
      <div className="flex gap-2 mb-2">
        {platforms.map(([key, label]) => {
          const isActive = watchedPlatforms.includes(key);
          return (
            <button
              key={key}
              type="button"
              className={`border rounded px-4 py-2 text-sm ${isActive ? "bg-gray-500 text-white" : ""}`}
              onClick={() => {
                const updated = isActive
                  ? watchedPlatforms.filter(item => item !== key)
                  : [...watchedPlatforms, key];
                methods.setValue("platforms", updated);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <label className="text-sm">선호 장르</label>
      <div className="flex gap-2 flex-wrap mb-2">
        {preferred_genres.map(([key, label]) => {
          const isActive = watchedPreferredGenres.includes(key);
          return (
            <button
              key={key}
              type="button"
              className={`border rounded px-4 py-2 text-sm ${isActive ? "bg-gray-500 text-white" : ""}`}
              onClick={() => {
                const updated = isActive
                  ? watchedPreferredGenres.filter(item => item !== key)
                  : [...watchedPreferredGenres, key];
                methods.setValue("preferred_genres", updated);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <label className="text-sm">플레이 스타일</label>
      <div className="flex gap-2 mb-2">
        {play_style.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`border rounded px-4 py-2 text-sm ${watchedPlayStyle === key ? "bg-gray-500 text-white" : ""}`}
            onClick={() => methods.setValue("play_style", key)}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="text-sm">게임 실력</label>
      <div className="flex gap-2 mb-2">
        {game_skill_level.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`border rounded px-4 py-2 text-sm ${watchedGameSkillLevel === key ? "bg-gray-500 text-white" : ""}`}
            onClick={() => methods.setValue("game_skill_level", key)}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="text-sm">마이크 사용 가능 여부</label>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          className={`border rounded px-4 py-2 text-sm ${watchedIsVoice ? "bg-gray-500 text-white" : ""}`}
          onClick={() => methods.setValue("is_voice", true)}
        >
          가능
        </button>
        <button
          type="button"
          className={`border rounded px-4 py-2 text-sm ${!watchedIsVoice ? "bg-gray-500 text-white" : ""}`}
          onClick={() => methods.setValue("is_voice", false)}
        >
          불가능
        </button>
      </div>

      <label className="text-sm">매칭 상대 미성년 여부</label>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          className={`border rounded px-4 py-2 text-sm ${watchedIsAdultMatchAllowed ? "bg-gray-500 text-white" : ""}`}
          onClick={() => methods.setValue("is_adult_match_allowed", true)}
        >
          가능
        </button>
        <button
          type="button"
          className={`border rounded px-4 py-2 text-sm ${!watchedIsAdultMatchAllowed ? "bg-gray-500 text-white" : ""}`}
          onClick={() => methods.setValue("is_adult_match_allowed", false)}
        >
          불가능
        </button>
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" className="px-6 py-2 border rounded" onClick={onBack}>
          이전
        </button>
        <button
          type="submit"
          onClick={methods.handleSubmit(handleSubmit)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          완료
        </button>
      </div>
    </>
  );
}
