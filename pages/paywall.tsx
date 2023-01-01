import React from "react";

export default function paywall() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* Show iframe and load url into it */}
      <iframe
        src="https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220xc37ffe60f6c3830ed0e92939d41100ad1ecf8fd46d9%22%3A%7B%22network%22%3A5%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%2C%22persistentCheckout%22%3Atrue%2C%22referrer%22%3A%22%22%2C%22messageToSign%22%3A%22%22%2C%22hideSoldOut%22%3Afalse%2C%22redirectUri%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fexplore%22%7D"
        width="100vw"
        height="100vh"
      />
    </div>
  );
}
