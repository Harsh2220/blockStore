import { useCreateAsset } from "@livepeer/react";
import { useEffect, useState } from "react";
import { Player } from '@livepeer/react';
import Image from 'next/image';
import blenderPoster from '../assets/bored.png';

const PosterImage = () => {
    return (
      <Image
      alt=""
        src={blenderPoster}
        layout="fill"
        objectFit="cover"
        priority
        placeholder="blur"
      />
    );
  };
  const playbackId =
  '9b82284gv29o3nbt';

const DemoPlayer = () => {
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
          borderStyles: { containerBorderStyle: 'hidden' },
          radii: { containerBorderRadius: '10px' },
        }}
      />
    );
  };

export default function Livepeer() {
    const [playbackID, setplaybackID] = useState();
  

    const [video, setVideo] = useState<File | undefined>(undefined);
    const {
        mutate: createAsset,
        data: assets,
        status,
        progress,
        error,
    } = useCreateAsset(
        // we use a `const` assertion here to provide better Typescript types
        // for the returned data
        video
            ? {
                sources: [{ name: video.name, file: video }] as const,
            }
            : null,
    );
console.log(progress);
console.log(playbackID);
    return (
        <div>
            <input
                type="file"
                multiple={false}
                accept="video/*"
                onChange={(e) => {
                    if (e.target.files) {
                        setVideo(e.target.files[0]);
                    }
                }}
            />
            <button
                disabled={status === 'loading' || !createAsset}
                onClick={() => {
                    createAsset?.();
                }}
            >
                Create Asset
            </button>
            {assets?.map((asset) => (
                <div key={asset.id}>
                    <div>
                        <div>Asset Name: {asset?.name}</div>
                        <div>Playback URL: {asset?.playbackUrl}</div>
                        <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? 'None'}</div>
                        
                    </div>
                </div>
            ))}

            {error && <div>{error.message}</div>}
        </div>
    );
}
