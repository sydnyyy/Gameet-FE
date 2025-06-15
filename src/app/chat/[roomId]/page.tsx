"use client";

import dynamic from "next/dynamic";
import { use } from "react";

const ChatRoom = dynamic(() => import("@/components/pages/chat/chatRoom"), { ssr: false });

export default function Chat(props: { params: Promise<{ roomId: string }> }) {
  const params = use(props.params);
  const matchRoomId = Number(params.roomId);

  return (
    <main className="flex flex-col items-center p-10 gap-8">
      <div className="flex gap-20 w-full justify-center">
        <div>
          <ChatRoom matchRoomId={matchRoomId} />
        </div>
      </div>
    </main>
  );
}
