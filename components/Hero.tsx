import React from "react";
import {
    Box,
    Button,
    Stack,
    Text,
    Icon,
    Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Hero() {

    const router = useRouter();
    return (
        <Box h={"calc(100vh - 72px)"} backgroundImage={'hero.svg'} backgroundRepeat='no-repeat' backgroundAttachment={'fixed'} backgroundSize='cover'>
            <Flex px={8} py={24} mx="auto" alignItems={'center'} >
                <Box
                    w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
                    mx="auto"
                    textAlign={{ base: "left", md: "center" }}
                >
                    <Text
                        mb={6}
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight="bold"
                        lineHeight={1.2}
                        letterSpacing={{ base: "normal", md: "tight" }}
                        color={'white'}
                    >
                        All your{" "}
                        <Text
                            as={'span'}
                            display={{ base: "block", lg: "inline" }}
                            pos={'relative'}
                            w="full"
                            bgClip="text"
                            bgGradient="linear(to-r, green.400,purple.500)"
                            fontWeight="extrabold"
                        >
                            Development Stuff
                        </Text>{" "}
                        at one single place.
                    </Text>
                    <Text
                        px={{ base: 0, lg: 24 }}
                        mb={6}
                        fontSize={{ base: "lg", md: "xl" }}
                        color={'white'}
                    >
                        DevStuff is a webapp where you can find illustrations, icons and vectors which are provided by various sites.
                    </Text>
                    <Stack
                        direction={{ base: "column", sm: "row" }}
                        mb={{ base: 4, md: 8 }}
                        spacing={2}
                        justifyContent={{ sm: "left", md: "center" }}
                    >
                        <Button
                            as="a"
                            variant="solid"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            w={{ base: "full", sm: "auto" }}
                            mb={{ base: 2, sm: 0 }}
                            size="lg"
                            cursor="pointer"
                            onClick={() => {
                                router.push("/explore");
                            }}
                        >
                            Explore
                            <Icon boxSize={4} viewBox="0 0 20 20" fill="white" ml={2}>
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </Icon>
                        </Button>
                    </Stack>
                </Box>
            </Flex>
        </Box>
    )
}
