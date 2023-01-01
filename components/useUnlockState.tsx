import { useState, useEffect } from "react";
/*
  ~ What it does? ~
  Checks whether an address has valid key to a lock.
  ~ How can I use ? ~
  const myConst = useUnlockState(publicLock, address);

  ~ Features ~
  - checks address for valid key to the lock
  - Returns a boolean: true/false
*/

interface UnlockStateProps {
  publicLock: any;
  address: string;
}

const useUnlockState = ({ publicLock, address }: UnlockStateProps) => {
  const [hasValidKey, sethasValidKey] = useState(false);

  useEffect(() => {
    const loadFunc = async () => {
      try {
        if (publicLock) {
          const result = await publicLock.getHasValidKey(address);
          sethasValidKey(result);
        }
      } catch (e) {
        console.log(e);
      }
    };
    void loadFunc();
  }, [publicLock, address]);
  return hasValidKey;
};
export default useUnlockState;
