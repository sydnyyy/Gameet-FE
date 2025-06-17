import { apiRequest } from "@/app/api/apiRequest";
import { connectSocket, getStompClient } from "@/app/api/socket";
import { CommonCodeGroup } from "@/constants/code/CommonCodeGroup";
import { useCommonCodeOptions } from "@/hooks/code/useCommonCodeOptions";
import { useAuthStore } from "@/store/useAuthStore";
import { ChatMessage, ChatPayload, OpponentProfile, ParticipantInfo } from "@/types/chat";
import { ProfileFormType } from "@/types/profile";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function useChatRoom(matchRoomId: number | null) {
  const { token } = useAuthStore();
  const router = useRouter();

  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo | null>(null);
  const [opponentProfile, setOpponentProfile] = useState<OpponentProfile | null>(null);
  const [messages, setMessages] = useState<ChatPayload[]>([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const subscriptionRef = useRef<ReturnType<any> | null>(null);
  const hasSentEnterMessageRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // RHF setup for readOnly GameInfoFields
  const methods = useForm<ProfileFormType>({
    defaultValues: {
      nickname: "",
      age: undefined,
      show_age: true,
      gender: "N",
      game_platforms: [],
      preferred_genres: [],
      play_style: "",
      game_skill_level: "",
      is_voice: true,
      is_adult_match_allowed: true,
      min_manner_score: 50,
    },
  });

  const codeOptions = useCommonCodeOptions(CommonCodeGroup.MATCH_CONDITION);

  // 메시지 목록 불러오기
  useEffect(() => {
    if (!matchRoomId) return;

    const fetchMessages = async () => {
      try {
        const res = await apiRequest<ChatPayload[]>(`/chat/${matchRoomId}/messages`, "GET");
        setMessages(res.data);
      } catch (err) {
        console.error("이전 채팅 불러오기 실패:", err);
      }
    };

    fetchMessages();
  }, [matchRoomId]);

  // 참가자 정보 및 상대 프로필 + 입장 메시지
  useEffect(() => {
    if (!matchRoomId || hasSentEnterMessageRef.current) return;

    const fetchParticipantInfo = async () => {
      try {
        const { data: participant } = await apiRequest<ParticipantInfo>(
          `/chat/${matchRoomId}/participantsInfo`,
          "GET",
        );
        setParticipantInfo(participant);

        const client = getStompClient() ?? (await connectSocket());

        // 입장 메시지 전송
        if (!hasSentEnterMessageRef.current && participantInfo) {
          const entryMessage: ChatMessage = {
            matchParticipantId: participantInfo.other_match_participant_info.match_participant_id,
            messageType: "ENTER",
            content: `${participantInfo?.other_match_participant_info.user_profile.nickname ?? "상대방"}님이 입장하셨습니다.`,
          };

          client.send("/app/chat.send", { Authorization: token! }, JSON.stringify(entryMessage));
          hasSentEnterMessageRef.current = true;
        }
      } catch (error) {
        console.error("참가자 정보 또는 상대 정보 불러오기 실패:", error);
      }
    };

    fetchParticipantInfo();
  }, [matchRoomId]);

  // 메시지 구독
  useEffect(() => {
    if (!matchRoomId) return;

    const subscribeToMessages = async () => {
      const client = getStompClient() ?? (await connectSocket());

      // 기존 구독 해제
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      // 새 구독
      subscriptionRef.current = client.subscribe(
        `/topic/chat.room.${matchRoomId}`,
        message => {
          const payload: ChatPayload = JSON.parse(message.body);
          setMessages(prev => [...prev, payload]);
        },
        { Authorization: token! },
      );
    };

    subscribeToMessages();

    return () => {
      // cleanup
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [matchRoomId, token]);

  // 메시지 도착 시 스크롤 아래로
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 메시지 전송
  const handleSend = () => {
    const client = getStompClient();
    if (!client || !input.trim() || !participantInfo) return;

    const chatMessage: ChatMessage = {
      matchParticipantId: participantInfo.other_match_participant_info.match_participant_id,
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
      router.push("/");
    } catch (error) {
      console.error("매칭 종료 실패:", error);
      alert("매칭 종료 중 오류가 발생했습니다.");
    }
  };

  return {
    messages,
    input,
    setInput,
    bottomRef,
    showOptions,
    setShowOptions,
    participantInfo,
    opponentProfile,
    handleSend,
    handleMatchEnd,
    participantId: participantInfo?.other_match_participant_info.match_participant_id ?? null,
    token,
    methods,
    codeOptions,
  };
}
