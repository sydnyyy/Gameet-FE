import { create } from "zustand";

interface ChatStore {
  unreadCount: number;
  myMatchParticipantId: number | null;
  resetUnread: () => void;
  setUnreadCount: (count: number) => void;
  setMyMatchParticipantId: (id: number) => void;
  reset: () => void;
}

export const useChatStore = create<ChatStore>(set => ({
  unreadCount: 0,
  myMatchParticipantId: null,
  resetUnread: () => set({ unreadCount: 0 }),
  setUnreadCount: count => set({ unreadCount: count }),
  setMyMatchParticipantId: id => set({ myMatchParticipantId: id }),
  reset: () => set({ unreadCount: 0, myMatchParticipantId: null }),
}));
