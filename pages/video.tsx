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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function UploadVideo() {
    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }} zIndex={2}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        Senior web designers{' '}
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            &
                        </Text>{' '}
                        Full-Stack Developers
                    </Heading>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}
                    zIndex={2}
                >
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Upload a video
                            <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text">
                                !
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            We’re looking for amazing engineers just like you! Become a part
                            of our rockstar engineering team and skyrocket your career!
                        </Text>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="Name"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Textarea
                                placeholder="Description"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
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
                                    style={{ display: "none" }}
                                />
                            </Center>
                        </Stack>
                        <Button
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                boxShadow: 'xl',
                            }}>
                            Submit
                        </Button>
                    </Box>
                    form
                </Stack>
            </Container>
            <MotionBox
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10 }} maxW={['300px', 'xs']}
                position={'absolute'}
                top={-20}
                left={-20}
                style={{ filter: 'blur(70px)' }}
            >
                <Blur />
            </MotionBox>
        </Box>
    );
}

export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
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