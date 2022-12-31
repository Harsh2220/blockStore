import { Player } from "@livepeer/react";
import Image from "next/image";

const playbackId =
  "bafybeida3w2w7fch2fy6rfvfttqamlcyxgd3ddbf4u25n7fxzvyvcaegxy";

import image from "../assets/image.png";

const PosterImage = () => {
  return (
    <Image
      src={image}
      priority
      placeholder="blur"
      alt="image"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default function DemoPlayer() {
  return (
    <Player
      title="Waterfalls"
      playbackId={playbackId}
      showPipButton
      showTitle={false}
      aspectRatio="16to9"
      poster={<PosterImage />}
      controls={{
        autohide: 3000,
      }}
      theme={{
        borderStyles: { containerBorderStyle: "hidden" },
        radii: { containerBorderRadius: "10px" },
        heights: { containerHeight: "100%" },
      }}
    />
  );
}
