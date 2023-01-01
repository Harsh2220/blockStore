import { Box, Button, Container, Flex, Heading, Img } from "@chakra-ui/react";
import { InjectedConnector } from "wagmi/connectors/injected";
import React from "react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { ConnectKitButton } from "connectkit";

export default function Navbar() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { address, isConnected } = useAccount();
  return (
    <Box bg="black">
      <Container maxW={"container.lg"}>
        <Flex justifyContent={"space-between"} alignItems="center" py={4}>
          <Img src='block.png' alt='logo' boxSize={10} />
          <ConnectKitButton />
        </Flex>
      </Container>
    </Box>
  );
}
