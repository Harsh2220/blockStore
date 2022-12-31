import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import orbis from "./orbis";
import { useState } from "react";
import VideoCard from "../components/VideoCard";

export default function GridBlurredBackdrop() {
  const [response, setResponse] = useState<any[]>();
  async function connect() {
    let res = await orbis.connect();

    if (res.status == 200) {
      // setUser(res.did);
    } else {
      console.log("Error connecting to Ceramic: ", res);
      alert("Error connecting to Ceramic.");
    }
  }

  async function getPost() {
    // console.log(res.doc);
    await connect();
    let { data, error } = await orbis.getPosts({ tag: "Test Tag" });
    console.log(data);
    setResponse(data);
    console.log(response);
  }

  return (
    <Flex
      textAlign={"center"}
      p={[2, 10]}
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
    >
      <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
        <Heading
          py={5}
          fontSize={48}
          fontWeight={"bold"}
          color={useColorModeValue("gray.700", "gray.50")}
        >
          Videos
        </Heading>
      </Box>

      {response ? (
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          spacing={"20"}
          maxW={"container.xl"}
          my={16}
          mx={"auto"}
        >
          {response &&
            response.map((cardInfo: any, index: number) => (
              <VideoCard {...cardInfo} index={index} key={index} />
            ))}
        </SimpleGrid>
      ) : (
        <Center h='50vh'>
          <Button onClick={getPost}>Show Videos</Button>
        </Center>
      )}
    </Flex>
  );
}
