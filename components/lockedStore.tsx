import create from "zustand";
import { persist } from "zustand/middleware";

interface lockDetails {
  unlock: any;
  publicLock: any;
  setunlock: (unlock: any) => void;
  setPublicLock: (postId: any) => void;
}

export const useStore = create<lockDetails>(
  persist((set) => ({
    unlock: null,
    publicLock: null,
    setunlock: (unlock) => set({ unlock }),
    setPublicLock: (publicLock) => set({ publicLock }),
  })),
  {
    name: "lockDetails",
  }
);
