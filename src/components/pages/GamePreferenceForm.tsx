"use client";
import ProfileForm from "@/components/pages/ProfileForm";
import { useState } from "react";

type PlatformType = "PC" | "MOBILE" | "CONSOLE" | "VR"  | "";
type GenreType = "RPG" | "FPS" | "MOBA" | "SPORTS" | "STEAM" | "PUZZLE";
type StyleType = "즐겜" | "빡겜" | "친목" | "";
type TierType = "초보" | "중급" | "상급" | "고수" | "프로" | "";

export default function GamePreferenceForm() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>("");
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("");
  const [selectedTier, setSelectedTier] = useState<TierType>("");
  const [step, setStep] = useState(2);  // 화면 전환을 위한 상태

  if (step === 1) {
    return <ProfileForm />;
  }
  
  const handlePlatformSelect = (platform: PlatformType): void => {
    setSelectedPlatform(platform);
  };
  
  const handleGenreSelect = (genre: GenreType): void => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(item => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  const handleStyleSelect = (style: StyleType): void => {
    setSelectedStyle(style);
  };

  const handleTierSelect = (tier: TierType): void => {
    setSelectedTier(tier);
  };

  return (
    <section className="flex flex-col gap-4 w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">내 게임 정보를 알려주세요</h2>
      
      {/* 플랫폼 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">플랫폼</label>
        <div className="flex gap-2">
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedPlatform === "PC" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handlePlatformSelect("PC")}
          >
            PC
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedPlatform === "MOBILE" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handlePlatformSelect("MOBILE")}
          >
            MOBILE
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedPlatform === "CONSOLE" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handlePlatformSelect("CONSOLE")}
          >
            CONSOLE
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedPlatform === "VR" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handlePlatformSelect("VR")}
          >
            VR
          </button>
        </div>
      </div>
      
      {/* 선호 장르 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">선호 장르</label>
        <div className="flex gap-2 flex-wrap">
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedGenres.includes("RPG") ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleGenreSelect("RPG")}
          >
            RPG
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedGenres.includes("FPS") ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleGenreSelect("FPS")}
          >
            FPS
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedGenres.includes("MOBA") ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleGenreSelect("MOBA")}
          >
            MOBA
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedGenres.includes("SPORTS") ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleGenreSelect("SPORTS")}
          >
            SPORTS
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedGenres.includes("STEAM") ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleGenreSelect("STEAM")}
          >
            STEAM
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedGenres.includes("PUZZLE") ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleGenreSelect("PUZZLE")}
          >
            PUZZLE
          </button>
        </div>
      </div>
      
      {/* 스타일 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">플레이 스타일</label>
        <div className="flex gap-2">
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedStyle === "즐겜" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleStyleSelect("즐겜")}
          >
            즐겜
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedStyle === "빡겜" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleStyleSelect("빡겜")}
          >
            빡겜
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedStyle === "친목" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleStyleSelect("친목")}
          >
            친목
          </button>
        </div>
      </div>

      {/* 본인 게임 실력 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">본인 게임 실력</label>
        <div className="flex gap-2">
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedTier === "초보" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleTierSelect("초보")}
          >
            초보
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedTier === "중급" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleTierSelect("중급")}
          >
            중급
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedTier === "상급" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleTierSelect("상급")}
          >
            상급
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedTier === "고수" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleTierSelect("고수")}
          >
            고수
          </button>
          <button 
            type="button"
            className={`border rounded px-4 py-2 text-sm ${selectedTier === "프로" ? "bg-gray-500" : "bg-gray"}`}
            onClick={() => handleTierSelect("프로")}
          >
            프로
          </button>
        </div>
      </div>
      
      {/* 마이크 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">마이크</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="가능"
            className="border rounded px-4 py-2 flex-1"
            readOnly
          />
          <input
            type="text"
            placeholder="불가능"
            className="border rounded px-4 py-2 flex-1"
            readOnly
          />
        </div>
      </div>
      
      {/* 매칭 상대 미성년 여부 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">매칭 상대 미성년 여부</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="가능"
            className="border rounded px-4 py-2 flex-1"
            readOnly
          />
          <input
            type="text"
            placeholder="불가능"
            className="border rounded px-4 py-2 flex-1"
            readOnly
          />
        </div>
      </div>
      
      {/* 버튼 */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-2 border rounded flex-2"
        >
          이전
        </button>
        <button className="px-6 py-2 bg-black text-white rounded">완료</button>
      </div>
    </section>
  );
}