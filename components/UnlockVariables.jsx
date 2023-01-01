import { Button, Card, Stack, Input, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useStore } from "./lockedStore";

/*
  ~ What it does? ~
  Displays an UI to save the deployed unlock protoStack contract address 
    and the specific lock address to connect with to localstorage
  ~ How can I use? ~
  <UnlockVariables
    targetNetwork={targetNetwork}
  />
  ~ Features ~
  - Receives deployed unlock address of a specific network
  - Receives publicLock address a specific lock
  - Save them to local storage
*/

const UnlockVariables = ({ targetNetwork }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deployedUnlockAddress, setDeployedUnlockAddress] = useState(); // unlock rinkeby address is set as the default
  const [publicLockAddress, setPublicLockAddress] = useState(); //DreadGang presale whitelist lock on rinkeby is set as default publicLock address
  const { unlock, publicLock, setUnlock, setpublicUnlock } = useStore((state) => state);

  const saveToLocalStorage = () => {
    const unlockData = {
      unlockAddress: deployedUnlockAddress,
      network: targetNetwork.name,
    };
    const publicLockData = {
      publicLockAddress: publicLockAddress,
    };
    const currentUnlockData = JSON.parse(
      unlock 
    );
    const currentPublicLockData = JSON.parse(
      publicLock
    );

    !currentUnlockData ||
    (currentUnlockData.unlockAddress && unlockData.unlockAddress) ||
    (!currentUnlockData.unlockAddress && unlockData.unlockAddress)
     ? setUnlock(unlockData)
    : setUnlock(currentUnlockData)

    !currentPublicLockData ||
    (currentPublicLockData.publicLockAddress &&
      publicLockData.publicLockAddress) ||
    (!currentPublicLockData.publicLockAddress &&
      publicLockData.publicLockAddress)
      ? setpublicUnlock(publicLockData): setpublicUnlock(currentPublicLockData);
  };

  const unlockVariables = (
    <>
      <div style={{ padding: 8, marginTop: 32, maxWidth: 592, margin: "auto" }}>
        <Card title="Set Unlock Variables">
          <div style={{ padding: 8 }}>
            <Input
              style={{ textAlign: "left", marginBottom: 15 }}
              value={deployedUnlockAddress}
              placeholder="Enter deployed unlock address"
              onChange={(e) => {
                setDeployedUnlockAddress(e.target.value);
              }}
            />
            <Input
              style={{ textAlign: "left", marginBottom: 15 }}
              value={publicLockAddress}
              placeholder="Enter lock address"
              onChange={(e) => {
                setPublicLockAddress(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 8, marginTop: 15 }}>
            <Button
              type={"danger"}
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                saveToLocalStorage();
                setTimeout(function () {
                  setIsLoading(false);
                }, 2000);
              }}
            >
              Save
            </Button>
          </div>
        </Card>
      </div>
    </>
  );

  return (
    <>
      <HStack>
        <Stack gap={24}> {unlockVariables} </Stack>
      </HStack>
    </>
  );
};

export default UnlockVariables;
