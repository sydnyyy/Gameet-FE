interface ChatMessage {
  matchParticipantId: number;
  messageType: "TALK" | "ENTER" | "QUIT" | "APPOINTMENT";
  content: string;
}

interface ChatPayload {
  nickname: string;
  matchParticipantId: number;
  content: string;
  messageType: string;
  sendAt: string;
}

interface ChatRoomProps {
  matchRoomId: number;
}
