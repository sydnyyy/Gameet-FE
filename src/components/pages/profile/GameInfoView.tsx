"use client";

import ToggleButton from "@/components/common/button/ToggleButton";
import { CommonCodeOptions } from "@/hooks/code/useCommonCodeOptions";
import { ProfileFormType } from "@/types/profile";

interface GameInfoViewProps {
  codeOptions: CommonCodeOptions;
  values: Partial<ProfileFormType>;
}

export default function GameInfoView({ codeOptions, values }: GameInfoViewProps) {
  const {
    game_platforms = [],
    preferred_genres = [],
    play_style,
    game_skill_level,
    is_voice,
    is_adult_match_allowed,
  } = values;

  const renderToggleGroup = (
    selectedKeys: string[] | string | undefined,
    options: Record<string, string>,
    multiple: boolean = false,
  ) => {
    return (
      <div className="flex gap-2 mb-2 flex-wrap">
        {Object.entries(options).map(([key, label]) => {
          const isActive = multiple
            ? Array.isArray(selectedKeys) && selectedKeys.includes(key)
            : selectedKeys === key;

          return (
            <ToggleButton key={key} isActive={isActive} onClick={undefined}>
              {label}
            </ToggleButton>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      <div>
        <label className="info-label">플랫폼</label>
        {renderToggleGroup(game_platforms, codeOptions.GAME_PLATFORM, true)}
      </div>

      <div>
        <label className="info-label">선호 장르</label>
        {renderToggleGroup(preferred_genres, codeOptions.PREFERRED_GENRE, true)}
      </div>

      <div>
        <label className="info-label">플레이 스타일</label>
        {renderToggleGroup(play_style, codeOptions.PLAY_STYLE)}
      </div>

      <div>
        <label className="info-label">게임 실력</label>
        {renderToggleGroup(game_skill_level, codeOptions.GAME_SKILL_LEVEL)}
      </div>

      <div>
        <label className="info-label">마이크 사용 가능 여부</label>
        <div className="flex gap-2 mb-2">
          <ToggleButton isActive={is_voice === true} onClick={undefined}>
            가능
          </ToggleButton>
          <ToggleButton isActive={is_voice === false} onClick={undefined}>
            불가능
          </ToggleButton>
        </div>
      </div>

      <div>
        <label className="info-label">미성년자 매칭 허용 여부</label>
        <div className="flex gap-2 mb-2">
          <ToggleButton isActive={is_adult_match_allowed === true} onClick={undefined}>
            가능
          </ToggleButton>
          <ToggleButton isActive={is_adult_match_allowed === false} onClick={undefined}>
            불가능
          </ToggleButton>
        </div>
      </div>
    </div>
  );
}
