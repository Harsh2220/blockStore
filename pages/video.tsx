import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Textarea,
  Center,
  Switch,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useCreateAsset } from "@livepeer/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { UnlockV11, PublicLockV11 } from "@unlock-protocol/contracts";
import Navbar from "../components/Navbar";

import {
  erc20ABI,
  useAccount,
  useSendTransaction,
  useWaitForTransaction,
  useContractRead,
  usePrepareContractWrite,
} from "wagmi";

const MotionBox = motion(Box);
const lockInterface = new ethers.utils.Interface(PublicLockV11.abi);

export default function UploadVideo() {
  const { address: creator } = useAccount();
  const [calldata, setCalldata] = useState("");
  const [playbackID, setplaybackID] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(99999);
  const [supply, setSupply] = useState(99999);
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("");
  const [enableDuration, setEnableDuration] = useState(true);
  const [enableSupply, setEnableSupply] = useState(true);
  const [video, setVideo] = useState<File | undefined>(undefined);
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

  const {
    isLoading,
    isSuccess,
    data: receipt,
    isError,
  } = useWaitForTransaction({
    hash: transaction?.hash,
  });

  const prepareCalldata = async () => {
    setCalldata(
      lockInterface.encodeFunctionData(
        "initialize(address,uint256,address,uint256,uint256,string)",
        [
          name,
          duration * 60 * 60 * 24, // duration is in days!
          ethers.constants.AddressZero,
          ethers.utils.parseUnits(price.toString(), decimals || 18),
          supply,
          name,
        ]
      )
    );
  };

  useEffect(() => {
    if (assets && assets.length > 0) {
      setplaybackID(assets[0].playbackId ?? "");
    }
    if (status == "success") {
      alert("Successfully created your service");
      // prepareCalldata();
      // sendTransaction?.();
    }
    console.log(progress);
  }, [assets, status, progress, name, duration, supply, price, decimals]);

  return (
    <Box position={"relative"}>
      <Navbar />
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }} zIndex={2}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Senior web designers{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Full-Stack Developers
          </Heading>
        </Stack>
        <Stack
          bg={"gray.200"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
          zIndex={2}
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
              {/* <FormControl display="flex" alignItems="center" gap={8}>
                <HStack>
                  <FormLabel mb="0" color={"black"}>
                    Enable duration?
                  </FormLabel>
                  <Switch size={"md"} />
                </HStack>
                <HStack>
                  <FormLabel mb="0" color={"black"}>
                    Enable supply?
                  </FormLabel>
                  <Switch size={"md"} />
                </HStack>
              </FormControl> */}
              <Flex gap={8}>
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
              </Flex>
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
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              onClick={() => {
                createService();
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
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10 }}
        maxW={["300px", "xs"]}
        position={"absolute"}
        top={-20}
        left={-20}
        style={{ filter: "blur(70px)" }}
      >
        <Blur />
      </MotionBox>
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
