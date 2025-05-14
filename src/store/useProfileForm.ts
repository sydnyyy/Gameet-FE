import { create } from "zustand";

interface ProfileFormState {
  email: string;
  nickname: string;
  age: string;
  isAgePublic: boolean;
  gender: "남성" | "여성" | "비공개" | "";
  platforms: string[];
  genres: string[];
  style: string;
  mic: "가능" | "불가능" | "";
  allowMinor: "가능" | "불가능" | "";
  setField: <K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) => void;
}

export const useProfileForm = create<ProfileFormState>((set) => ({
  email: "",
  nickname: "",
  age: "",
  isAgePublic: true,
  gender: "",
  platforms: [],
  genres: [],
  style: "",
  mic: "",
  allowMinor: "",
  setField: (key, value) => set({ [key]: value }),
}));
