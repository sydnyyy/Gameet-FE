import { create } from "zustand";

interface ChatStore {
  unreadCount: number;
  myMatchParticipantId: number | null;
  increment: () => void;
  resetUnread: () => void;
  setUnreadCount: (count: number) => void;
  setMyMatchParticipantId: (id: number) => void;
  reset: () => void;
}

export const useChatStore = create<ChatStore>(set => ({
  unreadCount: 0,
  myMatchParticipantId: null,
  increment: () => set(state => ({ unreadCount: state.unreadCount + 1 })),
  resetUnread: () => set({ unreadCount: 0 }),
  setUnreadCount: count => set({ unreadCount: count }),
  setMyMatchParticipantId: id => set({ myMatchParticipantId: id }),
  reset: () => set({ unreadCount: 0, myMatchParticipantId: null }),
}));
