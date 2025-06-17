// 참가자 정보 타입
export interface ParticipantInfo {
  match_participant_id: number;
  user_profile_id: number;
}

// 채팅 메시지 타입
export interface ChatMessage {
  matchParticipantId: number;
  messageType: "TALK" | "ENTER" | "QUIT" | "APPOINTMENT";
  content: string;
}

// 채팅 메시지 페이로드 타입 (서버로부터 받는 구조)
export interface ChatPayload {
  nickname: string;
  matchParticipantId: number;
  content: string;
  messageType: string;
  sendAt: string;
}

// 상대 프로필 타입
export interface OpponentProfile {
  nickname: string;
  game_skill_level: string;
  play_style: string;
  is_voice: boolean;
  is_adult_match_allowed: boolean;
  game_platforms: string[];
  preferred_genres: string[];
}

// 컴포넌트 Props
export interface ChatRoomProps {
  matchRoomId: number | null;
  matchStatus?: string | null;
}
