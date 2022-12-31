import {
  Avatar,
  Box,
  Button,
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
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Brandon P.",
    role: "Chief Marketing Officer",
    content:
      "Thank you for making it painless, pleasant and most of all, hassle free! Im good to go.No matter where you go, EEZY is the coolest, most happening thing around! I love EEZY!",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Krysta B.",
    role: "Entrepreneur",
    content:
      "I didn't even need training. We've used EEZY for the last five years. I have gotten at least 50 times the value from EEZY. I made back the purchase price in just 48 hours!",
    avatar:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Darcy L.",
    role: "Movie star",
    content:
      "Thank you for making it painless, pleasant and most of all, hassle free! I'm good to go. No matter where you go, EEZY is the coolest, most happening thing around! I love EEZY!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
  },
];

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
}


function TestimonialCard(props: TestimonialCardProps) {
  console.log(props);
  const {  content, index } = props;
  
  return (
    <Flex
      boxShadow={"lg"}
      maxW={"640px"}
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      justifyContent={"space-between"}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
      _before={{
        content: '""',
        position: "absolute",
        zIndex: "-1",
        height: "full",
        maxW: "640px",
        width: "full",
        filter: "blur(40px)",
        transform: "scale(0.98)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}
    >
      <Flex
        direction={"column"}
        textAlign={"left"}
        justifyContent={"space-between"}
      >
        <Image
          src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80'}
          alt=""
          h="200px"
          roundedTop={"lg"}
          objectFit="contain"
          bg="white"
        />
        <Box p="5">
          <chakra.p fontWeight={"medium"} fontSize={"15px"} pb={4}>
            {content.title}
          </chakra.p>
          <chakra.p fontWeight={"medium"} fontSize={"15px"} pb={4}>
            {content.body}
          </chakra.p>
          <Button
            w="full"
            onClick={() => {
              var unlockProtocolConfig = {
                locks: {
                  "0xc37ffe60f6c3830ed0e92939d41ad1ecf8fd46d9": {
                    network: 5,
                    skipRecipient: true,
                  },
                },
                pessimistic: true,
                skipRecipient: true,
              };
              //Load above config in a window
              window.location.replace(
                "https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220xc37ffe60f6c3830ed0e92939d41ad1ecf8fd46d9%22%3A%7B%22network%22%3A5%2C%22skipRecipient%22%3Atrue%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%7D"
              );
            }}
          >
            Create
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default function GridBlurredBackdrop() {
  const [response, setResponse] = useState();
  async function connect() {
    let res = await orbis.connect();

    /** Check if connection is successful or not */
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
    let { data, error } = await orbis.getPosts(
      { tag: "Test Tag" }
    );
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
          Upload your assets
        </Heading>
      </Box>




      {response ? (<SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        spacing={"20"}
        maxW={"container.xl"}
        my={16}
        mx={"auto"}
      >
        {response &&  response.map((cardInfo:any, index:number) => (
          <TestimonialCard {...cardInfo} index={index} key={index} />
        ))}
      </SimpleGrid>) : (<Button onClick={getPost}>
        Show Videos

      </Button>)}

    </Flex>
  );
}
