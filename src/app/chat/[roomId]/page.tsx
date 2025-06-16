"use client";

import dynamic from "next/dynamic";

const ChatRoom = dynamic(() => import("@/components/pages/chat/chatRoom"), { ssr: false });

export default function Chat({ params }: { params: { roomId: string } }) {
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
