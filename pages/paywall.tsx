import React from "react";

export default function paywall() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* Show iframe and load url into it */}
      <iframe
        src="unlock_url"
        width="100vw"
        height="100vh"
      />
    </div>
  );
}
