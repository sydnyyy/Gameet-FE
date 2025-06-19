import { apiRequest } from "@/app/api/apiRequest";
import { connectSocket } from "@/app/api/socket";
import { CommonCodeGroup } from "@/constants/code/CommonCodeGroup";
import { useCommonCodeOptions } from "@/hooks/code/useCommonCodeOptions";
import { useChatReadUpdater } from "@/hooks/pages/chat/useChatReadUpdater";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { ChatMessage, ChatPayload, ParticipantInfo } from "@/types/chat";
import { ProfileFormType } from "@/types/profile";
import { StompSubscription } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function useChatRoom(matchRoomId: number | null) {
  const { token } = useAuthStore();
  const { setMyMatchParticipantId } = useChatStore();

  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo | null>(null);
  const [messages, setMessages] = useState<ChatPayload[]>([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const subscriptionRef = useRef<StompSubscription | null>(null);
  const hasSentEnterMessageRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const methods = useForm<ProfileFormType>({
    defaultValues: {
      game_platforms: [],
      preferred_genres: [],
      play_style: "",
      game_skill_level: "",
      is_voice: true,
      is_adult_match_allowed: true,
    },
  });

  const codeOptions = useCommonCodeOptions(CommonCodeGroup.MATCH_CONDITION);

  // 마지막으로 읽은 시간 업데이트
  useChatReadUpdater();

  // 메시지 목록 불러오기
  useEffect(() => {
    if (!matchRoomId) return;
    (async () => {
      try {
        const res = await apiRequest<ChatPayload[]>(`/chat/${matchRoomId}/messages`, "GET");
        const talkMessages = res.data.filter(msg => msg.messageType !== "ENTER");
        setMessages(talkMessages);
      } catch (err) {
        console.error("이전 채팅 불러오기 실패:", err);
      }
    })();
  }, [matchRoomId]);

  // 참가자 정보 불러오기 및 입장 메시지 전송
  useEffect(() => {
    if (!matchRoomId || hasSentEnterMessageRef.current) return;
    (async () => {
      try {
        const { data: participant } = await apiRequest<ParticipantInfo>(
          `/chat/${matchRoomId}/participantsInfo`,
          "GET",
        );
        setParticipantInfo(participant);
        setMyMatchParticipantId(participant.my_match_participant_info.match_participant_id);

        // 상대방 프로필 정보 반영
        const profile = participant.other_match_participant_info.user_profile;
        const set = methods.setValue;
        set("game_platforms", profile.game_platforms);
        set("preferred_genres", profile.preferred_genres);
        set("play_style", profile.play_style);
        set("game_skill_level", profile.game_skill_level);
        set("is_voice", profile.is_voice);
        set("is_adult_match_allowed", profile.is_adult_match_allowed);

        const client = await connectSocket();

        // 입장 메시지 전송
        const entryMessage: ChatMessage = {
          matchParticipantId: participant.other_match_participant_info.match_participant_id,
          messageType: "ENTER",
          content: `${profile.nickname ?? "상대방"}님이 입장하셨습니다.`,
        };

        client.send("/app/chat.send", { Authorization: token! }, JSON.stringify(entryMessage));
        hasSentEnterMessageRef.current = true;
      } catch (error) {
        console.error("참가자 정보 불러오기 실패:", error);
      }
    })();
  }, [matchRoomId]);

  // WebSocket 구독
  useEffect(() => {
    if (!matchRoomId || !token) return;
    (async () => {
      const client = await connectSocket();

      // 기존 구독 해제
      subscriptionRef.current?.unsubscribe();

      // 새 구독
      subscriptionRef.current = client.subscribe(
        `/topic/chat.room.${matchRoomId}`,
        message => {
          const payload: ChatPayload = JSON.parse(message.body);
          if (payload.messageType !== "ENTER") {
            setMessages(prev => [...prev, payload]);
          }
        },
        { Authorization: token! },
      );
    })();

    return () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
    };
  }, [matchRoomId, token]);

  // 스크롤 하단 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 메시지 전송
  const handleSend = async () => {
    if (!input.trim() || !participantInfo) return;

    const client = await connectSocket();

    const chatMessage: ChatMessage = {
      matchParticipantId: participantInfo.my_match_participant_info.match_participant_id,
      messageType: "TALK",
      content: input.trim(),
    };

    client.send("/app/chat.send", { Authorization: token! }, JSON.stringify(chatMessage));
    setInput("");
  };

  // 매칭 종료
  const handleMatchEnd = async () => {
    try {
      await apiRequest(`/chat/${matchRoomId}/complete`, "PATCH");
    } catch (error) {
      console.error("매칭 종료 실패:", error);
      alert("매칭 종료 중 오류가 발생했습니다.");
    }
  };

  return {
    messages,
    input,
    setInput,
    showOptions,
    setShowOptions,
    participantInfo,
    methods,
    codeOptions,
    bottomRef,
    handleSend,
    handleMatchEnd,
    participantId: participantInfo?.other_match_participant_info.match_participant_id ?? null,
    token,
  };
}
