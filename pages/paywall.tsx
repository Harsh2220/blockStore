import { Box } from "@chakra-ui/react";
import React from "react";

export default function paywall() {
  return (
    <Box h='100vh' w='100vw'>
      {/* Show iframe and load url into it */}
      <iframe
        src="https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220xc500ac104e44f443616726f91ae4a8855da3d3a8%22%3A%7B%22network%22%3A5%2C%22skipRecipient%22%3Atrue%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%7D"
        width="100%"
        height="100%"
      />
    </Box>
  );
}
