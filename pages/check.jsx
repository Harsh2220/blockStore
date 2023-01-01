import React from "react";
import UnlockPaywall from "../components/LockedContent";
import { useStore } from "../components/lockedStore";
import { useAccount } from "wagmi";

export default function check() {
  const { publicLock, unlock } = useStore();
  const { address: creator } = useAccount();
  return (
    <UnlockPaywall
      publicLock={publicLock}
      unlock={unlock}
      price={0.01}
      address={creator}
      targetNetwork={5}
    />
  );
}
