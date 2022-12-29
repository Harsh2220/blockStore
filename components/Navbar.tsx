import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

export default function Navbar() {
    return (
        <Box bg='black'>
            <Container maxW={'container.lg'}>
                <Flex justifyContent={'space-between'} alignItems='center' py={4}>
                    <Heading fontSize={'lg'}>Logo</Heading>
                    <Button variant={'outline'}>
                        Connect
                    </Button>
                </Flex>
            </Container>
        </Box>
    )
}
