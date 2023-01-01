import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  Textarea,
  Center,
  useToast,
  Switch,
  FormControl,
  FormLabel,
  Progress,
  HStack,
} from "@chakra-ui/react";
import { useCreateAsset } from "@livepeer/react";
import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { UnlockV11, PublicLockV11 } from "@unlock-protocol/contracts";
import Navbar from "../components/Navbar";
import orbis from "./orbis";
import abis from "@unlock-protocol/contracts";
import create from "zustand";
import { useStore } from "../components/lockedStore";

import {
  erc20ABI,
  useAccount,
  useSendTransaction,
  useWaitForTransaction,
  useContractRead,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";

export default function UploadVideo() {
  const lockInterface = new ethers.utils.Interface(PublicLockV11.abi);

  const { address: creator } = useAccount();
  const [calldata, setCalldata] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(99999);
  const [supply, setSupply] = useState(99999);
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("");
  const [enableDuration, setEnableDuration] = useState(false);
  const [enableSupply, setEnableSupply] = useState(false);
  const [video, setVideo] = useState<File | undefined>(undefined);
  const [deployedUnlockAddress, setDeployedUnlockAddress] = useState();
  const [publicLockAddress, setPublicLockAddress] = useState();
  // const [publicLock, setPublicLock] = useState<any>();
  // const [unlock, setUnlock] = useState<any>();
  const userSigner = useSigner();
  const { unlock, publicLock, setunlock, setPublicLock } = useStore();
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    // we use a `const` assertion here to provide better Typescript types
    // for the returned data
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null
  );

  const { data: decimals } = useContractRead({
    address: "0x0",
    abi: erc20ABI,
    functionName: "decimals",
    enabled: currency !== ethers.constants.AddressZero,
  });

  const toast = useToast();

  const createService = async () => {
    createAsset?.();
  };

  const { config } = usePrepareContractWrite({
    address: "0x627118a4fB747016911e5cDA82e2E77C531e8206",
    abi: UnlockV11.abi,
    functionName: "createUpgradeableLockAtVersion",
    args: [calldata, 11], // We currently deploy version 11
  });

  const { data: transaction, sendTransaction } = useSendTransaction(config);
  const [user, setUser] = useState();
  const {
    isLoading,
    isSuccess,
    data: receipt,
    isError,
  } = useWaitForTransaction({
    hash: transaction?.hash,
  });

  async function connect() {
    let res = await orbis.connect();

    /** Check if connection is successful or not */
    if (res.status == 200) {
      setUser(res.did);
    } else {
      console.log("Error connecting to Ceramic: ", res);
      alert("Error connecting to Ceramic.");
    }
  }

  const prepareCalldata = async () => {
    setCalldata(
      lockInterface.encodeFunctionData(
        "initialize(address,uint256,address,uint256,uint256,string)",
        [
          creator,
          duration * 60 * 60 * 24, // duration is in days!
          ethers.constants.AddressZero,
          ethers.utils.parseUnits(price.toString(), decimals || 18),
          supply,
          name,
        ]
      )
    );
  };

  async function getPost() {
    // console.log(res.doc);
    let { data, error } = await orbis.getPosts({ tag: "Test Tag" });
    console.log(data);
  }
  async function createPost(
    name: string,
    playbackId: string | undefined,
    description: string
  ) {
    await prepareCalldata();
    sendTransaction?.();
    await connect();
    let res = await orbis.createPost({
      body: description,
      title: name,
      data: {
        // unlockAddress:"0xc37ffe60f6c3830ed0e92939d41ad1ecf8fd46d9",
        // creatorName:"Rahul"
        playbackID: playbackId,
      },

      tags: [{ slug: "Test Tag", title: "Courses" }],
    });
    console.log("Created post:", res.doc);
    await getPost();
  }

  console.log("Assets is", assets);
  useEffect(() => {
    if (status === "success" && assets) {
      createPost(name, assets[0].playbackId!, description);
      toast({
        title:
          "Successfully created your service, please sign message to create post",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    prepareCalldata();
  }, [status, name, description, price, supply, duration]);

  const unlockData = unlock;
  const publicLockData = publicLock;
  useEffect(() => {
    if (unlockData && publicLockData) {
      const unlockAddress = unlockData.unlockAddress;
      const publicLockAddress = publicLockData.publicLockAddress;
      setDeployedUnlockAddress(unlockAddress);
      setPublicLockAddress(publicLockAddress);
    }
  }, []);

  useEffect(() => {
    const readyUnlock = () => {
      let unlockContract;
      let publicLockContract;
      try {
        if (deployedUnlockAddress) {
          unlockContract = new ethers.Contract(
            deployedUnlockAddress,
            abis.UnlockV11.abi,
            userSigner
          );
        }
        if (publicLockAddress) {
          publicLockContract = new ethers.Contract(
            publicLockAddress,
            abis.PublicLockV10.abi,
            userSigner
          );
        }
      } catch (e) {
        console.log(e);
      }
      // setUnlock(unlockContract);
      // setPublicLock(publicLockContract);
    };
    readyUnlock();
  }, [creator]);

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === "failed" ? (
        "Failed to process video."
      ) : progress?.[0].phase === "waiting" ? (
        "Waiting"
      ) : progress?.[0].phase === "uploading" ? (
        <>
          <Text color="black" fontSize={"md"} textAlign="center">
            Uploading
          </Text>
          <Progress value={Math.round(progress?.[0]?.progress * 100)} />
        </>
      ) : progress?.[0].phase === "processing" ? (
        <>
          <Text color="black" fontSize={"md"} textAlign="center">
            Processing
          </Text>
          <Progress value={Math.round(progress?.[0]?.progress * 100)} />
        </>
      ) : null,
    [progress]
  );

  return (
    <Box position={"relative"}>
      <Navbar />
      <Center>
        <Container maxW={"lg"} py={[4, 8]}>
          <Stack
            bg={"gray.200"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Upload a video
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                We’re looking for amazing engineers just like you! Become a part
                of our rockstar engineering team and skyrocket your career!
              </Text>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  placeholder="Name"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Textarea
                  placeholder="Discription"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Input
                  placeholder="Price"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  type="number"
                  onChange={(e) => {
                    setPrice(parseInt(e.target.value));
                  }}
                />
                <Box bg="gray.800" p={4} rounded="lg">
                  <FormControl display="flex" alignItems="center" gap={8}>
                    <HStack alignItems={"center"}>
                      <FormLabel mb={0}>Enable duration?</FormLabel>
                      <Switch
                        size={"md"}
                        colorScheme="red"
                        onChange={() => setEnableDuration(!enableDuration)}
                      />
                    </HStack>
                    <HStack alignItems={"center"}>
                      <FormLabel mb={0}>Enable supply?</FormLabel>
                      <Switch
                        size={"md"}
                        colorScheme="red"
                        onChange={() => setEnableSupply(!enableSupply)}
                      />
                    </HStack>
                  </FormControl>
                  <Flex gap={8} mt={4}>
                    {enableDuration ? (
                      <Input
                        placeholder="duration"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                        type="number"
                        onChange={(e) => {
                          setDuration(parseInt(e.target.value));
                        }}
                      />
                    ) : null}
                    {enableSupply ? (
                      <Input
                        placeholder="supply"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                        type="number"
                        onChange={(e) => {
                          setSupply(parseInt(e.target.value));
                        }}
                      />
                    ) : null}
                  </Flex>
                </Box>
                <Center w="full">
                  <label
                    htmlFor="video"
                    style={{
                      backgroundColor: "black",
                      textAlign: "center",
                      padding: "10px",
                      fontWeight: "500",
                      borderRadius: "4px",
                      color: "white",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Select a video
                  </label>
                  <input
                    type="file"
                    id="video"
                    onChange={(e) => {
                      if (e.target.files) {
                        setVideo(e.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                </Center>
              </Stack>
              {progressFormatted && <Text my={2}>{progressFormatted}</Text>}
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                onClick={() => {
                  createAsset?.();
                }}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
                disabled={isLoading}
              >
                Submit
              </Button>
            </Box>
            form
          </Stack>
        </Container>
      </Center>
    </Box>
  );
}
