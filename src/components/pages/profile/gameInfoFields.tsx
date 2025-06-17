import ToggleButton from "@/components/common/button/ToggleButton";
import { GameInfoFormProps } from "@/types/profile";

export default function GameInfoFields({
  methods,
  codeOptions,
  readOnly = false,
}: GameInfoFormProps) {
  if (!codeOptions) return <div>Loading...</div>;

  const game_platforms = Object.entries(codeOptions.GAME_PLATFORM);
  const preferred_genres = Object.entries(codeOptions.PREFERRED_GENRE);
  const play_style = Object.entries(codeOptions.PLAY_STYLE);
  const game_skill_level = Object.entries(codeOptions.GAME_SKILL_LEVEL);

  const watchedGamePlatforms = methods.watch("game_platforms") || [];
  const watchedPreferredGenres = methods.watch("preferred_genres") || [];
  const watchedPlayStyle = methods.watch("play_style") || "";
  const watchedGameSkillLevel = methods.watch("game_skill_level") || "";
  const watchedIsVoice = methods.watch("is_voice") ?? true;
  const watchedIsAdultMatchAllowed = methods.watch("is_adult_match_allowed") ?? true;

  return (
    <>
      <label className="info-label">플랫폼</label>
      <div className="flex gap-2 mb-2">
        {game_platforms.map(([key, label]) => {
          const isActive = watchedGamePlatforms.includes(key);
          return (
            <ToggleButton
              key={key}
              isActive={isActive}
              onClick={
                readOnly
                  ? undefined
                  : () => {
                      const updated = isActive
                        ? watchedGamePlatforms.filter(item => item !== key)
                        : [...watchedGamePlatforms, key];
                      methods.setValue("game_platforms", updated);
                    }
              }
            >
              {label}
            </ToggleButton>
          );
        })}
      </div>

      <label className="info-label">선호 장르</label>
      <div className="flex gap-2 flex-wrap mb-2">
        {preferred_genres.map(([key, label]) => {
          const isActive = watchedPreferredGenres.includes(key);
          return (
            <ToggleButton
              key={key}
              isActive={isActive}
              onClick={
                readOnly
                  ? undefined
                  : () => {
                      const updated = isActive
                        ? watchedPreferredGenres.filter(item => item !== key)
                        : [...watchedPreferredGenres, key];
                      methods.setValue("preferred_genres", updated);
                    }
              }
            >
              {label}
            </ToggleButton>
          );
        })}
      </div>

      <label className="info-label">플레이 스타일</label>
      <div className="flex gap-2 mb-2">
        {play_style.map(([key, label]) => (
          <ToggleButton
            key={key}
            isActive={watchedPlayStyle === key}
            onClick={readOnly ? undefined : () => methods.setValue("play_style", key)}
          >
            {label}
          </ToggleButton>
        ))}
      </div>

      <label className="info-label">게임 실력</label>
      <div className="flex gap-2 mb-2 flex-wrap">
        {game_skill_level.map(([key, label]) => (
          <ToggleButton
            key={key}
            isActive={watchedGameSkillLevel === key}
            onClick={readOnly ? undefined : () => methods.setValue("game_skill_level", key)}
          >
            {label}
          </ToggleButton>
        ))}
      </div>

      <label className="info-label">마이크 사용 가능 여부</label>
      <div className="flex gap-2 mb-2">
        <ToggleButton
          isActive={watchedIsVoice === true}
          onClick={readOnly ? undefined : () => methods.setValue("is_voice", true)}
        >
          가능
        </ToggleButton>
        <ToggleButton
          isActive={watchedIsVoice === false}
          onClick={readOnly ? undefined : () => methods.setValue("is_voice", false)}
        >
          불가능
        </ToggleButton>
      </div>

      <label className="info-label">매칭 상대 미성년 여부</label>
      <div className="flex gap-2 mb-2">
        <ToggleButton
          isActive={watchedIsAdultMatchAllowed === true}
          onClick={readOnly ? undefined : () => methods.setValue("is_adult_match_allowed", true)}
        >
          가능
        </ToggleButton>
        <ToggleButton
          isActive={watchedIsAdultMatchAllowed === false}
          onClick={readOnly ? undefined : () => methods.setValue("is_adult_match_allowed", false)}
        >
          불가능
        </ToggleButton>
      </div>
    </>
  );
}
