"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { use } from "react";

const ChatRoom = dynamic(() => import("@/components/pages/chat/chatRoom"), { ssr: false });

export default function Chat(props: { params: Promise<{ roomId: string }> }) {
  const params = use(props.params);
  const searchParams = useSearchParams();
  const matchRoomId = Number(params.roomId);
  const matchParticipantId = Number(searchParams.get("participantId"));
  const nickname = searchParams.get("nickname") || "익명";
  const userProfileId = Number(searchParams.get("userProfileId"));

  return (
    <main className="flex flex-col items-center p-10 gap-8">
      <div className="flex gap-20 w-full justify-center">
        <div>
          <ChatRoom
            matchRoomId={matchRoomId}
            matchParticipantId={matchParticipantId}
            nickname={nickname}
            userProfileId={userProfileId}
          />
        </div>
      </div>
    </main>
  );
}
