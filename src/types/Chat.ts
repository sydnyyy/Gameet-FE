type ChatMessage = {
  matchParticipantId: number;
  messageType: "TALK" | "ENTER" | "QUIT" | "APPOINTMENT";
  content: string;
};

interface ChatPayload {
  nickname: string;
  matchParticipantId: number;
  content: string;
  messageType: string;
  sendAt: string;
}

interface ParticipantInfo {
  match_participant_id: number;
  user_profile_id: number;
}

interface OpponentProfile {
  nickname: string;
  game_skill_level: string;
  play_style: string;
  is_voice: boolean;
  is_adult_match_allowed: boolean;
  game_platforms: string[];
  preferred_genres: string[];
}

interface ChatRoomProps {
  matchRoomId: number | null;
}
