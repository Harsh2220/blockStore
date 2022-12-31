import create from "zustand";

interface lockDetails {
  unlocked: boolean;
  postId: string;
  setUnLocked: (unlocked: boolean) => void;
  setPostId: (postId: string) => void;
}

export const useStore = create<lockDetails>((set) => ({
  unlocked: false,
  postId: "",
  setUnLocked: (unlocked) => set({ unlocked }),
  setPostId: (postId) => set({ postId }),
}));
