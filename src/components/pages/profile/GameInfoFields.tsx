"use client";

import ToggleButton from "@/components/common/button/ToggleButton";
import { GameInfoFormProps } from "@/types/profile";
import { atLeastOneSelected, booleanRequired } from "@/utils/validations";
import { Controller, useFormContext } from "react-hook-form";

export default function GameInfoFields({ codeOptions, readOnly = false }: GameInfoFormProps) {
  const { control } = useFormContext();

  if (!codeOptions) return <div>Loading...</div>;

  const game_platforms = Object.entries(codeOptions.GAME_PLATFORM);
  const preferred_genres = Object.entries(codeOptions.PREFERRED_GENRE);
  const play_style = Object.entries(codeOptions.PLAY_STYLE);
  const game_skill_level = Object.entries(codeOptions.GAME_SKILL_LEVEL);

  return (
    <>
      <label className="info-label">플랫폼</label>
      <Controller
        name="game_platforms"
        control={control}
        rules={atLeastOneSelected("플랫폼")}
        render={({ field, fieldState }) => (
          <>
            <div className="flex gap-2 mb-1 flex-wrap">
              {game_platforms.map(([key, label]) => {
                const isActive = field.value?.includes(key);
                return (
                  <ToggleButton
                    key={key}
                    isActive={isActive}
                    onClick={
                      readOnly
                        ? undefined
                        : () =>
                            field.onChange(
                              isActive
                                ? field.value.filter((v: string) => v !== key)
                                : [...(field.value || []), key],
                            )
                    }
                  >
                    {label}
                  </ToggleButton>
                );
              })}
            </div>
            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
          </>
        )}
      />

      <label className="info-label">선호 장르</label>
      <Controller
        name="preferred_genres"
        control={control}
        rules={atLeastOneSelected("장르")}
        render={({ field, fieldState }) => (
          <>
            <div className="flex gap-2 mb-1 flex-wrap">
              {preferred_genres.map(([key, label]) => {
                const isActive = field.value?.includes(key);
                return (
                  <ToggleButton
                    key={key}
                    isActive={isActive}
                    onClick={
                      readOnly
                        ? undefined
                        : () =>
                            field.onChange(
                              isActive
                                ? field.value.filter((v: string) => v !== key)
                                : [...(field.value || []), key],
                            )
                    }
                  >
                    {label}
                  </ToggleButton>
                );
              })}
            </div>
            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
          </>
        )}
      />

      <label className="info-label">플레이 스타일</label>
      <Controller
        name="play_style"
        control={control}
        rules={atLeastOneSelected("플레이 스타일")}
        render={({ field, fieldState }) => (
          <>
            <div className="flex gap-2 mb-1">
              {play_style.map(([key, label]) => (
                <ToggleButton
                  key={key}
                  isActive={field.value === key}
                  onClick={readOnly ? undefined : () => field.onChange(key)}
                >
                  {label}
                </ToggleButton>
              ))}
            </div>
            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
          </>
        )}
      />

      <label className="info-label">게임 실력</label>
      <Controller
        name="game_skill_level"
        control={control}
        rules={atLeastOneSelected("게임 실력")}
        render={({ field, fieldState }) => (
          <>
            <div className="flex gap-2 mb-1 flex-wrap">
              {game_skill_level.map(([key, label]) => (
                <ToggleButton
                  key={key}
                  isActive={field.value === key}
                  onClick={readOnly ? undefined : () => field.onChange(key)}
                >
                  {label}
                </ToggleButton>
              ))}
            </div>
            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
          </>
        )}
      />

      <label className="info-label">마이크 사용 가능 여부</label>
      <Controller
        name="is_voice"
        control={control}
        rules={booleanRequired("마이크 사용 가능 여부를 선택해 주세요.")}
        render={({ field, fieldState }) => (
          <>
            <div className="flex gap-2 mb-1">
              <ToggleButton
                isActive={field.value === true}
                onClick={readOnly ? undefined : () => field.onChange(true)}
              >
                가능
              </ToggleButton>
              <ToggleButton
                isActive={field.value === false}
                onClick={readOnly ? undefined : () => field.onChange(false)}
              >
                불가능
              </ToggleButton>
            </div>
            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
          </>
        )}
      />

      <label className="info-label">매칭 상대 미성년 여부</label>
      <Controller
        name="is_adult_match_allowed"
        control={control}
        rules={booleanRequired("매칭 상대 미성년 여부를 선택해 주세요.")}
        render={({ field, fieldState }) => (
          <>
            <div className="flex gap-2 mb-1">
              <ToggleButton
                isActive={field.value === true}
                onClick={readOnly ? undefined : () => field.onChange(true)}
              >
                가능
              </ToggleButton>
              <ToggleButton
                isActive={field.value === false}
                onClick={readOnly ? undefined : () => field.onChange(false)}
              >
                불가능
              </ToggleButton>
            </div>
            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
          </>
        )}
      />
    </>
  );
}
